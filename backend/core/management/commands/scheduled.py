from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Este comando es para chequear la devolución de los préstamos de los clientes"

    def handle(self, *args, **kwargs):
        self.stdout.write("Programando devolución de préstamos")