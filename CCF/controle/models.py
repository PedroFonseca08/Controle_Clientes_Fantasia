from django.db import models
from django.contrib.auth.models import User
from django.db.models import UniqueConstraint


class Cliente(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100, null=False)
    cpf_cliente = models.CharField(max_length=18, null=False)
    tel_cliente = models.CharField(max_length=14, null=False)
    tel2_cliente = models.CharField(max_length=14, null=True, blank=True)
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

    def __str__(self):
        return f"{self.nome_cliente}"

    class Meta:
        constraints = [
            UniqueConstraint(fields=['cpf_cliente', 'usuario'], name='unique_cliente_cpf_usuario')
        ]

class Tipo(models.Model):
    nome_tipo = models.CharField(max_length=60, unique=True, null=False)

    def __str__(self):
        return f"{self.nome_tipo}"

class Fantasia(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_fantasia = models.CharField(max_length=60, unique=True)
    preco_venda = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    preco_aluguel = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo_fantasia = models.ForeignKey(Tipo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nome_fantasia}"

class ClienteFantasia(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fantasia = models.ForeignKey(Fantasia, on_delete=models.CASCADE)
    preco_fantasia = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_inicio_fantasia = models.DateField()
    data_fim_fantasia = models.DateField(blank=True, null=True)
    tipo_transacao = models.CharField(max_length=1, null=False) 
    baixa_fantasia = models.CharField(max_length=1, null=False)

    def __str__(self):                 
        return f"{self.cliente.nome_cliente} - {self.fantasia.nome_fantasia}"   
