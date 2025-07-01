# coffeehub_backend/produtores/serializers.py

from rest_framework import serializers
from .models import Produtor, Propriedade, Talhao

class ProdutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtor
        fields = '__all__'

class PropriedadeSerializer(serializers.ModelSerializer):  # <--- Adicione este bloco
    class Meta:
        model = Propriedade
        fields = '__all__'

class TalhaoSerializer(serializers.ModelSerializer):  # <--- Adicione este bloco
    class Meta:
        model = Talhao
        fields = "__all__"
