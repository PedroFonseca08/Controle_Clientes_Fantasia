from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout, name='logout'),
    path('clientes/', views.clientes, name='clientes'),
    path('clientes/<int:id_cliente>/', views.detalhes_cliente, name='detalhes_cliente'),
    path('clientes/editar/<int:id_cliente>/', views.editar_cliente, name='editar_cliente'),
    path('clientes/deletar/<int:id_cliente>/', views.deletar_cliente, name='deletar_cliente'),
    path('clientes/historico/<int:id_cliente>/', views.historico, name='historico'),
    path('clientes/fantasias/<int:id_cliente>/', views.fantasias_cliente, name='fantasias_cliente'),
    path('fantasias/', views.fantasias_view, name='fantasias'),
    path('fantasias/<int:id_fantasia>/', views.detalhes_fantasia, name='detalhes_fantasia'),
    path('fantasias/editar/<int:id_fantasia>/', views.editar_fantasia, name='editar_fantasia'),
    path('fantasias/deletar/<int:id_fantasia>/', views.deletar_fantasia, name='deletar_fantasia'),
    path('historico/', views.historico_view, name='historico'),
    path('historico/<int:id_cliente_fantasia>/', views.detalhes_fantasia_cliente, name='detalhes_fantasia_cliente'),
    path('historico/editar/<int:id_cliente_fantasia>/', views.editar_fantasia_cliente, name='editar_fantasia_cliente'),
    path('historico/deletar/<int:id_cliente_fantasia>/', views.deletar_fantasia_cliente, name='deletar_fantasia_cliente'),
    path('tipo/', views.adicionar_tipo, name='adicionar_tipo'),
    path('', views.index, name='index'),
] 