from locust import HttpUser, task

BASE_URL = "http://localhost:8000/api"


class QuickstartUser(HttpUser):
    @task
    def authenticate(self):
        self.client.post(f"{BASE_URL}/auth/token/", json={
            "username": "beli",
            "password": "odiotodo"
        })


