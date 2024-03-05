from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND


from .serializers import SolicitudPrestamoSerializer
from .models import SolicitudPrestamo
from apps.clientes.models import Cliente

class ListCreateSolicitudView(APIView):
    
    def get(self, request):
        try:
            if request.query_params.get("activos"):
                solicitudes = SolicitudPrestamo.objects.all().filter(activo=True)
            else:
                solicitudes = SolicitudPrestamo.objects.all()
        
            serializer = SolicitudPrestamoSerializer(solicitudes, many=True)

        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=HTTP_200_OK)
    
    def post(self, request):
        serializer = SolicitudPrestamoSerializer(data=request.data)

        cliente =  Cliente.objects.get(pk=request.data.get("cliente"))

        # if cliente.activo: 

        if serializer.is_valid():
            

            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        
        return Response("Error al crear solicitud", status=HTTP_400_BAD_REQUEST)