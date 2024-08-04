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
    
    def save(self, *args, **kwargs):
        self.nome_cliente = self.nome_cliente.upper()
        self.logradouro_cliente = self.logradouro_cliente.upper()
        self.complemento_logradouro = self.complemento_logradouro.upper()
        self.bairro_logradouro = self.bairro_logradouro.upper()
        self.uf_logradouro = self.uf_logradouro.upper()
        self.municipio_logradouro = self.municipio_logradouro.upper()
        self.observacao_cliente = self.observacao_cliente.upper()
        super(Cliente, self).save(*args, **kwargs)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['cpf_cliente', 'usuario'], name='unique_cliente_cpf_usuario')
        ]

class Tipo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_tipo = models.CharField(max_length=60, unique=True, null=False)

    def __str__(self):
        return f"{self.nome_tipo}"
    
    def save(self, *args, **kwargs):
        self.nome_tipo = self.nome_tipo.upper()
        super(Tipo, self).save(*args, **kwargs)

class Fantasia(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_fantasia = models.CharField(max_length=60)
    preco_venda = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    preco_aluguel = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo_fantasia = models.ForeignKey(Tipo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nome_fantasia}"
    
    def save(self, *args, **kwargs):
        self.nome_fantasia = self.nome_fantasia.upper()
        super(Fantasia, self).save(*args, **kwargs)

class FormaPagamento(models.Model):
    forma_pagamento = models.CharField(max_length=60, unique=True, null=False)

    def __str__(self):
        return f"{self.forma_pagamento}"

class ClienteFantasia(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fantasia = models.ForeignKey(Fantasia, on_delete=models.CASCADE)
    preco_fantasia = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_inicio_fantasia = models.DateField()
    data_fim_fantasia = models.DateField(blank=True, null=True)
    tipo_transacao = models.CharField(max_length=1, null=False) 
    baixa_fantasia = models.CharField(max_length=1, null=False)
    forma_pagamento = models.ForeignKey(FormaPagamento, on_delete=models.CASCADE)

    def __str__(self):                 
        return f"{self.cliente.nome_cliente} - {self.fantasia.nome_fantasia}"   
