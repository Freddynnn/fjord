from django.contrib.auth import get_user_model
from media.models import MediaItem, Creator, UserMediaEntry
from django.utils.timezone import now

def run():
    User = get_user_model()

    # Create test user
    test_user, _ = User.objects.get_or_create(username='testuser')
    test_user.set_password('testpass123')
    test_user.save()

    # Ensure creators exist or create them
    nolan, _ = Creator.objects.get_or_create(name="Christopher Nolan")
    gilligan, _ = Creator.objects.get_or_create(name="Vince Gilligan")

    # Media items to insert
    items = [
        {
            "title": "Inception",
            "media_type": "movie",
            "release_date": "2010-07-16",
            "cover_image_url": "https://example.com/inception.jpg",
            "creator": nolan
        },
        {
            "title": "Breaking Bad",
            "media_type": "show",
            "release_date": "2008-01-20",
            "cover_image_url": "https://example.com/breakingbad.jpg",
            "creator": gilligan
        }
    ]

    # Create MediaItems
    for item in items:
        MediaItem.objects.create(**item)

    # Create UserMediaEntries
    media_entries = MediaItem.objects.all()
    for media in media_entries:
        UserMediaEntry.objects.create(
            user=test_user,
            media=media,
            status="completed",
            rating=8.5,
            grade="A",
            notes=f"Loved watching {media.title} again!",
        )

    print("Test data seeded.")
