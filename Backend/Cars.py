import time
from bs4 import BeautifulSoup
import requests
import validators
from Headers import getHeader
import Helpers
from playwright.sync_api import sync_playwright

totalRecords = 0
totalPages = 1
perPageRecords = 20


def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=-1,newRequest=False):
    global totalRecords
    global totalPages
    global perPageRecords
    global totalRecords
    global totalPages

    # If it is a new request we will reset the page number
    if newRequest:
        pageNumber = 1
    
    if (pageNumber > totalPages):
        return []

    # This all is input preprocessing

    yearMin,yearMax,zip,radius = interPretFigures(yearMin,yearMax,zip,radius)
    
    model,make,trim = Helpers.replaceSpaces(model,make,trim)

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,trim,zip,radius)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_extra_http_headers({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'})
        page.set_default_timeout(400000)
        page.goto(initialAddress,wait_until="domcontentloaded")
        content = page.content()
        soup = BeautifulSoup(content,'html.parser')
        browser.close()

    if newRequest:
        totalRecords = findTotalRecords(soup,model,make,trim)
        if (totalRecords == 0):
            return []
        totalPages = totalRecords // perPageRecords
        totalPages += 1

    finished = checkAdditionalListing(soup)

    if (finished):
        info = scrapInfo(soup,True)
        return info,totalPages

    info = scrapInfo(soup,False)

    return info,totalPages

def findTotalRecords(html,model,make,trim):
    if (trim != None):
        return findByTrim(html,model,make,trim)
    elif (model != None):
        return findByModel(html,make,model)
    elif (make != None):
        return findByMake(html)

def findByTrim(html,model,make,trim):
    try:
        div = html.find("div",id="trim")
        input_ = div.find("input",value=f"{make.replace(' ','-').lower()}-{model.replace(' ','-').lower()}-{trim.replace(' ','_').lower()}")
        parentDiv = input_.parent
        return extractValue(parentDiv.find("span",class_="filter-count").text)
    except:
        return 0

def findByModel(html,make,model):
    try:
        div = html.find("div",id="model")
        input_ = div.find("input",value=f"{make.replace(' ','_').lower()}-{model.replace(' ','_').lower()}")
        parentDiv = input_.parent
        return extractValue(parentDiv.find("span",class_="filter-count").text)
    except:
        return 0

def findByMake(html):
    div = html.find("div",id="model")
    group = div.find_all("div",class_="sds-checkbox")
    totalRecords = 0
    for child in group:
        try:
            totalRecords += extractValue(child.find("span",class_="filter-count").text)
        except Exception as e:
            pass
    return totalRecords

def extractValue(string):
    # String is of the form (10,000)
    string = string.strip("()")
    string = string.replace(",","")
    return int(string)  

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
    if radius == -1 or radius == None:
        radius = "all"
    
    return [yearMin,yearMax,zip,radius]

def getInitialAddress(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=-1):
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
    global totalRecords
    global totalPages
    global perPageRecords
    return totalRecords - ((totalPages - 1) * perPageRecords)

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
        # Check if the supposed link is a valid url
        try:
            if (validators.url(supposedLink)):
                link = supposedLink
                break
        except Exception as e:
            pass       
    # If link is still none we will loop through the vehicle images again with data-src
    if link is None:
        for vehicleImage in vehicleImages:
            supposedLink = vehicleImage['data-src']
            try:
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
    print(scrapCars(1,2010,2020,"Honda",newRequest=True))
    raise Exception("This file is not meant to be run directly")