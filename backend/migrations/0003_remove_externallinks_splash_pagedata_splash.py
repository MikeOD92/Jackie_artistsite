# Generated by Django 4.0.4 on 2022-06-02 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_externallinks_splash'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='externallinks',
            name='splash',
        ),
        migrations.AddField(
            model_name='pagedata',
            name='splash',
            field=models.CharField(max_length=500, null=True),
        ),
    ]