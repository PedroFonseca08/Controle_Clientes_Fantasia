from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect

urlpatterns = [
    path("controle/", include("controle.urls")),
    path("admin/", admin.site.urls),
    path('', lambda request: redirect('controle/', permanent=True)),
    path("__reload__/", include("django_browser_reload.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)