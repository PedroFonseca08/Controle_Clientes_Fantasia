from django.contrib import admin
from .models import  Cliente, Tipo, Fantasia, ClienteFantasia, FormaPagamento

class ClienteAdmin(admin.ModelAdmin):
    list_display = ("nome_cliente", "tel_cliente")

class FantasiaAdmin(admin.ModelAdmin):
    list_display = ("nome_fantasia", "_tipo_fantasia")

    def _tipo_fantasia(self, obj):
        return obj.tipo_fantasia.nome_tipo
    
class TipoAdmin(admin.ModelAdmin):
    list_display = []
    list_display.append("nome_tipo")

class PagamentoAdmin(admin.ModelAdmin):
    list_display = []
    list_display.append("forma_pagamento")

class TransacaoAdmin(admin.ModelAdmin):
    list_display = ("_nome_cliente", "_nome_fantasia", "data_inicio_fantasia", "data_fim_fantasia")

    def _nome_cliente(self, obj):
        return obj.cliente.nome_cliente
    
    def _nome_fantasia(self, obj):
        return obj.fantasia.nome_fantasia   

admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Tipo, TipoAdmin)
admin.site.register(Fantasia, FantasiaAdmin)
admin.site.register(FormaPagamento, PagamentoAdmin)
admin.site.register(ClienteFantasia, TransacaoAdmin)
