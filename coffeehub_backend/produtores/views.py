from rest_framework import viewsets
from .models import Produtor, Propriedade, Talhao
from .serializers import ProdutorSerializer, PropriedadeSerializer, TalhaoSerializer

# ViewSet para operações CRUD de Produtor
class ProdutorViewSet(viewsets.ModelViewSet):
    queryset = Produtor.objects.all()  # Consulta todos os produtores
    serializer_class = ProdutorSerializer  # Serializador utilizado

# ViewSet para operações CRUD de Propriedade
class PropriedadeViewSet(viewsets.ModelViewSet): 
    queryset = Propriedade.objects.all()  # Consulta todas as propriedades
    serializer_class = PropriedadeSerializer  # Serializador utilizado

# ViewSet para operações CRUD de Talhão
class TalhaoViewSet(viewsets.ModelViewSet): 
    queryset = Talhao.objects.all()  # Consulta todos os talhões
    serializer_class = TalhaoSerializer  # Serializador utilizado