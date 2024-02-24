from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer


class GetRoutes(APIView):
    @staticmethod
    def get(request):
        routes = {
            'api/': {
                'api/': [
                    'GET /api/',
                ],
                'api/token/': [
                    'POST /api/token/',
                    'POST /api/token/refresh/',
                ],
                'api/docs/': [
                    'GET /api/docs/'
                ]
            }
        }

        return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


