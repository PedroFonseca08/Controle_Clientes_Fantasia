from django.db import models

class Usuario(models.Model):
    nome_usuario = models.CharField(max_length=30)
    email_usuario = models.EmailField(max_length=80, unique=True)
    senha_usuario = models.CharField(max_length=80)

class Cliente(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100, null=False)
    cpf_cliente = models.CharField(max_length=18, unique=True, null=False)
    tel_cliente = models.CharField(max_length=14, null=False)
    end_cliente = models.CharField(max_length=150, null=False)
    rg_cliente = models.CharField(max_length=20, blank=True)
    data_nasc_cliente = models.DateField(blank=True, null=True)
    cep_cliente = models.CharField(max_length=9, blank=True)
    observacao_cliente = models.TextField(blank=True, null=True)

class Fantasia(models.Model):
    nome_fantasia = models.CharField(max_length=60)
    estoque_fantasia = models.IntegerField(blank=True, null=True)
    observacao_fantasia = models.TextField(blank=True, null=True)

class ClienteFantasia(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fantasia = models.ForeignKey(Fantasia, on_delete=models.CASCADE)
    data_inicio_fantasia = models.DateTimeField()
    data_fim_fantasia = models.DateTimeField(blank=True, null=True)
    baixa_fantasia = models.CharField(max_length=1, null=False) 

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['cliente', 'fantasia', 'data_inicio_fantasia'],
                name='unique_cliente_fantasia_data_inicio'
            )
        ]
            

Cliente.fantasias = models.ManyToManyField(
    Fantasia, through=ClienteFantasia, related_name='clientes'
)