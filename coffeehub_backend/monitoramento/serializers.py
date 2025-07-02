# coffeehub_backend/monitoramento/serializers.py

from rest_framework import serializers
from .models import MedicaoIndicador, EventoRastreabilidade

class MedicaoIndicadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicaoIndicador
        fields = "__all__"

class EventoRastreabilidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoRastreabilidade
        fields = "__all__"

