# Generated by Django 5.0.6 on 2024-07-17 18:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('controle', '0015_fantasia_usuario'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clientefantasia',
            old_name='tipo_fantasia',
            new_name='tipo_transacao',
        ),
    ]
