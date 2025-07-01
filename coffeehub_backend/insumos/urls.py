# coffeehub_backend/insumos/urls.py

from rest_framework.routers import DefaultRouter
from .views import InsumoViewSet, FertilizanteViewSet, AgroquimicoViewSet, EstoqueInsumoViewSet

# Configuração das rotas automáticas com DefaultRouter
router = DefaultRouter()

# Registro das rotas para os endpoints da API
router.register(r"insumos", InsumoViewSet, basename="insumo")  # CRUD para Insumos
router.register(r"fertilizantes", FertilizanteViewSet, basename="fertilizante")  # CRUD para Fertilizantes
router.register(r"agroquimicos", AgroquimicoViewSet, basename="agroquimico")  # CRUD para Agroquímicos
router.register(r"estoques-insumo", EstoqueInsumoViewSet, basename="estoqueinsumo")  # CRUD para Estoques de Insumos

# URLs finais geradas pelo DefaultRouter
urlpatterns = router.urls

