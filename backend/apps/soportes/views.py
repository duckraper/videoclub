from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_405_METHOD_NOT_ALLOWED,
    HTTP_404_NOT_FOUND
)
from apps.peliculas.models import Pelicula
from .models import Casete, DVD, VCD, Soporte
from .serializers import CaseteSerializer, DVDSerializer, SoporteSerializer, VCDSerializer
from .utils import parseSoporte


class RetrieveSoporte(APIView):
    def get(self, request, pk):
        soporte = Soporte.objects.all().filter(pk=pk).first()

        if soporte and soporte.disponible:
            soporte = parseSoporte(soporte)

            if isinstance(soporte, VCD):
                serializer = VCDSerializer(soporte)
            elif isinstance(soporte, DVD):
                serializer = DVDSerializer(soporte)
            elif isinstance(soporte, Casete):
                serializer = CaseteSerializer(soporte)
            else:
                serializer = SoporteSerializer(soporte)

            return Response(serializer.data, status=HTTP_200_OK)

        return Response("Soporte no encontrado", status=HTTP_404_NOT_FOUND)


class SoporteListCreateSet(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        soportes = Soporte.objects.all().filter(disponible=True)
        serializer = SoporteSerializer(soportes, many=True)

        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        try:
            tipo_soporte = request.data.pop("tipo_soporte")

        except Exception as e:
            return Response("Tipo de soporte no especificado", status=HTTP_400_BAD_REQUEST)

        try:
            if tipo_soporte == "vcd":
                serializer = VCDSerializer(data=request.data)

                if serializer.is_valid():
                    serializer.save()

                    return Response(serializer.data, status=HTTP_201_CREATED)

            elif tipo_soporte == "dvd":
                serializer = DVDSerializer(data=request.data)

                if serializer.is_valid():
                    serializer.save()

                    return Response(serializer.data, status=HTTP_201_CREATED)

            elif tipo_soporte == "casete":
                serializer = CaseteSerializer(data=request.data)

                if serializer.is_valid():
                    serializer.save()

                    return Response(serializer.data, status=HTTP_201_CREATED)

                return Response("Tipo de soporte no valido", status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class DarBajaSoporteView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        soporte = Soporte.objects.all().filter(pk=pk).first()

        if soporte:
            if not soporte.disponible:
                return Response(status=HTTP_404_NOT_FOUND)

            soporte.disponible = False
            soporte.save()

            return Response("Soporte dado de baja con exito", status=HTTP_200_OK)

        return Response("Soporte no encontrado", status=HTTP_404_NOT_FOUND)


class GrabarPeliculaView(APIView):
    def post(self, request, pk):
        try:
            soporte = Soporte.objects.all().filter(pk=pk).first()

            p_id = request.data["pelicula"]

            pelicula = Pelicula.objects.all().filter(pk=p_id).first()

            if not soporte or not pelicula:
                return Response("Soporte o pelicula no encontrados", status=HTTP_404_NOT_FOUND)

            with transaction.atomic():
                # si es casete o VCD
                if pelicula.soportes.all().filter(pk=soporte.pk).exists():
                    return Response("La pelicula ya esta grabada en este soporte", status=HTTP_405_METHOD_NOT_ALLOWED)

                if soporte.pk in VCD.objects.all().values_list('pk', flat=True) or \
                        soporte.pk in Casete.objects.all().values_list('pk', flat=True):
                    if soporte.cant_peliculas_grabadas < soporte.cant_max_peliculas and \
                            soporte.estado != "M" and soporte.disponible:
                        soporte.cant_peliculas_grabadas += 1
                        soporte.save()

                        pelicula.soportes.add(soporte)
                        pelicula.save()

                        return Response("Pelicula grabada con exito", status=HTTP_200_OK)

                    return Response("No hay capacidad para mas peliculas", status=HTTP_405_METHOD_NOT_ALLOWED)

                # si es DVD
                elif soporte.pk in DVD.objects.all().values_list('pk', flat=True):
                    dvd = DVD.objects.all().filter(pk=soporte.pk).first()
                    if dvd and dvd.disponible:
                        if pelicula.tamanio < dvd.capacidad and dvd.estado == 'B' and dvd.disponible:
                            soporte.cant_peliculas_grabadas += 1
                            soporte.save()

                            dvd.cant_peliculas_grabadas += 1
                            dvd.capacidad -= pelicula.tamanio
                            dvd.save()

                            pelicula.soportes.add(soporte)
                            pelicula.save()

                            return Response("pelicula grabada con exito", status=HTTP_200_OK)

                        return Response("No hay capacidad para mas peliculas", status=HTTP_405_METHOD_NOT_ALLOWED)

                    return Response(status=HTTP_404_NOT_FOUND)

                return Response(status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)
