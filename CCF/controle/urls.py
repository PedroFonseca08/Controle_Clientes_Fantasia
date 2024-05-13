from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('clientes/', views.clientes_view, name='clientes'),
    path('fantasias/', views.fantasias_view, name='fantasias'),
    path('historico/', views.historico_view, name='historico'),
    path('', views.index, name='index'),
] 