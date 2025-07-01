from rest_framework import serializers
from .models import Atividade, Colheita

class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = '__all__'

class ColheitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colheita
        fields = '__all__'
