from django.contrib import admin
from .models import Produtor, Propriedade, Talhao

@admin.register(Produtor)
class ProdutorAdmin(admin.ModelAdmin):
    list_display = (
        'nome', 'codigo', 'email', 'identificacao', 'status', 'data_cadastro'
    )
    search_fields = ('nome', 'codigo', 'email', 'identificacao')
    list_filter = ('status', 'data_cadastro')
    ordering = ('-data_cadastro',)

@admin.register(Propriedade)
class PropriedadeAdmin(admin.ModelAdmin):
    list_display = (
        'nome', 'produtor', 'codigo', 'area_total_ha', 'endereco_municipio', 'endereco_estado'
    )
    search_fields = ('nome', 'codigo', 'produtor__nome', 'endereco_municipio')
    list_filter = ('endereco_estado', 'endereco_municipio')
    raw_id_fields = ('produtor',)
    ordering = ('-data_cadastro',)

@admin.register(Talhao) 
class TalhaoAdmin(admin.ModelAdmin):
    list_display = (
        "nome", "propriedade", "codigo", "area_ha", "tipo_cultivo"
    )
    search_fields = ("nome", "codigo", "propriedade__nome", "tipo_cultivo")
    list_filter = ("tipo_cultivo", "propriedade__endereco_municipio")
    raw_id_fields = ("propriedade",) 
    ordering = ("-data_cadastro",)
