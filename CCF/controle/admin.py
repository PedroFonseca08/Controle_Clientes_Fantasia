from django.contrib import admin
from .models import Usuario, Cliente, Fantasia, ClienteFantasia

admin.site.register(Usuario)
admin.site.register(Cliente)
admin.site.register(Fantasia)
admin.site.register(ClienteFantasia)
