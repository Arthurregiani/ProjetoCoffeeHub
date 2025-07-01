# coffeehub_backend/insumos/admin.py

from django.contrib import admin
from .models import Insumo, Fertilizante, Agroquimico, EstoqueInsumo

# Admin para o modelo Insumo
@admin.register(Insumo)
class InsumoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'tipo', 'unidade_medida', 'data_cadastro')
    search_fields = ('nome', 'tipo')
    list_filter = ('tipo',)
    ordering = ('nome',)  

# Admin para o modelo Fertilizante
@admin.register(Fertilizante)
class FertilizanteAdmin(admin.ModelAdmin):
    list_display = ('insumo_ptr', 'composicao')
    search_fields = ('insumo_ptr__nome', 'composicao')

# Admin para o modelo Agroquimico
@admin.register(Agroquimico)
class AgroquimicoAdmin(admin.ModelAdmin):
    list_display = ('insumo_ptr', 'classe_toxicologica', 'registro_ministerio')
    search_fields = ('insumo_ptr__nome', 'registro_ministerio')

# Admin para o modelo EstoqueInsumo
@admin.register(EstoqueInsumo)
class EstoqueInsumoAdmin(admin.ModelAdmin):
    list_display = ('insumo', 'propriedade', 'quantidade', 'data_atualizacao')
    search_fields = ('insumo__nome', 'propriedade__nome')
    list_filter = ('insumo__tipo', 'propriedade__endereco_municipio')
    raw_id_fields = ('insumo', 'propriedade')
    ordering = ('-data_atualizacao',)  
