from django.core.management.base import BaseCommand
from menu.models import Menu, MenuItem


class Command(BaseCommand):
    help = "Delete all records from Menu and MenuItem models"

    def handle(self, *args, **kwargs):
        Menu.objects.all().delete()
        MenuItem.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("Successfully deleted all records"))
