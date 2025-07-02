# coffeehub_backend/producao/views.py

from rest_framework import viewsets
from .models import Lote, Processamento
from .serializers import LoteSerializer, ProcessamentoSerializer


class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer


class ProcessamentoViewSet(viewsets.ModelViewSet):
    queryset = Processamento.objects.all()
    serializer_class = ProcessamentoSerializer
