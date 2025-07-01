from rest_framework import viewsets
from .models import Atividade, Colheita
from .serializers import AtividadeSerializer, ColheitaSerializer

# ViewSet para operações CRUD de Atividade
class AtividadeViewSet(viewsets.ModelViewSet):
    queryset = Atividade.objects.all()  # Consulta todas as atividades
    serializer_class = AtividadeSerializer  # Serializador utilizado

# ViewSet para operações CRUD de Colheita
class ColheitaViewSet(viewsets.ModelViewSet):
    queryset = Colheita.objects.all()  # Consulta todas as colheitas
    serializer_class = ColheitaSerializer  # Serializador utilizado
