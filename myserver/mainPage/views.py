from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse


def index(request):
  return HttpResponse(

    '<form action="/program/" method="GET">'
    '<input type="text" placeholder="File Path" name="filePath"/><br/><br/>'
    '<input type="text" placeholder="Variable Name" name="variableName"><br/><br/>'
    '<input type="text" placeholder="New Value" name="newValue"><br/><br/>'
    '<input type="submit" value="Execute">'
    '</form>'

  )

