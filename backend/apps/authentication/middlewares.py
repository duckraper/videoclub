from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN
from django.http import HttpResponseForbidden
from django.core.cache import cache
from django.conf import settings

import core.settings


class DDoSProtectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.time_window = 60

    def process_request(self, request):
        ip_address = request.META.get('REMOTE_ADDR')
        cache_key = f"DDoS_{ip_address}"

        request_count = cache.get(cache_key, 0)
        request_count += 1

        if request_count > settings.REQUESTS_PER_MINUTE_ALLOWED:
            return HttpResponseForbidden("Demasiadas solicitudes.", status=HTTP_403_FORBIDDEN)

        cache.set(cache_key, request_count, timeout=self.time_window)

        return None

    def __call__(self, request):
        return self.process_request(request) or self.get_response(request)


class BruteForceProtectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        print(response)

        # revisa si la solicitud es del endpoint para login
        if request.path in '/api/auth/token/' and request.method == 'POST':
            ip_address = request.META.get('REMOTE_ADDR')

            cache_key = f"Intento_de_login_de_{ip_address}"
            login_attempts = cache.get(cache_key, 0)

            if response.status_code != HTTP_200_OK:
                cache.set(cache_key, login_attempts + 1, timeout=settings.BRUTE_FORCE_TIMEOUT)
                print(f"Intentos de login: {login_attempts + 1}")
            else:
                cache.delete(cache_key)
                print("Login exitoso")

            if login_attempts >= core.settings.BRUTE_FORCE_THRESHOLD:
                print(f"Excedidos los intentos de login, espere {settings.BRUTE_FORCE_TIMEOUT} segundos.")
                return HttpResponseForbidden(
                    f"Excedidos los intentos de login, espere {settings.BRUTE_FORCE_TIMEOUT} segundos."
                )

        return response
