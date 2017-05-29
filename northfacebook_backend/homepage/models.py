from django.db import models
from django.db.models import signals
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE,primary_key=True)
#    owner= models.ForeignKey('auth.User', on_delete=models.CASCADE)
    myname = models.TextField()
    mybelong = models.TextField()
    myintro = models.TextField()
 
def create_profile(sender, instance, created, **kwargs):
    #create Profile for every new User model
    if created:
        Profile.objects.create(user=instance)
signals.post_save.connect(create_profile, sender='auth.User', weak=False)
#, dispatch_uid='models.create_profile'

class Like(models.Model):
    parent = models.ForeignKey('Article',
            on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User',
            on_delete=models.CASCADE)

class Article(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    text = models.TextField()
    parent = models.ForeignKey('Article',
        on_delete=models.CASCADE,default=0)
    owner = models.ForeignKey('auth.User',
        on_delete=models.CASCADE)
    children_num = models.IntegerField(default=0)
    like_num = models.IntegerField(default=0)
    depth = models.IntegerField(default=0)
    class Meta:
        ordering = ['-created_time']

class Chat(models.Model):
    room_name = models.TextField()
    chatuser_num = models.IntegerField(default=0)

class ChatUser(models.Model):
   chatroom = models.ForeignKey('Chat', related_name='chatroom', on_delete=models.CASCADE)
   chatuser = models.ForeignKey('auth.User', related_name='chatuser', on_delete=models.CASCADE)

class Text(models.Model):
    text = models.TextField()
    room = models.ForeignKey('Chat', related_name='room',on_delete=models.CASCADE)
    writer = models.ForeignKey('auth.User', related_name='writer', on_delete=models.CASCADE)
    created_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_time']
