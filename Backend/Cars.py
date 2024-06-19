import time
from bs4 import BeautifulSoup
import requests
import validators
from Headers import getHeader
import Helpers

# At the start we will start from the page 1
pageNumber = 1

# This will be the current number of records scraped
currentRecords = 0

# This will be the number of records in a page this website deploys
# This site gives a maximum of 20 records per page 
recordsInAPage = 20

# This will be the variable that will keep track of whether the results have finished or not
finished = False

# Global variable, keeps the current information, is updated when there is a need for new bits of information
info = []

def scrapCars(yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=-1,recordsNumber=None,newRequest=False):

    # We will use the page number here
    global pageNumber
    global currentRecords
    global finished
    global info


    # If it is a new request we will reset the page number
    if newRequest:
        pageNumber = 1
        currentRecords = 0   
        finished = False

    # This all is input preprocessing

    yearMin,yearMax,zip,radius = interPretFigures(yearMin,yearMax,zip,radius)
    
    model,make,trim = Helpers.replaceSpaces(model,make,trim)

    # If they are already finished this will just return an empty array
    if (finished):
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

        response = requests.get(initialAddress,headers=getHeader())

        soup = BeautifulSoup(response.text,'html.parser')

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

def checkAdditionalListing(html):
    try:
        result = html.find("div","additional-listing-alert")
        if (result == None):
            return False
        else:
            return True
    except:
        return False
    
def interPretFigures(yearMin,yearMax,zip,radius):
    # If the year is not set we will set it to all
    if yearMin == None:
        yearMin = "all"
    if yearMax == None:
        yearMax = "all"

    if zip == None:
        zip = ""   

    # If the radius is -1 we will set it to all
    if radius == -1:
        radius = "all"
    
    return [yearMin,yearMax,zip,radius]

def getInitialAddress(yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=-1):
    global pageNumber
    if model is None and make is not None:
       make = make.lower()
       initialAddress = f"https://www.cars.com/shopping/results/?dealer_id=&include_shippable=true&keyword=&list_price_max=&list_price_min=&makes[]={make}&maximum_distance={radius}&mileage_max=&monthly_payment=&page_size=20&page={pageNumber}&sort=best_match_desc&stock_type=all&year_max={yearMax}&year_min={yearMin}&zip={zip}"
    elif make is None and model is None:
        initialAddress = f"https://www.cars.com/shopping/results/?dealer_id=&include_shippable=true&keyword=&list_price_max=&list_price_min=&makes[]={make}&maximum_distance={radius}&mileage_max=&monthly_payment=&page_size=20&page={pageNumber}&sort=best_match_desc&stock_type=all&year_max={yearMax}&year_min={yearMin}&zip={zip}"
    elif make is not None and model is not None and trim is None:
        model = model.lower()
        make = make.lower()
        initialAddress = f"https://www.cars.com/shopping/results/?dealer_id=&include_shippable=true&keyword=&list_price_max=&list_price_min=&makes[]={make}&maximum_distance={radius}&mileage_max=&models[]={make + '-' + model}&monthly_payment=&page_size=20&page={pageNumber}&sort=best_match_desc&stock_type=all&year_max={yearMax}&year_min={yearMin}&zip={zip}"
    else:
        model = model.lower()
        make = make.lower()
        trim = trim.lower()
        initialAddress = f"https://www.cars.com/shopping/results/?dealer_id=&include_shippable=true&keyword=&list_price_max=&list_price_min=&makes[]={make}&maximum_distance={radius}&mileage_max=&models[]={make + '-' + model}&monthly_payment=&page_size=20&page={pageNumber}&sort=best_match_desc&stock_type=all&trims[]={make+'-'+model+'-'+trim}&year_max={yearMax}&year_min={yearMin}&zip={zip}"
    return initialAddress

def scrapInfo(html,last):
    recordInfo = []
    vehicleCards = html.find_all('div', class_='vehicle-card ep-theme-hubcap')
    if (last == True):
        vehicleCards = vehicleCards[0:getNoRecordsInLastListing(html)]
    for vehicleCard in vehicleCards:
        recordInfo.append(scrapCard(vehicleCard))
    return recordInfo

def getNoRecordsInLastListing(html):
    vehicleCardDiv = html.find("div",class_="vehicle-cards")

    records = 0

    for containedDiv in vehicleCardDiv:
        try:
            className = containedDiv['class']
            className = ' '.join(className)
            if (className == None):
                pass
            elif (className == "additional-listing-alert"):
                return records
            elif (className == "vehicle-card ep-theme-hubcap"):
                records += 1
            else:
                pass
        except:
            pass
    
    return records

def scrapCard(card):
    imageUrl = findImage(card)
    description = findDetails(card)
    mileage = findMileage(card)
    price = findPrice(card)
    mainLink = "https://cars.com" + findMainLink(card)
    return {"imageUrl":imageUrl,"description":description,"mileage":mileage,"price":price,"mainLink":mainLink}

def findImage(card):
    # Find all the instances of the vehicle Images
    vehicleImages = card.find_all('img', class_='vehicle-image')
    link = None
    for vehicleImage in vehicleImages:
        supposedLink = vehicleImage['src']

        if "data:image" in supposedLink:
            supposedLink = vehicleImage['data-src']
        # Check if the supposed link is a valid url
        try:
            if (validators.url(supposedLink)):
                link = supposedLink
                break
        except Exception as e:
            # TODO : Remove this
            print(e)
    
    # If link is still none we will loop through the vehicle images again with data-src
    if link is None:
        for vehicleImage in vehicleImages:
            supposedLink = vehicleImage['data-src']
            try:
                if "data:image" in supposedLink:
                    supposedLink = vehicleImage['src']
                if (validators.url(supposedLink)):
                    link = supposedLink
                    break
            except Exception as e:
                pass
    if link == None:
        return ("Link not Found")
    return link

def findDetails(card):
    # Go to the div named vehicle detail
    vehicleDetail = card.find('div',class_='vehicle-details')

    try:
        # To get the description
        return vehicleDetail.find('h2',class_='title').text
    except:
        return "Details not Found"


def findMileage(card):
    try:
        return (card.find('div', class_='mileage').text)
    except:
        return 0

def findPrice(card):
    try:
        # Find the price of the vehicle
        return (card.find('span', class_='primary-price').text)
    except:
        return ("Price Not Found")

def findMainLink(card):
    try:
        # Find the main link of the vehicle
        return (card.find('a', class_='image-gallery-link vehicle-card-visited-tracking-link')['href'])
    except:
        return ("Main Link not found")
    
if __name__ == "__main__":
    print("This file is not meant to be run directly")