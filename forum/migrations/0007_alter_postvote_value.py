# Generated by Django 5.1.2 on 2024-10-21 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forum", "0006_alter_postvote_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="postvote",
            name="value",
            field=models.SmallIntegerField(
                choices=[(1, "Upvote"), (-1, "Downvote")], default=0
            ),
        ),
    ]
