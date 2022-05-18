from django.contrib import admin
from backend.models import Artwork, ArtworkMedia, ExternalLinks, PageData

# Register your models here.
admin.site.register(Artwork)
admin.site.register(ArtworkMedia)
admin.site.register(PageData)
admin.site.register(ExternalLinks)