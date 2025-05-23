import requests
from bs4 import BeautifulSoup
from Headers import getHeader
import time
import json

maxPages = 1

modelGlob = None
makeGlob = None
trimGlob = None

def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global maxPages

    modelGlob = model
    makeGlob = make
    trimGlob = trim

    if pageNumber > maxPages:
        return []
    
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = punctuate(model,make,trim)

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,zip,radius,trim)

    content = requests.get(initialAddress).text

    soup = BeautifulSoup(content,'html.parser')

    if newRequest:
        maxPages = findTotalRecords(soup)
    
    info = scrapInfo(soup)

    return info

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
    allListings = html.find("div",class_ = "srp-list-container srp-list-container--srp")
    
    allListings = allListings.children

    info = []

    for listing in allListings:
        try:
            className = listing['class']  
        except:
            className = ""
        try:
            style = listing['style']
        except:
            style = ""
        if (style == "display:contents"):  
            try:
                vehicleCard = listing.find("article",class_="srp-list-item")
                infoScraped = scrapCard(vehicleCard,html)
                # We will append to the info array
                info.append(infoScraped)
            except Exception as e:
                pass
        if (" ".join(className) == "srp-list-item"):
            try:
                infoScraped = scrapCard(listing,html)
                # We will append to the info array
                if infoScraped is not None:
                    info.append(infoScraped)
            except Exception as e:
                pass
    return info

def scrapTrim(card,html):
    global modelGlob
    global makeGlob
    global trimGlob
    try:
        description = scrapDescription(card,html)
        description = description.lower()
        if modelGlob is not None:
            # Find out the model from the description by matching and then replace it by an empty string
            description = description.replace(modelGlob.lower(),"")
        if makeGlob is not None:
            description = description.replace(makeGlob.lower(),"")
        if trimGlob is not None:
            description = description.replace(trimGlob.lower(),"")
        description = description.split(" ")[-1].strip()
    except Exception as e:
        description = ""
    return description # However this is not always the case

def scrapCard(card,html):
    global makeGlob
    info = {
        "imageUrl": scrapImageUrl(card,html),
        "description": scrapDescription(card,html),
        "price": scrapPrice(card,html),
        "mainUrl": scrapMainLink(card),
        "mileage": scrapMileage(card),
        "trim": scrapTrim(card,html)
    }

    if makeGlob.lower() not in info["description"].lower():
        return None

    return info 

def scrapPrice(card,html):
    try:
        priceDiv = card.find("div",class_="srp-list-item__price srp-list-item__section")
        priceSpan = priceDiv.text
        priceSpan = priceSpan.split(":")[1]
        return int(priceSpan.strip("()").replace("$","").replace(",","").strip())
    except Exception as e:
        return "Price not found"

def scrapMainLink(card):
    # It is the same as the id
    # Find out the identification number of the vehicle
    idDiv = card.find("div",class_="srp-list-item__vehicle-history__vin")
    idDivSpan = idDiv.find("span")
    id_ = idDivSpan.text

    return f"https://www.carfax.com/vehicle/{id_}"

def scrapMileage(card):
    try:
        divText = card.find("span",class_="srp-list-item__basic-info-value")

        divText = divText.text.split(":")[1]

        divText = divText.strip()

        divText = divText.replace("miles","")

        divText = divText.split(" ")[0].replace(",","")
        return int(divText)
    except Exception as e:
        return "Mileage not found"

def scrapDescription(card,html):
    try:
        # Find out the identification number of the vehicle
        idDiv = card.find("div",class_="srp-list-item__vehicle-history__vin")
        idDivSpan = idDiv.find("span")
        id_ = idDivSpan.text
        # Find the image of the vehicle
        return findDescriptionFromId(id_,html)
    except Exception as e:
        return "Image not found"

def findDescriptionFromId(id,html):
    # Find out the application/ld json
    scripts = html.find("script",type="application/ld+json")

    # Lets load the json
    jsonText = json.loads(scripts.text)

    # Find all the vehicles listings
    vehicles = jsonText

    for vehicle in vehicles:
        try:
            if vehicle["@type"] == "Vehicle":
                if str(vehicle["vehicleIdentificationNumber"]) == str(id):
                    return vehicle["name"]
        except Exception as e:
            pass
    return "Description not found"

def scrapImageUrl(card,html):
    try:
        # Find out the identification number of the vehicle
        idDiv = card.find("div",class_="srp-list-item__vehicle-history__vin")
        idDivSpan = idDiv.find("span")
        id_ = idDivSpan.text
        # Find the image of the vehicle
        return findImageFromId(id_,html)
    except Exception as e:
        return "Image not found"

def findImageFromId(id,html):
    # Find out the application/ld json
    scripts = html.find("script",type="application/ld+json")

    # Lets load the json
    jsonText = json.loads(scripts.text)

    # Find all the vehicles listings
    vehicles = jsonText

    for vehicle in vehicles:
        try:
            if vehicle["@type"] == "Vehicle":
                if str(vehicle["vehicleIdentificationNumber"]) == str(id):
                    return vehicle["image"]
        except Exception as e:
            pass
    return "Image not found"
            
    

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

if __name__ == "__main__":
    raise Exception("This file is not meant to be run directly")