from django.db import models
from django.contrib.auth.models import User


class Cliente(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100, null=False)
    cpf_cliente = models.CharField(max_length=18, unique=True, null=False)
    tel_cliente = models.CharField(max_length=14, null=False)
    tel2_cliente = models.CharField(max_length=14, null=True)
    logradouro_cliente = models.CharField(max_length=150, null=False)
    num_logradouro = models.CharField(max_length=15, null=False)
    complemento_logradouro = models.CharField(max_length=100, blank=True, null=True)
    bairro_logradouro = models.CharField(max_length=100, blank=True, null=True)
    uf_logradouro = models.CharField(max_length=2, blank=True, null=True)
    municipio_logradouro = models.CharField(max_length=100, blank=True, null=True)
    data_nasc_cliente = models.DateField(blank=True, null=True)
    cep_cliente = models.CharField(max_length=9, blank=True)
    email_cliente = models.CharField(max_length=80, blank=True)
    observacao_cliente = models.TextField(blank=True, null=True)

class Tipo(models.Model):
    nome_tipo = models.CharField(max_length=60, unique=True, null=False)

class Fantasia(models.Model):
    nome_fantasia = models.CharField(max_length=60)
    preco_venda = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    preco_aluguel = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo_fantasia = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    #imagem_fantasia = models.ImageField(upload_to='imagens_fantasias/', blank=True, null=True)

class ClienteFantasia(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fantasia = models.CharField(max_length=80, null=False) 
    preco_fantasia = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_inicio_fantasia = models.DateField()
    data_fim_fantasia = models.DateField(blank=True, null=True)
    tipo_fantasia = models.CharField(max_length=1, null=False) 
    baixa_fantasia = models.CharField(max_length=1, null=False)    
