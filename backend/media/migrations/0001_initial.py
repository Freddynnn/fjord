# Generated by Django 5.2.4 on 2025-07-17 06:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MediaItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('media_type', models.CharField(choices=[('movie', 'Movie'), ('show', 'Show'), ('game', 'Game'), ('book', 'Book'), ('album', 'Album')], max_length=10)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('cover_image_url', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserMediaEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=50)),
                ('rating', models.PositiveSmallIntegerField(blank=True, help_text='Numeric rating out of 10', null=True)),
                ('grade', models.CharField(blank=True, choices=[('S+', 'S+'), ('S', 'S'), ('S-', 'S-'), ('A+', 'A+'), ('A', 'A'), ('A-', 'A-'), ('B+', 'B+'), ('B', 'B'), ('B-', 'B-'), ('C+', 'C+'), ('C', 'C'), ('C-', 'C-'), ('D', 'D'), ('F', 'F')], help_text='Optional letter grade', max_length=2, null=True)),
                ('notes', models.TextField(blank=True)),
                ('media', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='media.mediaitem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
