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
from .models import Cliente, ClienteFijo, Invalidacion
from .utils import parse_cliente


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
            return Response("Cliente reactivado", status=HTTP_200_OK)

        serializer = ClienteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ListClientesFijosView(APIView):
    @staticmethod
    def get(request):
        clientes = ClienteFijo.objects.all().filter(activo=True)
        serializer = ClienteFijoSerializer(clientes, many=True)

        return Response(serializer.data, status=HTTP_200_OK)


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
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.activo:
            cliente = parse_cliente(cliente)

            if isinstance(cliente, ClienteFijo):
                serializer = ClienteFijoSerializer(cliente)
            else:
                serializer = ClienteSerializer(cliente)
                print(serializer.data)

            data = serializer.data

            if cliente.invalidado:
                data = {**data, "invalidado": True}  # type: ignore

            return Response(data, status=HTTP_200_OK)

        return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

    @staticmethod
    def put(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.activo:
            serializer = ClienteSerializer(cliente, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_200_OK)

            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

    @staticmethod
    def patch(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.activo:
            cliente = parse_cliente(cliente)

            if isinstance(cliente, ClienteFijo):
                serializer = ClienteFijoSerializer(
                    cliente, data=request.data, partial=True)
            else:
                serializer = ClienteSerializer(
                    cliente, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_200_OK)

            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

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


class CrearClienteFijoView(APIView):
    """
    `POST`: Convierte cliente normal en cliente fijo
    """

    @staticmethod
    def post(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if not cliente.activo:
            return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

        cliente = parse_cliente(cliente)

        if isinstance(cliente, ClienteFijo):
            return Response("Cliente ya es fijo", status=HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            cliente.delete()

            genero = str(request.data.get("genero_favorito"))

            try:
                cliente_fijo, created = ClienteFijo.objects.get_or_create(
                    ci=cliente.ci,
                    nombre=cliente.nombre,
                    apellidos=cliente.apellidos,
                    edad=cliente.edad,
                    provincia=cliente.provincia,
                    direccion=cliente.direccion,
                    telefono=cliente.telefono,
                    fecha_registro=cliente.fecha_registro,
                    activo=cliente.activo,
                    cant_soportes_alquilados=cliente.cant_soportes_alquilados,
                    genero_favorito=genero if genero else "Indefinido"
                )
            except Exception as e:
                return Response(f"Error al crear: {str(e)}", status=HTTP_400_BAD_REQUEST)

        if not created:
            return Response("Cliente ya es fijo", status=HTTP_400_BAD_REQUEST)
        
        return Response("Cliente convertido a fijo", status=HTTP_200_OK)


class InvalidarClienteView(APIView):
    """
    Invalida un cliente por indebido comportamiento
    `POST`: Invalida un cliente no invalidado
    `DELETE`: Elimina la invalidación de un cliente previamente invalidado (revalida)
    """

    @staticmethod
    def post(request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.invalidado:
            return Response("Cliente ya está invalidado", status=HTTP_400_BAD_REQUEST)

        if not cliente.activo:
            return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

        if cliente.es_fijo:
            cliente_fijo = ClienteFijo.objects.get(pk=cliente.pk)
            cliente_fijo.delete(keep_parents=True)

        try:
            motivo = request.data.get("motivo")
            cliente.invalidar(motivo) if motivo else cliente.invalidar()

        except ValidationError as e:
            return Response({"error": e.message}, status=HTTP_400_BAD_REQUEST)

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
