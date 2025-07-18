from django.contrib.auth import get_user_model
from media.models import MediaItem, UserMediaEntry, Creator

def run():
    # Delete in reverse dependency order
    UserMediaEntry.objects.all().delete()
    MediaItem.objects.all().delete()
    Creator.objects.all().delete()

    # Optional: also clear users except superuser
    User = get_user_model()
    User.objects.exclude(is_superuser=True).delete()

    print("All test data deleted.")
