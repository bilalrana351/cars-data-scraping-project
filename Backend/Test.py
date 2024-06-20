import Cars
import requests
from Headers import getHeader
from bs4 import BeautifulSoup
# print((Cars.scrapCars(2001,2010,"toyota",zip=60601,radius=50,recordsNumber=10,newRequest=True)))

headers = {
    "authority": "www.cargurus.com",
    "method": "GET",
    "path": "/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action",
    "scheme": "https",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "dnt": "1",
    "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
}

soup = BeautifulSoup(requests.get("https://cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action",headers=headers).text,'html.parser')

print(soup.prettify())