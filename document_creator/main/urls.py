from django.urls import path
from .views import *

urlpatterns = [
    path("main_page", main_view),
    path("create_archive", create_archive),
    path("add_person/", add_person),
    path("delete_person", delete_person)
]