from django.db import models

# Models related of artworks and imgs attached to those works

class Artwork(models.Model):
    title = models.CharField(max_length=500)
    medium = models.CharField(max_length=500)
    dimensions = models.CharField(max_length=300)
    data = models.CharField(max_length=100)

class ArtworkMedia(models.Model):
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, null=True, related_name='work_img')
    img = models.CharField(max_length=600, null = True, blank = True)

# Models for page data

class PageData(models.Model):
    name = models.CharField(max_length=300)
    text = models.CharField(max_length=8000, blank=True)


class ExternalLinks(models.Model):
    page = models.ForeignKey(PageData, on_delete=models.CASCADE, related_name='links')
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=200, blank=True)
    url = models.CharField(max_length=200)