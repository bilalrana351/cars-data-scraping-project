import requests
from bs4 import BeautifulSoup
from Headers import getHeader
import time

maxPages = 1

def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,recordsNumber=None,newRequest=False):
    global maxPages

    if pageNumber > maxPages:
        return []
    
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = punctuate(model,make,trim)

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,zip,radius,trim)

    content = requests.get(initialAddress,headers=getHeader()).text

    soup = BeautifulSoup(content,'html.parser')

    if newRequest:
        maxPages = findTotalRecords(soup)
    
    return scrapInfo(soup)

def findTotalRecords(html):
    try:
        return int(html.find("strong",{"id":"totalResultCount"}).text.replace(",",""))
    except:
        return 0

def punctuate(model,make,trim):
    # Ensure that the model, make, and trim are punctuated, ie the first letters are capitalized
    if model is not None:
        model = model.capitalize()
        model = model.replace(" ","%20")
    if make is not None:
        make = make.capitalize()
        make = make.replace(" ","%20")
    if trim is not None:
        trim = trim.replace(" ","%20")
    return model,make,trim

def scrapInfo(html):
    allListings = html.find("srp-list-container srp-list-container--srp")
    
    allListings = allListings.children

    info = []

    for listing in allListings:
        className = listing['class']  
        if (className == "display:contents"):  
            try:
                vehicleCard = listing.find("article",class_="srp-list-item")
                infoScraped = scrapCard(vehicleCard)
                # We will append to the info array
                info.append(infoScraped)
            except Exception as e:
                print(e)
        if (className == "srp-list-item"):
            try:
                infoScraped = scrapCard(listing)
                # We will append to the info array
                info.append(infoScraped)
            except Exception as e:
                print(e)
    print(len(info))
    return info

def scrapCard(card):
    return card

def interPretFigures(radius,zip,yearMin,yearMax):
    if radius is None:
        radius = 3000
    if zip is None:
        zip = 60601
    if yearMin is None:
        yearMin = 1985
    # Extract the current year
    if yearMax is None:
        yearMax = time.localtime().tm_year
    return radius,zip,yearMin,yearMax

def getInitialAddress(pageNumber,yearMin,yearMax,make,model,zip,radius,trim):
    url = "https://www.carfax.com/search?"
    if make is not None:
        url += f"make={make}&"
    if model is not None:
        url += f"model={model}&"
    if zip is not None:
        url += f"zip={zip}&"
    if radius is not None:
        url += f"radius={radius}&"
    if yearMin is not None:
        url += f"yearMin={yearMin}&"
    if yearMax is not None:
        url += f"yearMax={yearMax}&"
    url += f"vehicleCondition=USED&"
    if trim is not None:
        url += f"trims={trim}&"
    url += f"page={pageNumber}"
    return url

scrapCars(1,2001,2010,"Toyota","Camry",zip=60601,radius=50,recordsNumber=10,newRequest=True)