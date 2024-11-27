# Generated by Django 5.1.3 on 2024-11-27 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.TextField()),
                ('registration_date', models.TextField()),
                ('borning_place', models.TextField()),
                ('passport', models.TextField()),
                ('registration_address', models.TextField()),
                ('registration_sign', models.TextField()),
                ('mark_and_model', models.TextField()),
                ('VIN', models.TextField()),
                ('type', models.TextField()),
                ('release_year', models.TextField()),
                ('engine', models.TextField()),
                ('chassis', models.TextField()),
                ('body', models.TextField()),
                ('color', models.TextField()),
                ('might', models.TextField()),
                ('ecological_class', models.TextField()),
                ('max_mass', models.TextField()),
                ('stressless_mass', models.TextField()),
                ('PTS_number', models.TextField()),
                ('PTS_extradition', models.TextField()),
            ],
        ),
    ]
