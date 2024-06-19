import Cars
import requests
from Headers import getHeader
# print(len(Cars.scrapCars(2001,2010,"toyota","corolla",zip=60601,radius=50,recordsNumber=10,newRequest=True)))

# print(len(Cars.scrapCars(2001,2010,"toyota","corolla",zip=60601,radius=50,recordsNumber=10,newRequest=False)))

# print(len(Cars.scrapCars(2001,2010,"toyota","corolla",zip=60601,radius=50,recordsNumber=10,newRequest=False)))

# print(len(Cars.scrapCars(2001,2010,"toyota","corolla",zip=60601,radius=50,recordsNumber=10,newRequest=False)))

# print(len(Cars.scrapCars(2001,2010,"toyota","corolla",zip=60601,radius=50,recordsNumber=10,newRequest=False)))


print(requests.get("https://www.truecar.com/used-cars-for-sale/listings/toyota/corolla/?location=60601&searchRadius=50&year_min=2001&year_max=2010&trim=corolla&sort[]=best_match").text)