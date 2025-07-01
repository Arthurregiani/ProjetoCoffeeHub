# coffeehub_backend/atividades/views.py

from rest_framework import viewsets
from .models import Atividade, Colheita
from .serializers import AtividadeSerializer, ColheitaSerializer

class AtividadeViewSet(viewsets.ModelViewSet):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer

class ColheitaViewSet(viewsets.ModelViewSet):
    queryset = Colheita.objects.all()
    serializer_class = ColheitaSerializer
