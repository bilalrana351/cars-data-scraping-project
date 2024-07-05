import requests

from bs4 import BeautifulSoup

import time

import json

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'origin': 'https://www.carbravo.com',
    'referer': 'https://www.carbravo.com/shopping/inventory/search?comparedVins=&make=honda&radius=2000&sort=RELEVANCE%2CASC&year=2010%2C2020&zipCode=60601',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
}

nextToken = ""

json_data = {
    'filters': {
        'finance': {
            'downPayment': 2000,
        },
        'geo': {
            'zipCode': '60601',
            'radius': 358,
        },
        'searchText': '',
    },
    'sorts': {
        'sortBy': 'RELEVANCE',
        'sortOrder': 'ASC',
    },
    'pagination': {
        'size': 20,
        'nextPageToken': '',
    }
}

maxPages = 1

# These will be the next page ids that we will use to get the next page
nextPageTokens = {}

makeGlob = None

def scrapCars(pageNumber,yearMin=None,yearMax=None,make=None,model=None,trim=None,zip=None,radius=None,newRequest=False):
    global maxPages
    global json_data
    global headers
    global nextToken
    global nextPageTokens
    global makeGlob

    makeGlob = make

    if pageNumber > maxPages:
        return []
    
    radius,zip,yearMin,yearMax = interPretFigures(radius,zip,yearMin,yearMax)

    model,make,trim = punctuate(model,make,trim)

    initialAddress = getInitialAddress(pageNumber,yearMin,yearMax,make,model,zip,radius,trim)

    fillUpJsonData(yearMin,yearMax,make,model,trim,zip,radius,pageNumber,initialAddress)

    # If page does not exist, we will give it the next page token
    if int(pageNumber) not in nextPageTokens:
        nextPageTokens[pageNumber] = nextToken
    
    json_data['pagination']['nextPageToken'] = nextPageTokens[int(pageNumber)]

    print(initialAddress)

    # Have to add some logic for the next page id

    content = requests.post('https://www.carbravo.com/crb/drp-cp-api/p/v2/vehicles/search',
        headers=headers,
        json=json_data
    )

    content = json.loads(content.text)

    if newRequest:
        maxPages = findTotalRecords(content)

    try:
        info = scrapInfo(content)
    except Exception as e:
        print(e)
        info = []

    nextToken = getNextPageToken(content)

    return info

def fillUpJsonData(yearMin,yearMax,make,model,trim,zip,radius,pageNumber,address):
    global headers
    global json_data

    headers["referer"] = address

    json_data['filters']['geo']['zipCode'] = str(zip)

    json_data['filters']['geo']['radius'] = radius

    if (make is not None):
        json_data['filters']["make"] = {"values": [str(make)]}
    
    if (yearMin is not None and yearMax is not None):
        json_data['filters']["year"] = {"min": int(yearMin), "max": int(yearMax)}

    if (model is not None):
        json_data['filters']["model"] = {"values": [str(model)]}
        json_data['filters']["makeModel"] = {str(make): [str(model)]}
    

def getNextPageToken(content):
    try:
        return content['data']['discoveryPaginationDto']['nextPageToken']
    except:
        return ""

def scrapInfo(content):
    info = []
    global makeGlob

    if content['data']['hits'] == None:
        return info
    for data in content['data']['hits']:
        try:
            imageUrl = data["tileImage"]
        except:
            imageUrl = "Image not available"
        try:
            mileage = data["mileage"]
        except:
            mileage = "Mileage not available"
        try:
            description = data["model"] + " " + data["make"] + " " + data["trim"] + " " + data["year"]
        except:
            description = "Description not available"
        try:
            price = data["pricing"]["cash"]["optionDetails"]["estimatedAmount"]["amount"]
        except:
            price = "Price not available"
        try:
            mainLink = "https://www.carbravo.com/shopping/inventory/vehicle?vinSlug=" + data["vin"]
        except:
            mainLink = "Link not available"
        try:
            trim = data["trim"]
        except Exception as e:
            print(e)
            trim = ""
        if makeGlob.lower() not in description.lower():
            continue
        info.append({
            "description": description, 
            "price": price, 
            "mileage": mileage, 
            "imageUrl": imageUrl, 
            "mainUrl": mainLink,
            "trim": trim})
    return info

def findTotalRecords(content):
    try:
        return int(content['data']['count'] // 20 + 1)
    except Exception as e:
        return 0

def interPretFigures(radius,zip,yearMin,yearMax):
    if radius == -1 or zip == None or radius == None:
        radius = 2000
    if zip == None:
        zip = 60601
    if yearMin == None:
        yearMin = 1930
    if yearMax == None:
        yearMax = time.localtime().tm_year
    return [radius,zip,yearMin,yearMax]

def punctuate(model,make,trim):
    # Ensure that the model, make, and trim are punctuated, ie the first letters are capitalized
    if model is not None:
        # model = model.lower()
        model = model.replace(" ","%20")
    if make is not None:
        # make = make.lower()
        make = make.replace(" ","%20")
    if trim is not None:
        trim = trim.replace(" ","%20")
    return model,make,trim

def getInitialAddress(pageNumber,yearMin,yearMax,make,model,zip,radius,trim):
    "https://www.carbravo.com/shopping/inventory/search?comparedVins=&make=Mercedes-Benz&model=GLB%20250&radius=2000&sort=RELEVANCE%2CASC&year=2021%2C2023&zipCode=60601"

    url = "https://www.carbravo.com/shopping/inventory/search?comparedVins="

    if make is not None:
        url += f"&make={make}"
    
    if model is not None:
        url += f"&model={model}"
    
    if radius is not None:
        url += f"&radius={radius}"
    
    url += "&sort=RELEVANCE%2CASC"

    if yearMin is not None:
        url += f"&year={yearMin}"
    
    if yearMax is not None:
        url += f"%2C{yearMax}"

    if zip is not None:
        url += f"&zipCode={zip}"

    return url

if __name__ == "__main__":
    raise Exception("File not meant to be run directly")