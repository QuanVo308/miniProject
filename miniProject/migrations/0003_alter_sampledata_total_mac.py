# Generated by Django 4.0.4 on 2022-05-18 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miniProject', '0002_remove_sampledata__id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sampledata',
            name='total_mac',
            field=models.IntegerField(),
        ),
    ]