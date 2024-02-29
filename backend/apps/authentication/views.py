from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from django.forms import ValidationError

from .models import User
from .serializers import MyTokenObtainPairSerializer, UserSerializer

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT
)


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer


class UserViewSet(APIView):
    permission_classes = [IsAdminUser, IsAuthenticated]

    def get(self, request):
        users = User.objects.filter(is_active=True)
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_201_CREATED)

            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        except ValidationError as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)


class UserCRUDView(APIView):
    permission_classes = [IsAdminUser, IsAuthenticated]

    def get_user(self, pk):
        user = User.objects.filter(pk=pk).first()
        
        if user and user.is_active:
            return user
        
        return None

    def get(self, request, pk):
        user = self.get_user(pk)

        if user:
            serializer = UserSerializer(user)

            return Response(serializer.data, status=HTTP_200_OK)

        return Response(status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        user = self.get_user(pk)

        if user:
            serializer = UserSerializer(user, data=request.data)

            try:
                if serializer.is_valid():
                    serializer.save()
                    return Response(data=serializer.data, status=HTTP_200_OK)

                return Response(data=serializer.errors, status=HTTP_400_BAD_REQUEST)

            except ValidationError as e:
                return Response(str(e), status=HTTP_400_BAD_REQUEST)

        return Response(status=HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        user = self.get_user(pk)

        if user:
            serializer = UserSerializer(user, data=request.data, partial=True)

            try:
                if serializer.is_valid():
                    serializer.save()
                    return Response(data=serializer.data, status=HTTP_200_OK)

                return Response(data=serializer.errors, status=HTTP_400_BAD_REQUEST)

            except ValidationError as e:
                return Response(str(e), status=HTTP_400_BAD_REQUEST)

        return Response(status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        user = self.get_user(pk)

        if user:
            user.is_active = False
            user.save()
            return Response(status=HTTP_204_NO_CONTENT)

        return Response(status=HTTP_404_NOT_FOUND)


class RetrieveSelfUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.all().filter(pk=request.user.pk).first()

        if user:
            if request.user == user and request.user.is_active:
                serializer = UserSerializer(user)

                return Response(serializer.data, status=HTTP_200_OK)

            return Response(status=HTTP_403_FORBIDDEN)

        return Response(status=HTTP_404_NOT_FOUND)
