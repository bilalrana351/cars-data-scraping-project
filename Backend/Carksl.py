from bs4 import BeautifulSoup
import json
import requests

maxPages = 3

makeGlob = None

def scrapCars(pageNumber, yearMin=None, yearMax=None, make=None, model=None, trim=None, zip=None, radius=None, newRequest=False):
    global maxPages
    global makeGlob

    makeGlob = make

    if pageNumber > maxPages:
        return []
    
    base_url = makeBaseUrl(make,model,trim,yearMin,yearMax,zip,radius,pageNumber)
    
    data = getJsonData(base_url, pageNumber, make, model, yearMin, yearMax, trim, zip, radius)

    info = scrapInfo(data)

    # Find the total number of pages
    if newRequest:
        maxPages = findMaxPages(data)

    return info

def findMaxPages(data):
    try:
        return int(data["data"]["count"]) // 24 + 1
    except:
        return 0

def makeBaseUrl(make, model, trim, yearMin, yearMax, zip, radius, pageNumber):
    if make is not None:
        make = make.replace(' ', '+')
    if model is not None:
        model = model.replace(' ', '+')
    if trim is not None:
        trim = trim.replace(' ', '+')

    if zip is None:
        zip = None

    if radius is None or radius < 0:
        radius = 2000

    base_url = "https://cars.ksl.com/search"

    if make is not None:
        base_url += f"/make/{make}"

    if model is not None:
        base_url += f"/model/{model}"

    base_url += f"/perPage/24/page/{pageNumber}"

    if trim is not None:
        base_url += f"/trim/{trim}"
    if yearMin is not None:
        base_url += f"/yearFrom/{yearMin}"
    if yearMax is not None:
        base_url += f"/yearTo/{yearMax}"
    if zip is not None:
        base_url += f"/zip/{zip}"
    if radius is not None:
        base_url += f"/miles/{radius}"

    print(base_url)
    
    return base_url

def getJsonData(initialUrl, pageNumber, make, model, yearFrom, yearTo, trim=None, zip=None, radius=None):
    headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'origin': 'https://cars.ksl.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': initialUrl,#'https://cars.ksl.com/search/make/Honda/model/Accord/yearFrom/2012/yearTo/2023/zip/60601/miles/2000'
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
        'x-ddm-event-accept-language': 'en-US',
        'x-ddm-event-ip-address': 'undefined',
        'x-ddm-event-user-agent': '[object Object]',
    }

    params = ''

    body = constructBody(make, model, yearFrom, yearTo, trim, zip, radius, pageNumber)


    json_data = {
        'endpoint': '/classifieds/cars/search/searchByUrlParams',
        'options': {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'User-Agent': 'cars-node',
                'X-App-Source': 'frontline',
                'X-DDM-EVENT-USER-AGENT': {
                    'ua': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
                    'browser': {
                        'name': 'Chrome',
                        'version': '126.0.0.0',
                        'major': '126',
                    },
                    'engine': {
                        'name': 'Blink',
                        'version': '126.0.0.0',
                    },
                    'os': {
                        'name': 'Android',
                        'version': '6.0',
                    },
                    'device': {
                        'vendor': 'LG',
                        'model': 'Nexus 5',
                        'type': 'mobile',
                    },
                    'cpu': {},
                },
                'X-DDM-EVENT-ACCEPT-LANGUAGE': 'en-US',
                'X-MEMBER-ID': None,
                'cookie': '',
            },
            'body': body
        },
    }

    response = requests.post('https://cars.ksl.com/nextjs-api/proxy', params=params, headers=headers, json=json_data)

    try:
        return response.json()
    except Exception as e:
        return []
    
def constructBody(make, model, yearFrom, yearTo, trim, zip, radius, pageNumber):
    body = []
    body.append('perPage')
    body.append('24')
    if pageNumber is not None:
        body.append('page')
        body.append(str(pageNumber))
    if make is not None:
        body.append('make')
        body.append(make)
    if model is not None:
        body.append('model')
        body.append(model)
    if trim is not None:
        body.append('trim')
        body.append(trim)
    if yearFrom is not None:
        body.append('yearFrom')
        body.append(yearFrom)
    if yearTo is not None:
        body.append('yearTo')
        body.append(yearTo)
    if zip is not None:
        body.append('zip')
        body.append(zip)
    if radius is not None:
        body.append('miles')
        body.append(radius)
    else:
        body.append('miles')
        body.append(2000)

    return body

def scrapInfo(data):
    global makeGlob

    info = []
    items = data["data"]["items"]
    for item in items:
        try:
            item['trim']
        except:
            item['trim'] = ""
        try:
            description = str(item['makeYear']) + ' ' + item['make'] + ' ' + item['model'] + ' ' + item['trim']
        except:
            description = "description not found"
        try:
            imageUrl = item['photo'][0]["id"]
        except:
            try:
                imageUrl = json.loads(item['photo'][0])['id']
            except:
                imageUrl = "image not found"
        try:
            price = item['price']
        except:
            price = "price not found"
        try:
            mileage = item['mileage']
        except:
            mileage = "mileage not found"
        try:
            listing = "https://cars.ksl.com/listing/" + str(item['id'])
        except:
            listing = "listing not found"
        try:
            trim = item['trim']
        except Exception as e:
            print(e)
            trim = ""
        if makeGlob.lower() not in description.lower():
            continue
        
        info.append({
            'description': description,
            'imageUrl': imageUrl,
            'price': price,
            'mileage': mileage,
            'mainUrl': listing,
            "trim": trim
        })
        
    return info

def main():
    # Example usage:
    print(scrapCars(pageNumber=1,make="Mercedes-Benz",newRequest=True))

if __name__ == "__main__": 
    main()
    