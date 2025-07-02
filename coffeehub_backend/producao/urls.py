# coffeehub_backend/producao/urls.py

from rest_framework.routers import DefaultRouter
from .views import LoteViewSet, ProcessamentoViewSet

router = DefaultRouter()
router.register(r"lotes", LoteViewSet)
router.register(r"processamentos", ProcessamentoViewSet)

urlpatterns = router.urls

