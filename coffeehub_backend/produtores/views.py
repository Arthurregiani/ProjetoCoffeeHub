# coffeehub_backend/produtores/views.py

from rest_framework import viewsets
from .models import Produtor, Propriedade, Talhao
from .serializers import ProdutorSerializer, PropriedadeSerializer, TalhaoSerializer

class ProdutorViewSet(viewsets.ModelViewSet):
    queryset = Produtor.objects.all()
    serializer_class = ProdutorSerializer

class PropriedadeViewSet(viewsets.ModelViewSet): 
    queryset = Propriedade.objects.all()
    serializer_class = PropriedadeSerializer

class TalhaoViewSet(viewsets.ModelViewSet): 
    queryset = Talhao.objects.all()
    serializer_class = TalhaoSerializer