from ast import parse
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

from apps.peliculas.models import Genero

from .serializers import ClienteSerializer, ClienteFijoSerializer, InvalidacionSerializer
from .models import Cliente, ClienteFijo, Invalidacion
from .utils import parseCliente


class ListCreateClienteView(APIView):
    """
    Crea nuevo cliente temporal o lista todos los clientes activos
    - `GET`: Lista todos los clientes
    - `POST`: Crea un nuevo cliente
    """

    def get(self, request):
        clientes = Cliente.objects.all().filter(activo=True)
        serializer = ClienteSerializer(clientes, many=True)

        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        """
        Si se intenta crear un cliente con una cédula ya existente y esta inactivo, se reactiva el cliente
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
    def get(self, request):
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

    def get(self, request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.activo:
            cliente = parseCliente(cliente)

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

    def put(self, request, pk):
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

    def patch(self, request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.activo:
            cliente = parseCliente(cliente)

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

    def delete(self, request, pk):
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

    def post(self, request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if not cliente.activo:
            return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

        cliente = parseCliente(cliente)

        if isinstance(cliente, ClienteFijo):
            return Response("Cliente ya es fijo", status=HTTP_400_BAD_REQUEST)

        try:
            genero = Genero.objects.get(
                nombre=request.data.get("genero_favorito"))
        except Genero.DoesNotExist:
            genero = None

        if not genero:
            return Response("Género no encontrado", status=HTTP_404_NOT_FOUND)

        with transaction.atomic():
            cliente.delete()

            cliente_fijo: ClienteFijo = ClienteFijo.objects.create(
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
                genero_favorito=genero
            )

        return Response("Cliente convertido a fijo", status=HTTP_200_OK)


class InvalidarClienteView(APIView):
    """
    Invalida un cliente por indebido comportamiento
    `POST`: Invalida un cliente no invalidado
    `DELETE`: Elimina la invalidación de un cliente previamente invalidado
    """

    def post(self, request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response("Cliente no encontrado", status=HTTP_404_NOT_FOUND)

        if cliente.invalidado:
            return Response("Cliente ya está invalidado", status=HTTP_400_BAD_REQUEST)

        if not cliente.activo:
            return Response("Cliente no está activo", status=HTTP_400_BAD_REQUEST)

        if parseCliente(cliente).__class__.__name__ == "ClienteFijo":
            return Response("No se puede invalidar un cliente fijo", status=HTTP_400_BAD_REQUEST)

        motivo = request.data.get("motivo")
        if not motivo:
            motivo = "No especificado"

        try:
            Invalidacion.objects.create(
                cliente=cliente,
                motivo=motivo
            )
        except ValidationError as e:
            return Response({"error": e.message}, status=HTTP_400_BAD_REQUEST)

        return Response("Cliente invalidado", status=HTTP_200_OK)

    def delete(self, request, pk):
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

    def get(self, request):
        invalidados = Invalidacion.objects.all()
        serializer = InvalidacionSerializer(invalidados, many=True)

        return Response(serializer.data, status=HTTP_200_OK)

