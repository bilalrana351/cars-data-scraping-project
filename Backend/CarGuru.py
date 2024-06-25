import Helpers
import requests
from bs4 import BeautifulSoup
import json

maxPages = 3

vehicleCode = "" # We have to find out this code from the website

headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests":"1"
}

def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global maxPages
    global headers

    if pageNumber > maxPages:
        return []
    
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    trim = changeTrim(trim)

    vehicleCode = findOutInitialCode(make,model)

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,vehicleCode,trim,zip,radius)

    print(initialAddress)

    response = requests.get(initialAddress,headers=headers)

    content = response.text

    soup = BeautifulSoup(content,'html.parser')

    with open("open.html","w") as f:
        f.write(soup.prettify())

    if newRequest:
        maxPages = getMaxPages(soup)
    
    info = scrapInfo(soup,initialAddress)

    print(info)

    return info

def interPretFigures(radius,zip,yearMin,yearMax):
    if radius == -1 or zip == None:
        radius = 50000
    if zip == None:
        zip = 60601
    if yearMin == None:
        yearMin = None
    if yearMax == None:
        yearMax = None

    return [radius,zip,yearMin,yearMax]

def getMaxPages(html):
    try:
        pageCountFooter = html.find("div",class_="CX86_7").text
        pageCountFooter = pageCountFooter.split("f")
        count = int(pageCountFooter[-1])
        print(count)
        return count
    except Exception as e:
        print(e,"In getMaxPages")
        return 0

def changeTrim(trim):
    if trim == None:
        return None
    return trim.replace(" ","%20")

def findMakeCode(make):
    try:
        with open("makesValuesCarGuru.txt","r") as f:
            values = json.loads(f.read())
            return values[make]
    except Exception as e:
        print(e)
        return None

def findModelCode(make,model):
    makeCode = findMakeCode(make)
    if (makeCode == None):
        return None

def scrapInfo(html,url):
    # The application ld+json is the best way to get the data
    # We have to find the ld+json tag
    ldJson = html.find("script",type="application/ld+json")

    info = []

    if ldJson is None:
        print("No load json found")
        return []
    
    ldJson = json.loads(ldJson.text)

    ldJson = ldJson["@graph"]
    ldJson = ldJson[0]["offers"]
    ldJson = ldJson["offers"]

    for car in ldJson:
        info.append(scrapFromJson(car,url))

    return info

def scrapFromJson(car,url):
    try:
        imageUrl = car['itemOffered']["image"]
    except Exception as e:
        print(e,"In image url")
        imageUrl = "Image not found"
    try:
        description = car['itemOffered']['name']
    except Exception as e:
        print(e,"In description")
        description = "Description not found"
    try:
        price = car['price']
    except Exception as e:
        print(e,"In price")
        price = "Price not found"
    try:
        sku = car['itemOffered']['sku']
        mainUrl = url + "#listing=" + sku
    except Exception as e:
        print(e,"In sku")
        mainUrl = "Url not found"
    try:
        mileage = car['itemOffered']['mileageFromOdometer']['value']
    except Exception as e:
        print(e,"In mileage")
        mileage = "Mileage not found"
    return {
        "imageUrl": imageUrl,
        "description": description,
        "price": price,
        "mainUrl": mainUrl,
        "mileage": mileage
    }
    


def findOutInitialCode(make,model):
    if model is None:
        # Lets load the makes car guru file
        with open("makesvalueCarGuru.txt","r") as f:
            makes = {}
            try:
                makes = json.loads(f.read())
            except Exception as e:
                print(e)
                makes = {}
            # Now we have to find the make code
            for fileMake in makes:
                if (fileMake.lower().replace(" ","") == make.lower().replace(" ","")):
                    return makes[fileMake]
            return None
    elif model is not None and make is not None:
        # Lets load the models car guru file
        with open("modelsCarGuru.txt","r") as f:
            models = {}
            try:
                models = json.loads(f.read())
            except Exception as e:
                print(e)
                models = {}
            # Now we have to find the model code
            for fileModel in models:
                if (fileModel.lower().replace(" ","") == make.lower().replace(" ","") + model.lower().replace(" ","")):
                    return models[fileModel]
            return None

def getInitialAddress(pageNumber,yearMin,yearMax,code,trim,zip,radius):
    "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?zip=60601&inventorySearchWidgetType=AUTO&trimNames=Luxury%20Sedan%20RWD&shopByTypes=NEAR_BY&sortDir=ASC&sourceContext=carGurusHomePageModel&distance=50000&sortType=BEST_MATCH&endYear=2023&entitySelectingHelper.selectedEntity=d2876&startYear=2021"
    
    url = "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?"

    url += "zip=" + str(zip) + "&"

    url += "inventorySearchWidgetType=AUTO&"

    if trim is not None:
        url += "trimNames=" + trim + "&"
    
    url += "shopByTypes=NEAR_BY&"

    url += "sortDir=ASC&"

    url += "sourceContext=carGurusHomePageModel&"

    url += "distance=" + str(radius) + "&"

    url += "sortType=BEST_MATCH&"

    if yearMax is not None:
        url += "endYear=" + str(yearMax) + "&"
    
    url += "entitySelectingHelper.selectedEntity=" + code + "&"

    if yearMin is not None:
        url += "startYear=" + str(yearMin)

    if pageNumber != 1:
        url += "#resultsPage=" + str(pageNumber)

    return url