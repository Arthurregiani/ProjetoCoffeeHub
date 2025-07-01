# coffeehub_backend/insumos/views.py

from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from .models import Insumo, Fertilizante, Agroquimico, EstoqueInsumo
from .serializers import InsumoSerializer, FertilizanteSerializer, AgroquimicoSerializer, EstoqueInsumoSerializer

# ViewSet para o modelo Insumo
class InsumoViewSet(viewsets.ModelViewSet):
    queryset = Insumo.objects.all().order_by('nome')  # Ordenação padrão por nome
    serializer_class = InsumoSerializer
    filter_backends = [SearchFilter]
    search_fields = ['nome', 'tipo']  # Permite buscar por nome ou tipo

# ViewSet para o modelo Fertilizante
class FertilizanteViewSet(viewsets.ModelViewSet):
    queryset = Fertilizante.objects.all().order_by('insumo_ptr__nome')  # Ordenação pelo nome do insumo
    serializer_class = FertilizanteSerializer
    filter_backends = [SearchFilter]
    search_fields = ['insumo_ptr__nome', 'composicao']  # Permite buscar por nome do insumo ou composição

# ViewSet para o modelo Agroquimico
class AgroquimicoViewSet(viewsets.ModelViewSet):
    queryset = Agroquimico.objects.all().order_by('insumo_ptr__nome')  # Ordenação pelo nome do insumo
    serializer_class = AgroquimicoSerializer
    filter_backends = [SearchFilter]
    search_fields = ['insumo_ptr__nome', 'registro_ministerio']  # Permite buscar por nome do insumo ou registro

# ViewSet para o modelo EstoqueInsumo
class EstoqueInsumoViewSet(viewsets.ModelViewSet):
    queryset = EstoqueInsumo.objects.all().order_by('-data_atualizacao')  # Ordenação pela data de atualização
    serializer_class = EstoqueInsumoSerializer
    filter_backends = [SearchFilter]
    search_fields = ['insumo__nome', 'propriedade__nome']  # Permite buscar por nome do insumo ou da propriedade
