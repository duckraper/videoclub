from .models import VCD, Casete, DVD


def parse_soporte(soporte):
    """
    Convierte un soporte dado, al tipo que le corresponde basandose en su FPK
    """
    if soporte.pk in VCD.objects.all().values_list('pk', flat=True):
        return VCD.objects.all().filter(pk=soporte.pk).first()
    
    elif soporte.pk in Casete.objects.all().values_list('pk', flat=True):
        return Casete.objects.all().filter(pk=soporte.pk).first()
    
    elif soporte.pk in DVD.objects.all().values_list('pk', flat=True):
        return DVD.objects.all().filter(pk=soporte.pk).first()

    return soporte
