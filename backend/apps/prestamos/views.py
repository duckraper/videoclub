from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import (
        HTTP_200_OK,
        HTTP_201_CREATED,
        HTTP_204_NO_CONTENT,
        HTTP_400_BAD_REQUEST,
        HTTP_404_NOT_FOUND
)
from django.db import transaction

from django.utils import timezone
from django.forms import ValidationError

from ..clientes.models import Cliente
from ..soportes.models import Soporte
from .serializers import SolicitudPrestamoSerializer
from .models import SolicitudPrestamo
from .utils import crear_solicitud, devolucion

ULTIMA_QUINCENA = timezone.now() - timezone.timedelta(days=15)


class ListCreateSolicitudView(APIView):
    """
    Crea nuevas solicitudes de prestamo y lista las realizadas
    """

    @staticmethod
    def get(request):
        try:
            if request.query_params.get("activos"):
                solicitudes = SolicitudPrestamo.objects.all().filter(
                    activo=True,
                    fecha_de_prestamo__gte=ULTIMA_QUINCENA
                )
            else:
                solicitudes = SolicitudPrestamo.objects.all().filter(
                    fecha_de_devolucion__gte=ULTIMA_QUINCENA
                )

            serializer = SolicitudPrestamoSerializer(solicitudes, many=True)

        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=HTTP_200_OK)

    @staticmethod
    @transaction.atomic
    def post(request):
        c_id = request.data.get('cliente')
        s_id = request.data.get('soporte')

        try:
            cliente = Cliente.objects.get(pk=c_id)
            soporte = Soporte.objects.get(pk=s_id)

        except Cliente.DoesNotExist as e:
            return Response(str(e), status=HTTP_404_NOT_FOUND)
        except Soporte.DoesNotExist as e:
            return Response(str(e), status=HTTP_404_NOT_FOUND)

        try:
            if request.data.get('dias_para_devolucion'):
                dias = request.data.get('dias_para_devolucion')
                solicitud = crear_solicitud(cliente, soporte, dias)
            else:
                solicitud = crear_solicitud(cliente, soporte)

            serializer = SolicitudPrestamoSerializer(solicitud, read_only=True)

        except ValidationError as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=HTTP_201_CREATED)



class DevolverPrestamoView(APIView):
    @staticmethod
    def post(request, pk):
        try:
            prestamo = SolicitudPrestamo.objects.get(pk=pk)
        except SolicitudPrestamo.DoesNotExist:
            return Response({'message': f'Solicitud con id {pk} no encontrado'}, status=HTTP_404_NOT_FOUND)

        fecha_entrega = request.query_params.get('fecha')

        if fecha_entrega:
            devolucion(prestamo, fecha_entrega)
        else:
            devolucion(prestamo)

        return Response({'message': 'La devolucion ha sido realizada correctamente'}, status=HTTP_200_OK)


class RetrieveDeleteSolicitudView(APIView):
    @staticmethod
    def get(request, pk):
        try:
            solicitud_prestamo = SolicitudPrestamo.objects.get(pk=pk)
        except SolicitudPrestamo.DoesNotExist:
            return Response({'message': f'Solicitud con id {pk} no encontrado'}, status=HTTP_404_NOT_FOUND)

        serializer = SolicitudPrestamoSerializer(solicitud_prestamo, read_only=True)

        return Response(serializer.data, status=HTTP_200_OK)

    @staticmethod
    def delete(request, pk):
        try:
            solicitud_prestamo = SolicitudPrestamo.objects.get(pk=pk)
        except SolicitudPrestamo.DoesNotExist:
            return Response({'message': f'Solicitud con id {pk} no encontrado'}, status=HTTP_404_NOT_FOUND)

        solicitud_prestamo.delete(keep_parents=True)

        return Response(status=HTTP_204_NO_CONTENT)
