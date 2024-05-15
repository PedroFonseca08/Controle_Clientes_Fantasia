from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("controle/", include("controle.urls")),
    path("admin/", admin.site.urls),
]

# Não sei se precisa:
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)