from django.db import models
from django.contrib.auth.models import User

class MediaItem(models.Model):
    MEDIA_TYPES = [
        ('movie', 'Movie'),
        ('show', 'Show'),
        ('game', 'Game'),
        ('book', 'Book'),
        ('album', 'Album'),
    ]

    title = models.CharField(max_length=255)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)
    release_date = models.DateField(null=True, blank=True)
    cover_image_url = models.URLField(null=True, blank=True)
    
    class Meta:
        unique_together = ('title', 'media_type')

    def __str__(self):
        return f"{self.title} ({self.media_type})"

class UserMediaEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    media = models.ForeignKey(MediaItem, on_delete=models.CASCADE)
    
    status = models.CharField(max_length=50)
    
    rating = models.PositiveSmallIntegerField(
        null=True, blank=True,
        help_text="Numeric rating out of 10"
    )
    
    GRADE_CHOICES = [
        ('S+', 'S+'), ('S', 'S'), ('S-', 'S-'),
        ('A+', 'A+'), ('A', 'A'), ('A-', 'A-'),
        ('B+', 'B+'), ('B', 'B'), ('B-', 'B-'),
        ('C+', 'C+'), ('C', 'C'), ('C-', 'C-'),
        ('D', 'D'), ('F', 'F')
    ]
    grade = models.CharField(
        max_length=2,
        choices=GRADE_CHOICES,
        null=True, blank=True,
        help_text="Optional letter grade"
    )

    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.media.title}"