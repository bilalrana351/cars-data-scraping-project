import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import quote

headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
}

maxPages = 1

makeGlob = None

def scrapCars(pageNumber, yearMin=None, yearMax=None, make=None, model=None, trim=None, zip=None, radius=None, newRequest=False):
    global headers
    global maxPages
    global makeGlob

    makeGlob = make

    if pageNumber > maxPages:
        return []

    # Base URL for Edmunds car listings
    base_url = "https://www.edmunds.com/inventory/srp.html?"

    # Constructing the query parameters
    params = {
        "make": make.lower() if make else None,
        "model": f"{make.lower()}|{model.lower()}" if make and model else None,
        "year": f"{yearMin}-{yearMax}" if yearMin and yearMax else None,
        "trim": f"{model.lower()}|{quote(trim.lower())}" if model and trim else None,
        "pagenumber": pageNumber if pageNumber else None,
        "zip": zip if zip else None,
        "radius": radius
    }

    # Remove None or empty parameters
    params = {k: v for k, v in params.items() if v is not None}

    # Send GET request to Edmunds with the constructed URL and headers
    try:
        response = requests.get(base_url, headers=headers, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
    except requests.exceptions.RequestException as e:
        print(f"Error during request: {e}")
        return []

    print(response.url)
    soup = BeautifulSoup(response.content, 'html.parser')

    with open("test.html", "w") as f:
        f.write(str(soup))

    # Find the total number of pages
    if newRequest:
        try:
            listings_info = soup.find('div', class_='mt-1 small').find('span', class_='text-nowrap text-cool-gray-40').text
            total_listings = int(listings_info.split('out of')[-1].strip().split()[0].replace(',', ''))
            listings_per_page = int(listings_info.split('out of')[0].split('-')[-1].strip().replace(',', ''))
            maxPages = (total_listings + listings_per_page - 1) // listings_per_page
        except Exception as e:
            print(f"Error finding total pages: {e}")

    # Find all car listings
    car_listings = soup.find_all('li', class_='d-flex mb-0_75 mb-md-1_5 col-12 col-md-6')

    cars = []

    # Process each car listing
    for listing in car_listings:
        car = {
            'imageUrl': listing.find('img')['src'] if listing.find('img') else 'N/A',
            'description': listing.find('div', class_='size-16 text-cool-gray-10 font-weight-bold mb-0_5').text.strip() if listing.find('div', class_='size-16 text-cool-gray-10 font-weight-bold mb-0_5') else 'N/A',
            'mileage': listing.find('div', class_='text-gray-darker row').find('span', class_='text-cool-gray-30').text.strip().split()[0] + " miles" if listing.find('div', class_='text-gray-darker row') else '0 miles',
            'price': listing.find('span', class_='heading-3').text.strip() if listing.find('span', class_='heading-3') else 'N/A',
            'mainUrl': "https://www.edmunds.com" + listing.find('a', class_='usurp-inventory-card-vdp-link')['href'] if listing.find('a', class_='usurp-inventory-card-vdp-link') else 'N/A',
            'trim': scrapTrim(listing)
        }
        if makeGlob.lower() not in car['description'].lower():
            continue
        cars.append(car)

    with open("edmund.json", "w") as f:
        f.write(json.dumps(cars, indent=4))

    return cars

def scrapTrim(listing):
    try:
        description = listing.find("div",class_ = "font-weight-normal size-14 text-cool-gray-30").text.strip()
    except Exception as e:
        print(e)
        description = ""
    return description # However this is not always the case

# Example usage:
def main():
    cars1 = scrapCars(1, yearMin=2010, yearMax=2023, make="Toyota", model="Camry", zip="60601", newRequest=True)
    # cars2 = scrapCars(2, yearMin=2010, yearMax=2023, make="Toyota", model="Camry", zip="60601", newRequest=False)

    # Output the result as JSON
    output_json = json.dumps(cars1, indent=4)
    print(output_json)

if __name__ == "__main__":
    main()