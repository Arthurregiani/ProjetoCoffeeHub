# coffeehub_backend/insumos/serializers.py

from rest_framework import serializers
from .models import Insumo, Fertilizante, Agroquimico, EstoqueInsumo

# Serializer para o modelo Insumo
class InsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insumo
        fields = '__all__'

# Serializer para o modelo Fertilizante
class FertilizanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilizante
        fields = '__all__'

# Serializer para o modelo Agroquimico
class AgroquimicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agroquimico
        fields = '__all__'

# Serializer para o modelo EstoqueInsumo
class EstoqueInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstoqueInsumo
        fields = '__all__'

