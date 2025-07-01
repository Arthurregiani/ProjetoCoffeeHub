from rest_framework import serializers
from .models import Atividade, Colheita

class AtividadeSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo Atividade.
    Responsável por converter instâncias de Atividade para JSON e vice-versa.
    """
    class Meta:
        model = Atividade
        fields = '__all__'


class ColheitaSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo Colheita.
    Responsável por converter instâncias de Colheita para JSON e vice-versa.
    """
    class Meta:
        model = Colheita
        fields = '__all__'
