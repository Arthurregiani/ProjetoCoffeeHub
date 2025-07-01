# coffeehub_backend/insumos/serializers.py

from rest_framework import serializers
from .models import Insumo, Fertilizante, Agroquimico, EstoqueInsumo

# Serializador para o modelo Insumo
class InsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = '__all__'

# Serializador para o modelo Fertilizante
class FertilizanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilizante
        fields = '__all__'

# Serializador para o modelo Agroquímico
class AgroquimicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agroquimico
        fields = '__all__'

# Serializador para o modelo Estoque de Insumo
class EstoqueInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstoqueInsumo
        fields = '__all__'

