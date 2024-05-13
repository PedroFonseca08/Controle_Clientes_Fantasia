from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('clientes/', views.clientes, name='clientes'),
    path('clientes/<int:id_cliente>/', views.detalhes_cliente, name='detalhes_cliente'),
    path('clientes/editar/<int:id_cliente>/', views.editar_cliente, name='editar_cliente'),
    path('fantasias/', views.fantasias_view, name='fantasias'),
    path('historico/', views.historico_view, name='historico'),
    path('', views.index, name='index'),
] 