from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, FileResponse
from .archive_creator.archive_creator import *
from .models import Person
from datetime import datetime

# Create your views here.

def main_view(request: HttpRequest)-> HttpResponse:
    models_data = list(Person.labels.items())

    if "id" in request.GET:
        person = Person.objects.get(id = request.GET["id"])
        def add_new_parameter(item: tuple)->tuple:
            result = (item[0], item[1], person.__getattribute__(item[0]))
            return result
        models_data = list(map(add_new_parameter, models_data))


    template_name = "main/index.html"
    context = {"fields": models_data, "short_data": Person.get_short_objects()}
    if "download_page" in request.GET:
        context["download_page"] = True
    return render(request, template_name, context)


def create_archive(request: HttpRequest)-> HttpResponse:
    indexes = request.GET["indexes"].split(',')

    archive = Archive()
    with archive:
        for index in indexes:
            downloaded_person = Person.objects.get(id = index)
            downloaded_person.is_downloaded = True
            downloaded_person.save()
            first_document = FirstTemplateWordCreator()
            first_document.render(downloaded_person.get_data_as_dict())
            second_document = SecondTemplateWordCreator()
            second_document.render(downloaded_person.get_data_as_dict())
            archive.add_file(first_document)
            archive.add_file(second_document)
    data = archive.get_data()
    return HttpResponse(
        data, headers={"Content-Type": "application/zip", "Content-Disposition": f'attachment; filename="Documents.zip"'},
    )


def add_person(request: HttpRequest)->HttpResponse:
    data = dict(request.POST)
    del data["csrfmiddlewaretoken"]
    for key in data.keys():
        data[key] = data[key][0]

    try:
        new_person = Person.objects.create(**data)
        return redirect(f"/main_page?id={new_person.id}")
    except(TypeError):
        return HttpResponse("Какая-то ошибка(")

def delete_person(request: HttpRequest)-> HttpResponse:
    Person.objects.get(id = request.POST["id"]).delete()
    return redirect("/main_page?download_page=1")