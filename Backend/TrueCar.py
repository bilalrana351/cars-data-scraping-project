# Here we will need the zipcodes library to get the city and state from a zip code.
import zipcodes
import requests
from Headers import getHeader
from bs4 import BeautifulSoup
import Helpers
import validators
from requests_html import HTMLSession

recordsInAPage = 30

# This site gives a maximum of 30 records per page
def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,recordsNumber=None,newRequest=False,):
    global recordsInAPage

    # If it is a new request we will reset the page number
    if newRequest:
        pass
    
    # Get the spaces in the makes, models, and trims convert to - for the url

    # This all is input preprocessing
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = replaceSpaces(model,make,trim)
    

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius)

    print(initialAddress)

    # session = HTMLSession()

    # response = session.get(initialAddress)

    # response.html.render()

    # soup = BeautifulSoup(response.html.html,'html.parser')

    # if newRequest:


    # info = scrapInfo(soup,False)
    # # At the end we will increment the current record
    # currentRecords += recordsNumber

    # pageNumber += 1

    # return info

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
    
def scrapInfo(html,lastPage):
    allListings = html.find("ul","row mb-3 mt-1").children

    info = []

    for listing in allListings:
      className = listing['class']  
      className = " ".join(className)
      if (className == "mx-1 mt-3 w-full md:hidden"):
          continue
      # We will append to the info array
      info.append(scrapCard(listing))
      
    return []

def scrapCard(card):
    # return {
    #     "imageUrl": scrapImageUrl(card),
    #     "description": scrapDescription(card),
    #     "price": scrapPrice(card),
    #     "mainLink": scrapMainLink(card)
    # }
    print(scrapImageUrl(card))

def scrapImageUrl(card):
    try:
        # We will find the image block like this
        imageBlock = card.find("img",class_="img-inner img-block")['src']
        if (validators.url(imageBlock) == True):
            return imageBlock
        else:
            imageBlock = card.find("img",class_="img-inner img-block")['data-src']
            if(validators.url(imageBlock)==True):
                return imageBlock
            else:
                imageBlock = card.find("img",class_="img-inner img-block")['data-original']
                if(validators.url(imageBlock) == True):
                    return imageBlock
                else:
                    return "Image not found"
    except Exception as e:
        return "Image not found"
    
def scrapDescription(card):
    # FInd the div with w-full truncate name
    pass

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
        return ''
    
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
    
scrapCars(1,make="mercedes-benz",zip=60601,radius=75,recordsNumber=30,newRequest=True)