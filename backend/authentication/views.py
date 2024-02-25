from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer


class GetRoutes(APIView):
    @staticmethod
    def get(request):
        routes = {
            'auth/': {
                'auth/': [
                    'GET /auth/',
                ],
                'auth/token/': [
                    'POST /auth/token/',
                    'POST /auth/token/refresh/',
                ],
                'auth/docs/': [
                    'GET /auth/docs/'
                ]
            }
        }

        return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
