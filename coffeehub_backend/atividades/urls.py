from rest_framework.routers import DefaultRouter
from .views import AtividadeViewSet, ColheitaViewSet

router = DefaultRouter()
router.register(r"atividades", AtividadeViewSet)
router.register(r"colheitas", ColheitaViewSet)

urlpatterns = router.urls

