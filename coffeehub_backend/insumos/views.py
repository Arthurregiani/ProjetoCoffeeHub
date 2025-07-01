# coffeehub_backend/insumos/views.py

from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from .models import Insumo, Fertilizante, Agroquimico, EstoqueInsumo
from .serializers import InsumoSerializer, FertilizanteSerializer, AgroquimicoSerializer, EstoqueInsumoSerializer

# ViewSet para operações CRUD de Insumo
class InsumoViewSet(viewsets.ModelViewSet):
    queryset = Insumo.objects.all().order_by('nome')  # Consulta todos os insumos ordenados por nome
    serializer_class = InsumoSerializer
    filter_backends = [SearchFilter]
    search_fields = ['nome', 'tipo']  # Permite buscar por nome ou tipo

# ViewSet para operações CRUD de Fertilizante
class FertilizanteViewSet(viewsets.ModelViewSet):
    queryset = Fertilizante.objects.all().order_by('insumo_ptr__nome')  # Consulta todos os fertilizantes ordenados pelo nome
    serializer_class = FertilizanteSerializer
    filter_backends = [SearchFilter]
    search_fields = ['insumo_ptr__nome', 'composicao']  # Permite buscar por nome do insumo ou composição

# ViewSet para operações CRUD de Agroquímico
class AgroquimicoViewSet(viewsets.ModelViewSet):
    queryset = Agroquimico.objects.all().order_by('insumo_ptr__nome')  # Consulta todos os agroquímicos ordenados pelo nome
    serializer_class = AgroquimicoSerializer
    filter_backends = [SearchFilter]
    search_fields = ['insumo_ptr__nome', 'registro_ministerio']  # Permite buscar por nome do insumo ou registro

# ViewSet para operações CRUD de Estoque de Insumo
class EstoqueInsumoViewSet(viewsets.ModelViewSet):
    queryset = EstoqueInsumo.objects.all().order_by('-data_atualizacao')  # Consulta todos os estoques ordenados pela data de atualização
    serializer_class = EstoqueInsumoSerializer
    filter_backends = [SearchFilter]
    search_fields = ['insumo__nome', 'propriedade__nome']  # Permite buscar por nome do insumo ou da propriedade
