# coffeehub_backend/monitoramento/admin.py

from django.contrib import admin
from .models import MedicaoIndicador, EventoRastreabilidade

@admin.register(MedicaoIndicador)
class MedicaoIndicadorAdmin(admin.ModelAdmin):
    list_display = ("tipo_indicador", "talhao", "valor", "unidade_medida", "data_medicao")
    search_fields = ("tipo_indicador", "talhao__nome")
    list_filter = ("tipo_indicador", "data_medicao")
    raw_id_fields = ("talhao",)  
    ordering = ("-data_medicao",)

@admin.register(EventoRastreabilidade)
class EventoRastreabilidadeAdmin(admin.ModelAdmin):
    list_display = ("tipo_evento", "lote", "data_evento", "local", "responsavel")
    search_fields = ("tipo_evento", "lote__codigo_lote", "local")
    list_filter = ("tipo_evento", "data_evento")
    raw_id_fields = ("lote",)  
    ordering = ("-data_evento",)
