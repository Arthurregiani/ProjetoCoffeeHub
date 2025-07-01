from django.contrib import admin
from .models import Atividade, Colheita

@admin.register(Atividade)
class AtividadeAdmin(admin.ModelAdmin):
    list_display = ("tipo_atividade", "talhao", "data_atividade", "custo")
    search_fields = ("tipo_atividade", "talhao__nome", "descricao")
    list_filter = ("tipo_atividade", "data_atividade")
    raw_id_fields = ("talhao",)  # vírgula para ser tupla
    ordering = ("-data_atividade",)

@admin.register(Colheita)
class ColheitaAdmin(admin.ModelAdmin):
    list_display = ("talhao", "data_colheita", "quantidade_kg", "tipo_cafe")
    search_fields = ("talhao__nome", "tipo_cafe")
    list_filter = ("tipo_cafe", "data_colheita")
    raw_id_fields = ("talhao",)  # vírgula para ser tupla
    ordering = ("-data_colheita",)
