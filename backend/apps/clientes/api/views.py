from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)

from .serializers import ClienteSerializer, ClienteFijoSerializer, InvalidacionSerializer
from apps.clientes.models import Cliente, ClienteFijo, Invalidacion
from apps.clientes.utils import parse_cliente, crear_fijo


class ListCreateClienteView(APIView):
    """
    Crea nuevo cliente temporal o lista todos los clientes activos
    - `GET`: Lista todos los clientes
    - `POST`: Crea un nuevo cliente
    """

    @staticmethod
    def get(request):
        clientes = Cliente.objects.all().filter(activo=True)
        serializer = ClienteSerializer(clientes, many=True)

        return Response(serializer.data, status=HTTP_200_OK)

    @staticmethod
    def post(request):
        """
        Si se intenta crear un cliente con una cédula ya existente y está inactivo, se reactiva el cliente
        """

        try:
            cliente = Cliente.objects.get(ci=request.data.get("ci"))
        except Cliente.DoesNotExist:
            cliente = None

        if cliente and not cliente.activo:
            cliente.activo = True
            cliente.save()
            return Response({"message": "Cliente reactivado"}, status=HTTP_201_CREATED)

        serializer = ClienteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class RetrieveUpdateDestroyClienteView(APIView):
    """
    Recupera, actualiza o elimina un cliente activo
    - `GET`: Recupera un cliente
    - `PUT`: Actualiza un cliente
    - `PATCH`: Actualiza parcialmente un cliente
    - `DELETE`: Elimina un cliente
    """

    @staticmethod
    def get(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response({"message": "Cliente no encontrado"}, status=HTTP_404_NOT_FOUND)

        if cliente.activo:
            if cliente.es_fijo:
                cliente_fijo = ClienteFijo.objects.get(pk=cliente.pk)
                serializer = ClienteFijoSerializer(cliente_fijo)
            else:
                serializer = ClienteSerializer(cliente)

            return Response(serializer.data, status=HTTP_200_OK)

        return Response({"message": "Cliente no está activo"}, status=HTTP_400_BAD_REQUEST)

    @staticmethod
    def put(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response({"message": "Cliente no encontrado"}, status=HTTP_404_NOT_FOUND)

        if not cliente.activo:
            return Response({"message": "Cliente no está activo"}, status=HTTP_400_BAD_REQUEST)

        serializer = ClienteSerializer(cliente, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    @staticmethod
    def patch(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response({"message": "Cliente no encontrado"}, status=HTTP_404_NOT_FOUND)

        if not cliente.activo:
            return Response({"message": "Cliente no está activo"}, status=HTTP_400_BAD_REQUEST)

        cliente_fijo = None
        es_fijo = request.data.get('es_fijo')
        if es_fijo is not None and cliente.es_fijo != es_fijo:
            if cliente.es_fijo:
                cliente_fijo = parse_cliente(cliente)
                cliente_fijo.delete()
            else:
                genero = request.data.get('genero_favorito')
                cliente_fijo = crear_fijo(cliente, genero)

        if cliente.es_fijo and cliente_fijo:
            serializer = ClienteFijoSerializer(
                cliente_fijo, data=request.data, partial=True)
        else:
            serializer = ClienteSerializer(
                cliente, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente and cliente.activo:
            cliente.activo = False
            cliente.save()
            return Response(status=HTTP_204_NO_CONTENT)

        return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)


class InvalidarClienteView(APIView):
    """
    Invalida un cliente por indebido comportamiento
    `POST`: Invalida un cliente no invalidado
    `DELETE`: Elimina la invalidación de un cliente previamente invalidado (reválida)
    """

    @staticmethod
    @transaction.atomic
    def post(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response({"message": "Cliente no encontrado"}, status=HTTP_404_NOT_FOUND)

        if cliente.invalidado:
            return Response({"message": "Cliente ya está invalidado"}, status=HTTP_400_BAD_REQUEST)

        if not cliente.activo:
            return Response({"message": "Cliente no está activo"}, status=HTTP_400_BAD_REQUEST)

        if cliente.es_fijo:
            try:
                cliente_fijo = ClienteFijo.objects.get(pk=cliente.pk)
                cliente_fijo.delete(keep_parents=True)
            except ClienteFijo.DoesNotExist:
                return Response({"message": "Cliente fijo no encontrado"}, status=HTTP_404_NOT_FOUND)

        try:
            motivo = request.data.get("motivo")
            cliente.invalidar(motivo) if motivo else cliente.invalidar()

        except ValidationError as e:
            return Response({"message": e.message}, status=HTTP_400_BAD_REQUEST)

        return Response("Cliente invalidado", status=HTTP_200_OK)

    @staticmethod
    def delete(request, pk):
        try:
            invalidacion = Invalidacion.objects.get(pk=pk)
        except Invalidacion.DoesNotExist:
            return Response("Invalidación no encontrada", status=HTTP_404_NOT_FOUND)

        invalidacion.delete()

        return Response("Invalidación eliminada", status=HTTP_200_OK)


class ListInvalidadosView(APIView):
    """
    Lista todos los clientes invalidados
    """

    @staticmethod
    def get(request):
        invalidados = Invalidacion.objects.all()
        serializer = InvalidacionSerializer(invalidados, many=True)

        return Response(serializer.data, status=HTTP_200_OK)
