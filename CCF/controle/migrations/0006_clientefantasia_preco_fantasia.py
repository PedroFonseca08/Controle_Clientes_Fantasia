# Generated by Django 5.0.4 on 2024-05-06 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controle', '0005_alter_cliente_usuario_delete_usuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientefantasia',
            name='preco_fantasia',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
