from django.contrib import admin
from .models import  Cliente, Tipo, Fantasia, ClienteFantasia

admin.site.register(Cliente)
admin.site.register(Tipo)
admin.site.register(Fantasia)
admin.site.register(ClienteFantasia)
