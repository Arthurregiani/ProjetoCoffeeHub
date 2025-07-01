# coffeehub_backend/produtores/serializers.py

from rest_framework import serializers
from .models import Produtor, Propriedade, Talhao

# Serializador para o modelo Produtor
class ProdutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtor
        fields = '__all__'

# Serializador para o modelo Propriedade
class PropriedadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propriedade
        fields = '__all__'

# Serializador para o modelo Talhão
class TalhaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talhao
        fields = "__all__"
