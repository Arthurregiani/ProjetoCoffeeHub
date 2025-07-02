# coffeehub_backend/producao/serializers.py

from rest_framework import serializers
from .models import Lote, Processamento

class LoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lote
        fields = "__all__"

class ProcessamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processamento
        fields = "__all__"

