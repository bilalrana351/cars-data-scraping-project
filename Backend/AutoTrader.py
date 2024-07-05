import requests
from bs4 import BeautifulSoup
from Headers import getHeader
import zipcodes
import json
from playwright.sync_api import sync_playwright
import time

header = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests":"1"
}

# Per page 16 cars are shown
perPageResults = 25

searchRadius = 0 # For Nationwide search

maxPages = 1

makeGlob = None


def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global maxPages
    global makeGlob

    makeGlob = make

    if pageNumber > maxPages:
        return []

    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    newSearch,previousShown = interPretPageNumber(pageNumber)

    model,make,trim = punctuate(model,make,trim)

    zip,zipNo = interPretZip(zip)

    initialAddress = getInitialAddress(yearMin,yearMax,make,model,trim,zip,zipNo,radius,newSearch,previousShown)

    response = requests.get(initialAddress,headers=header)

    content = response.text

    soup = BeautifulSoup(content,'html.parser')

    if newRequest:
        maxPages = calculateMaxPages(soup)
    
    info = scrapInfo(soup)

    return info

def scrapInfo(html):
    info = []

    info = info + scrapFromListingCollection(html)

    info = info + scrapFromListings(html)

    return info

def scrapFromListingCollection(html):
    info = []
    appData = html.find("script",{"data-cmp":"listingsCollectionSchema","type":"application/ld+json"})
    appData = json.loads(appData.text)

    appData = appData['about']['offers']['itemOffered']

    for data in appData:
        try:
            info.append(extractInformation(data))
        except Exception as e:
            pass

    return info

def scrapFromListings(html):
    info = []
    allListings = html.find_all("script",{"data-cmp":"lstgSchema","type":"application/ld+json"})
    for listing in allListings:
        try:
            data = json.loads(listing.text)
            obtainedInfo = extractInformation(data)
            if obtainedInfo is not None:
                info.append(obtainedInfo)
        except:
            pass
    return info

def parseTrim(description,data):
    name = data['brand']['name']
    model = data['model']
    year = data['vehicleModelDate']
    if name.lower() in description.lower():
        description = description.replace(name,"")
    if model.lower() in description.lower():
        description = description.replace(model,"")
    if str(year) in description:
        description = description.replace(str(year),"")
    if "used" in description.lower():
        description = description.replace("Used","")
        description = description.replace("used","")
    if "new" in description.lower():
        description = description.replace("New","")
        description = description.replace("new","")
    if "certified" in description.lower():
        description = description.replace("Certified","")
        description = description.replace("certified","")
    if "pre-owned" in description.lower():
        description = description.replace("Pre-owned","")
        description = description.replace("pre-owned","")
    if "preowned" in description.lower():
        description = description.replace("Preowned","")
        description = description.replace("preowned","")
    if "pre owned" in description.lower():
        description = description.replace("Pre owned","")
        description = description.replace("pre owned","")
    if "w/" in description.lower():
        description = description.replace("w/","")
    if "with" in description.lower():
        description = description.replace("with","")
    if "W/" in description:
        description = description.replace("W/","")
    description = description.strip()
    return description

def extractTrim(description,data):
    # I have the format like Used 2019 Honda Accord Sport 1.5T
    # I need to extract the trim from this
    try:
        description = parseTrim(description,data)
    except Exception as e:
        return ""
    return description

    

def extractInformation(data):
    totalList = {}
    global makeGlob
    try:
        totalList['description'] = data['name']
    except:
        totalList['description'] = 'Description not found'
    try:
        totalList['trim'] = extractTrim(totalList['description'],data)
    except:
        totalList['trim'] = ""
    try:
        totalList['price'] = data['offers']['price']
    except:
        totalList['price'] = 'Price not found'
    try:
        totalList['mileage'] = data['mileageFromOdometer']['value'].replace(",","").replace("'","")
    except:
        totalList['mileage'] = 'Mileage not found'
    try:
        totalList['imageUrl'] = data['image']
    except:
        totalList["imageUrl"] = "Url not found"
    try:
        totalList['mainUrl'] = data['url']
    except:
        totalList['mainUrl'] = "Link not found"
    if makeGlob.lower() not in totalList['description'].lower():
        return None
    return totalList


def calculateMaxPages(html):
    maxReordDiv = html.find("div",class_ = "padding-bottom-4 text-bold text-size-400 text-size-sm-500")

    maxRecords = int(maxReordDiv.text.split(" ")[0].replace(",",""))

    maxPages = maxRecords // perPageResults + 1

    return maxPages

def interPretFigures(radius,zip,yearMin,yearMax):
    if radius == -1 or zip == None:
        radius = 0
    return radius,zip,yearMin,yearMax

def interPretPageNumber(pageNumber):
    newSearch = False
    previousShown = (pageNumber - 1) * perPageResults
    if pageNumber == 1:
        newSearch = True
    return newSearch,previousShown

def punctuate(model,make,trim):
    # Ensure that the model, make, and trim are punctuated, ie the first letters are capitalized
    if model is not None:
        model = model.lower()
        model = model.replace(" ","-")
    if make is not None:
        make = make.lower()
        make = make.replace(" ","-")
    if trim is not None:
        trim = trim.lower()
        trim = trim.replace(" ","-")
    return model,make,trim

def interPretZip(zip):
    if zip == None:
        zip = "60601"
    if zip == -1:
        return "60601"
    zipNo = str(zip)
    data = zipcodes.matching(str(zip))
    city = data[0]['city'].lower()
    city = city.replace(" ","-")
    state = data[0]['state'].lower()
    state = state.replace(" ","-")
    zip = city + "-" + state
    return zip,zipNo

def getInitialAddress(yearMin,yearMax,make,model,trim,zip,zipNo,radius,newSearch,previousShown):
    "https://www.autotrader.com/cars-for-sale/chevrolet/corvette/z06/chicago-il?endYear=2013&firstRecord=75&newSearch=false&searchRadius=0&startYear=2002&zip=60601"
    url = "https://www.autotrader.com/cars-for-sale/"
    if make != None:
        url += make + "/"
    if model != None:
        url += model + "/"
    if trim != None:
        url += trim + "/"
    if zip != None:
        url += zip + "?"
    if yearMax != None:
        url += "endYear=" + str(yearMax) + "&"
    if previousShown != 0:
        url += "firstRecord=" + str(previousShown) + "&"
    if newSearch == False:
        url += "newSearch=false&"
    if radius != None:
        url += "searchRadius=" + str(radius) + "&"
    if yearMin != None:
        url += "startYear=" + str(yearMin) + "&"
    if zipNo != None:
        url += "zip=" + str(zipNo)
    else:
        url += "zip=" + "60601"
    return url

if __name__ == "__main__":    
    raise Exception("This file is not meant to be run directly")