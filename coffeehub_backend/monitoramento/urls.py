# coffeehub_backend/monitoramento/urls.py

from rest_framework.routers import DefaultRouter
from .views import MedicaoIndicadorViewSet, EventoRastreabilidadeViewSet

router = DefaultRouter()
router.register(r"medicoes", MedicaoIndicadorViewSet)
router.register(r"eventos-rastreabilidade", EventoRastreabilidadeViewSet)

urlpatterns = router.urls

