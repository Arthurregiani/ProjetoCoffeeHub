# coffeehub_backend/producao/admin.py

from django.contrib import admin
from .models import Lote, Processamento

@admin.register(Lote)
class LoteAdmin(admin.ModelAdmin):
    list_display = ("codigo_lote", "colheita", "quantidade_kg", "data_formacao")
    search_fields = ("codigo_lote", "colheita__talhao__nome")
    list_filter = ("data_formacao",)
    raw_id_fields = ("colheita",)
    ordering = ("-data_formacao",)

@admin.register(Processamento)
class ProcessamentoAdmin(admin.ModelAdmin):
    list_display = ("lote", "tipo_processamento", "data_processamento", "quantidade_processada_kg")
    search_fields = ("lote__codigo_lote", "tipo_processamento")
    list_filter = ("tipo_processamento", "data_processamento")
    raw_id_fields = ("lote",)
    ordering = ("-data_processamento",)
