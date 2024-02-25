from rest_framework.views import APIView
from rest_framework.response import Response


class GetRoutes(APIView):
    @staticmethod
    def get(request):
        routes = {
            'api/': {
                'api/': [
                    'GET /api/',
                ],
                'api/docs/': [
                    'GET /api/docs/'
                ]
            }
        }

        return Response(routes)
