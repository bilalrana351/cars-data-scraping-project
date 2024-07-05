# Here we will need the zipcodes library to get the city and state from a zip code.
import zipcodes
import requests
from Headers import getHeader
from bs4 import BeautifulSoup
import Helpers
import validators
from requests_html import HTMLSession
import json

recordsInAPage = 30

maxPages = 1

makeGlob = None

# This site gives a maximum of 30 records per page
def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global recordsInAPage
    global maxPages
    global makeGlob

    makeGlob = make

    # If it is a new request we will reset the page number
    if newRequest:
        pass
    
    if (pageNumber > maxPages):
        return []

    # Get the spaces in the makes, models, and trims convert to - for the url

    # This all is input preprocessing
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = replaceSpaces(model,make,trim)
    

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius)

    response = requests.get(initialAddress)

    soup = BeautifulSoup(response.text,'html.parser')

    with open("truecar.html","w") as f:
        f.write(str(soup))

    imagesInfo = findAllImagesUrl(soup)


    if newRequest:
        maxPages = findTotalRecords(soup)


    info = scrapInfo(soup,imagesInfo,False)

    return info

def findTotalRecords(html):
    try:
        mainDiv = html.find("div",class_ = "flex items-center justify-between")
        mainSpan = mainDiv.find("span",class_ = "hidden-md-up")
        content = mainSpan.text
        content = content.split(" ")[0]
        return int(content.replace(",",""))
    except Exception as e:
        return 0 

def scrapMileage(html):
    try:
        mileageDiv =  html.find("div",{"data-test":"vehicleMileage"})
        mileage = mileageDiv.text
        mileage = mileage.replace("k","000")
        mileage = mileage.replace("K","000")
        mileage = mileage.replace("mi","")
        mileage = mileage.replace("Miles","")
        mileage = mileage.replace(" ","")
        return int(mileage)
    except Exception as e:
        return "Mileage not found"

def findAllImagesUrl(html):
    scriptTags = html.find("script",id="__NEXT_DATA__")

    tag = json.loads(scriptTags.text)

    tag = tag['props']

    tag = tag['pageProps']

    tag = tag['__APOLLO_STATE__']
    
    allInfo = []

    for i,scriptTags in enumerate(tag):
        if ("listing" not in scriptTags.lower()):
            continue
        allInfo.append(tag[scriptTags])
    
    return allInfo
    


def replaceSpaces(model,make,trim):
    # In all the makes models and trims we will replace space with -
    if model == None: # In case of None we will let None be None
        pass
    else: 
        model = model.replace(" ","-").lower()
    if make == None:
        pass
    else:
        make = make.replace(" ","-").lower()
    if trim == None:
        pass
    else:
        trim = trim.replace(" ","-").lower()
    return [model,make,trim]
    
def scrapInfo(html,imagesInfo,lastPage):
    allListings = html.find("ul","row mb-3 mt-1").children

    info = []

    for listing in allListings:
      className = listing['class']  
      className = " ".join(className)
      if (className == "mx-1 mt-3 w-full md:hidden"):
          continue
      infoScraped = scrapCard(listing,imagesInfo)
      # We will append to the info array
      if infoScraped is not None:
        info.append(infoScraped)
      
    return info

def scrapTrim(card):
    try:
        trim = card.find("div",{"data-test":"vehicleCardTrim"}).text
    except Exception as e:
        print(e)
        trim = ""
    return trim
        
def scrapCard(card,imagesInfo):
    global makeGlob
    info = {
        "imageUrl": scrapImageUrl(card,imagesInfo),
        "description": scrapDescription(card),
        "price": scrapPrice(card),
        "mainUrl": scrapMainLink(card),
        "mileage": scrapMileage(card),
        "trim": scrapTrim(card)
    }

    if makeGlob.lower() not in info["description"].lower():
        return None

    return info

def scrapPrice(card):
    try:
        price = card.find("span",{"data-test":"vehicleCardPriceLabelAmount"})
        return price.text
    except Exception as e:
        return "Price not found"

def scrapMainLink(card):
    try:
        link = card.find("a",{"data-test":"vehicleCardLink"})
        return "https://truecar.com" + link['href']
    except:
        return "Link not found"

def scrapImageUrl(card,imagesInfo):
    try:
        # Find the id of the card
        idDiv = card.find("div",class_="relative rounded-md shadow-lg")
        id_ = idDiv['data-test-item']
        for info in imagesInfo:
            if (id_ == info["vehicle"]["vin"]):
                return "https://listings-prod.tcimg.net/" + info["galleryImages:{}"]["nodes"][0]["url"] + "-cr-540.jpg"
    except Exception as e:
        return "Image not found"
    
def scrapDescription(card):
    try:
        descriptionDiv = card.find("div",class_="text-sm")
        upperData = descriptionDiv.find("div",class_="w-full truncate font-bold")
        upperData = upperData.text
        upperData = upperData.split(" ")
        upperData = upperData[1:]
        upperData = " ".join(upperData)
        lowerData = descriptionDiv.find("div",class_="w-full truncate")
        lowerData = lowerData.text
        totalData = upperData + " " + lowerData
        return totalData
    except Exception as e:
        return "Description not found"

def getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius):
    # This is the base address
    address = "https://www.truecar.com/used-cars-for-sale/listings/"
    
    # This is the address for the make
    if make != None:
        address += make + "/"
    
    # This is the address for the model
    if model != None:
        address += model + "/"
    
    # This is the address for the year
    address += "year-" + str(yearMin) + "-" + str(yearMax) + "/"
    
    # This is the address for the zip code
    if zip != None:
        address += "location-" + str(zip) + "/"

    address += "?excludeExpandedDelivery=true&"

    address += "page=" + str(pageNumber) + "&"
    
    # This is the address for the radius
    if radius != None or zip == None:
        address += "searchRadius=" + str(radius) + "&"
    
    if trim != None:
        address += "trim=" + str(trim)
    
    return address


def interPretFigures(radius,zip,yearMin,yearMax):
    # In case of nationwide, it will be 5000 forthis site
    if radius == -1 or zip == None:
        radius = 5000

    # This website demands that you give the zip code so it cannot be none, else we will return empty
    if zip == None:
        zip = 10001
    
    if yearMin == None:
        yearMin = "min"

    # TODO
    if yearMax == None:
        yearMax = "max"

    # To get the city and state from the zip code
    data = zipcodes.matching(str(zip))
    city = data[0]['city'].lower()
    city = city.replace(" ","-")
    state = data[0]['state'].lower()
    state = state.replace(" ","-")
    zip = city + "-" + state

    return [radius,zip,yearMin,yearMax]
    
if __name__ == '__main__':
    raise Exception("This file is not meant to run by itself")