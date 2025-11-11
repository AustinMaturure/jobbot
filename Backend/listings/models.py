from django.db import models

# Create your models here.

class Job(models.Model):
    title = models.CharField(null=True, )
    location= models.CharField(null=True)
    department= models.CharField(null=True)
    date = models.DateTimeField(null=True)
    description= models.TextField(null=True)
    link= models.URLField(null=True)
    seniority= models.CharField(null=True)
    company= models.CharField(null=True)
    length= models.CharField(null=True)
    
    def __str__(self):
        return f"{self.title} - {self.location} - {self.company}"
