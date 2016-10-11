from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

from tempfile import mkstemp
from shutil import move
from os import remove, close


def replace(file_path, variableName, newValue):
    # Create temp file
    fh, abs_path = mkstemp()
    with open(abs_path, 'w') as new_file:
        with open(file_path) as old_file:
            for line in old_file:

                line = line.strip()

                if line.startswith("this." + variableName) and "=" in line:
                    beforeValue = line[:line.index("\"")].replace(" ", "")
                    value = line[line.index("\"") + 1:len(line) - 2]

                    new_file.write(line.replace(value, newValue) + "\n")


                else:
                    line += "\n"
                    new_file.write(line)

    close(fh)
    # Remove original file
    remove(file_path)
    # Move new file
    move(abs_path, file_path)


def index(request):
    filePath = request.GET['filePath']
    variableName = request.GET['variableName']
    newValue = request.GET['newValue']

    print filePath

    replace(filePath, variableName, newValue)

    return HttpResponse(

        "File Path: " + filePath + "<br/>"
                                   "variable Name: " + variableName + "<br/>"
                                                                      "New Value: " + newValue + "<br/>"

    )
