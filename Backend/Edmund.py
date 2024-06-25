import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import quote

headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
}

def scrapCars(make=None, model=None, yearMin=None, yearMax=None, trim=None, zipCode=None, radius=None):
    global headers

    # Base URL for Edmunds car listings
    base_url = "https://www.edmunds.com/inventory/srp.html"

    # Constructing the query parameters
    params = {
        "make": make.lower() if make else None,
        "model": f"{make.lower()}|{model.lower()}" if make and model else None,
        "year": f"{yearMin}-{yearMax}" if yearMin and yearMax else None,
        "trim": f"{model.lower()}|{quote(trim.lower())}" if model and trim else None,
        "zip": zipCode,
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

    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all car listings
    car_listings = soup.find_all('li', class_='d-flex mb-0_75 mb-md-1_5 col-12 col-md-6')

    cars = []

    # Process each car listing
    for listing in car_listings:
        car = {
            'imageUrl': listing.find('img')['src'] if listing.find('img') else 'N/A',
            'description': listing.find('div', class_='size-16 text-cool-gray-10 font-weight-bold mb-0_5').text.strip() if listing.find('div', class_='size-16 text-cool-gray-10 font-weight-bold mb-0_5') else 'N/A',
            'mileage': listing.find('div', class_='text-gray-darker row').find_all('div', class_='col-12')[0].text.strip() if listing.find('div', class_='text-gray-darker row') else '0 miles',
            'price': listing.find('span', class_='heading-3').text.strip() if listing.find('span', class_='heading-3') else 'N/A',
            'mainLink': "https://www.edmunds.com" + listing.find('a', class_='usurp-inventory-card-vdp-link')['href'] if listing.find('a', class_='usurp-inventory-card-vdp-link') else 'N/A'
        }
        cars.append(car)

    return cars

# Example usage:
def main():
    cars = scrapCars(make="Toyota", model="Camry", yearMin=2010, yearMax=2023, trim="L", zipCode="60601", radius=100)

    # Output the result as JSON
    output_json = json.dumps(cars, indent=4)
    print(output_json)

if __name__ == "__main__":
    main()