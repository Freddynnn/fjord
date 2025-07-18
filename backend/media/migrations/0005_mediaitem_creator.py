# Generated by Django 5.2.4 on 2025-07-18 00:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media', '0004_creator'),
    ]

    operations = [
        migrations.AddField(
            model_name='mediaitem',
            name='creator',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='media_items', to='media.creator'),
        ),
    ]
