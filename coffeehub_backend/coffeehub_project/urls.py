from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('produtores.urls')),
    path('api/', include('insumos.urls')),
    path('api/', include('atividades.urls')),
]

