# Generated by Django 5.0.4 on 2024-05-05 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controle', '0002_fantasia_imagem_fantasia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clientefantasia',
            name='data_fim_fantasia',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clientefantasia',
            name='data_inicio_fantasia',
            field=models.DateField(),
        ),
    ]
