# Generated by Django 5.0.6 on 2024-07-17 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controle', '0012_tipo_remove_fantasia_estoque_fantasia_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='cpf_cliente',
            field=models.CharField(max_length=18),
        ),
    ]