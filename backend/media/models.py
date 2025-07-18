from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


# Media Creator class (Authors, Directors etc.)
class Creator(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    


# Unique Media Item (Stored only once, not repeated for each user)
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

    # Required ForeignKey to Creator
    creator = models.ForeignKey(
        Creator,
        on_delete=models.PROTECT,  # prevent deletion of creator if in use
        related_name='media_items',
        null=False,
        blank=False,
        default=1,
    )
    
    class Meta:
        unique_together = ('title', 'media_type', 'creator')


    def __str__(self):
        return f"{self.title} ({self.media_type})"
    


# Individual user's entry for a given MediaItem, with ratings, notes etc.
class UserMediaEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    media = models.ForeignKey(MediaItem, on_delete=models.CASCADE)

    status = models.CharField(max_length=50)


    rating = models.DecimalField(
        max_digits=3,  
        decimal_places=1,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(10.0)
        ],
        default=5.0,
        help_text="Numeric rating out of 10 (e.g., 7.5)"
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
        default='C',
        help_text="Letter grade"
    )

    notes = models.TextField()

    class Meta:
        unique_together = ('user', 'media')

    def __str__(self):
        return f"{self.user.username} - {self.media.title}"
