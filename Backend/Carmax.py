import requests
from bs4 import BeautifulSoup
import time
import json

headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests":"1",
    "Content-Type":"application/json"
}

maxPages = 3

makeGlob = None

def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global maxPages
    global headers
    global makeGlob

    makeGlob = make

    if pageNumber > maxPages:
        return []
    
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = addSpaces(model,make,trim)

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius)

    response = requests.get(initialAddress,headers=headers)

    content = None

    try:
        content = response.json()
    except Exception as e:
        return []

    if newRequest:
        maxPages = getMaxPages(content)
    
    info = scrapInfo(content)


    return info

def interPretFigures(radius,zip,yearMin,yearMax):
    if yearMax == None:
        yearMax = time.localtime().tm_year
    if yearMin == None:
        yearMin = 1900
    if radius == -1 or zip == None or radius == None:
        radius == None
    if zip == None:
        zip = 60601

    return [radius,zip,yearMin,yearMax]

def addSpaces(model,make,trim):
    if model != None:
        model = model.replace(" ","-")
    if make != None:
        make = make.replace(" ","-")
    if trim != None:
        trim = trim.replace(" ","-")
    return [model,make,trim]

def getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius):
    url = "https://www.carmax.com/cars/api/search/run?uri=/cars"
    url += "/" + make.lower() if make != None else ""
    url += "/" + model.lower() if model != None else ""
    url += "/" + trim.lower() if trim != None else ""
    url += "?year="
    url += str(yearMin) if yearMin != None else ""
    url += "-"
    url += str(yearMax) if yearMax != None else ""
    url += "&skip="
    url += str((pageNumber-1)*24)
    url += "&take=24"
    url += ("&zipCode=" + str(zip)) if zip != None else ""
    url += "&shipping=-1"
    url += "&sort=bestmatch"
    url += ("&radius=" + str(radius)) if radius != None else ""
    return url

def getMaxPages(content):
    try:
        count = content["totalCount"]
        return (count // 24) + 1
    except Exception as e:
        return 0

def scrapInfo(content):
    global makeGlob
    info = []
    for car in content["items"]:
        try:
            mainUrl = "https://www.carmax.com/car/" + str(car["stockNumber"])
        except Exception as e:
            mainUrl = "Url not found"
        try:
            description = str(car["year"]) + " " + car["make"] + " " + car["model"] + " " + car["trim"]
        except Exception as e:
            description = "Description not found"
        try:
            price = car["basePrice"]
        except Exception as e:
            price = "Price not found"
        try:
            imageUrl = car["heroImageUrl"]
        except Exception as e:
            imageUrl = "Image not found"
        try:
            mileage = car["mileage"]
        except:
            mileage = "Mileage not found"
        try:
            trim = car["trim"]
        except Exception as e:
            print(e,"In trim")
            trim = ""
        if trim == None:
            trim = ""
        
        if makeGlob.lower() not in description.lower():
            continue

        info.append({
            "mainUrl" : mainUrl,
            "description" : description,
            "price" : price,
            "imageUrl" : imageUrl,
            "mileage" : mileage,
            "trim": trim
        }) 
    return info

if __name__ == "__main__":
    info = scrapCars(1,make="Toyota",radius=100)
    json.dump(info,open("Carmax.json","w"))
    raise Exception("This file is not meant to run")