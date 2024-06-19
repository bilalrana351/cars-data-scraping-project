# Here we will need the zipcodes library to get the city and state from a zip code.
import zipcodes
import requests
from Headers import getHeader
from bs4 import BeautifulSoup
import Helpers
import validators

# At the start we will start from the page 1
pageNumber = 1

# These will be the current number of records scraped
currentRecords = 0

# The records per page are 30 here
recordsInAPage = 30

finished = False

info = []

# This site gives a maximum of 30 records per page
def scrapCars(yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,recordsNumber=None,newRequest=False):
    global pageNumber
    global currentRecords
    global recordsInAPage
    global finished

    # If it is a new request we will reset the page number
    if newRequest:
        pageNumber = 1
        currentRecords = 0
        finished = False
    
    # Get the spaces in the makes, models, and trims convert to - for the url

    # This all is input preprocessing
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = Helpers.replaceSpaces(model,make,trim)

    # If they are already finished this will just return an empty array
    if finished:
        try:
            info = info[recordsNumber:]
            return info[0:recordsNumber]
        except:
            try:
                infoFinal = info.copy()
                info = [] # Empty the information
                return infoFinal
            except:
                return []
    
    # This will detect whether the current number of records have been replenished, i.e is there new records needed
    needNewRecords = Helpers.areNewRecordsNeeded(currentRecords,recordsInAPage)

    if(needNewRecords):
        initialAddress = getInitialAddress(yearMin,yearMax,make,model,trim,zip,radius)

        print(initialAddress)

        response = requests.get(initialAddress)

        soup = BeautifulSoup(response.text,'html.parser')

        with open("output.txt","w") as f:
            f.write(soup.prettify())

        finished = checkAdditionalListing(soup)

        if (finished):
            info = scrapInfo(soup,True)
            return info[0:recordsNumber]

        info = scrapInfo(soup,False)
        # At the end we will increment the current record
        currentRecords += recordsNumber

        pageNumber += 1

        return info[0:recordsNumber]
    else:
        info = info[recordsNumber:]
        currentRecords += recordsNumber
        return info[0:recordsNumber]
    
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
            imageBlock = card.find("img",class_="img-inner img-block")['data-original']
            if(validators.url(imageBlock)==True):
                return imageBlock
            else:
                imageBlock = card.find("img",class_="img-inner img-block")['data-original']
                if(validators.url(imageBlock) == True):
                    return imageBlock
                else:
                    return "Image not found"
    except Exception as e:
        print(e)
        return "Image not found"

def getInitialAddress(yearMin,yearMax,make,model,trim,zip,radius):
    global pageNumber
    # This is the base address
    address = "https://www.truecar.com/used-cars-for-sale/listings/"
    
    # This is the address for the make
    if make != None:
        address += make + "/"
    
    # This is the address for the model
    if model != None:
        address += model + "/"
    
    # This is the address for the trim
    if trim != None:
        address += trim + "/"
    
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

def checkAdditionalListing(html):
    allListings = html.find("ul","row mb-3 mt-1").children

    totalListings = 0

    for listing in allListings:
        totalListings += 1
    
    if (totalListings - 1 == 30):
        print("Were 30")
        return False
    else:
        print("Were not 30")
        print(totalListings)
        return True
        
    
scrapCars(2024,2024,"Honda","Civic","ex-l",60601,-1,30,True)