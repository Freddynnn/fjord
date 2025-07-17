from media.models import MediaItem

items = [
    {
        "title": "Inception",
        "media_type": "movie",
        "release_date": "2010-07-16",
        "cover_image_url": "https://example.com/inception.jpg"
    },
    {
        "title": "Breaking Bad",
        "media_type": "show",
        "release_date": "2008-01-20",
        "cover_image_url": "https://example.com/breakingbad.jpg"
    }
]

for item in items:
    MediaItem.objects.create(**item)
