# coffeehub_backend/produtores/urls.py

from rest_framework.routers import DefaultRouter
from .views import ProdutorViewSet, PropriedadeViewSet, TalhaoViewSet

router = DefaultRouter()
router.register(r'produtores', ProdutorViewSet)  # Corrigido: removido o caractere de escape (\)
router.register(r'propriedades', PropriedadeViewSet)  # Corrigido: removido o caractere de escape (\)
router.register('talhoes', TalhaoViewSet)

urlpatterns = router.urls
