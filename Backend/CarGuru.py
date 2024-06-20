import Helpers
from Headers import getHeader
import requests
from bs4 import BeautifulSoup
import json

maxPages = 1

vehicleCode = "" # We have to find out this code from the website

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests":"1"
}

def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global maxPages
    global headers

    if newRequest:
        maxPages

    if pageNumber > maxPages:
        return []
    
    headers = headers
    
    if newRequest:
        vehicleCode = findOutInitialCode(make,model,headers)
    
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    # initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius)

def interPretFigures(radius,zip,yearMin,yearMax):
    if radius == -1 or zip == None:
        radius = 50000
    if yearMin == None:
        yearMin = None
    if yearMax == None:
        yearMax = None

    return [radius,zip,yearMin,yearMax]

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
    

def findOutInitialCode(make,model,headers):
    address = "https://cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action"
    makeCode = None

    if model == None:
        return findMakeCode(make)
    if model != None and make != None:
        return findModelCode(make,model)

    # Find model selection

# def buildInitialUrl():
#     initalAddress = "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?pageNumber,yearMin,yearMax,make,model,trim,zip,radius"
#     if zip != None:
#         initalAddress += f"zip={zip}&"
#     else:
#         initalAddress += f"zip=60601&"

#     initalAddress += "inventorySearchWidgetType=AUTO&sortDir=ASC&sourceContext=untrackedExternal_false_0"

#     if radius != None:
#         initalAddress += f"&distance={radius}"
    
#     initalAddress += "&sortType=BEST_MATCH"

#     if yearMax != None:
#         initalAddress += f"&endYear={yearMax}"
    
#     if yearMin != None:
#         initalAddress += f"&startYear={yearMin}"

def getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius):
    sampleAddress = "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?zip=60601&inventorySearchWidgetType=AUTO&sortDir=ASC&sourceContext=untrackedExternal_false_0&distance=100&sortType=BEST_MATCH&endYear=2023&entitySelectingHelper.selectedEntity=d834&startYear=2010"
    
    
    initalAddress += "&entitySelectingHelper.selectedEntity="
    pass


scrapCars(1,yearMin=2010,yearMax=2023,make="Toyota",model="Camry",trim="LE",zip=60601,radius=100,newRequest=True)