from rest_framework import viewsets
from .models import MedicaoIndicador, EventoRastreabilidade
from .serializers import MedicaoIndicadorSerializer, EventoRastreabilidadeSerializer


class MedicaoIndicadorViewSet(viewsets.ModelViewSet):
    queryset = MedicaoIndicador.objects.all()
    serializer_class = MedicaoIndicadorSerializer


class EventoRastreabilidadeViewSet(viewsets.ModelViewSet):
    queryset = EventoRastreabilidade.objects.all()
    serializer_class = EventoRastreabilidadeSerializer
