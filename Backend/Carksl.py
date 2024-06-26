from bs4 import BeautifulSoup
import json
from playwright.sync_api import sync_playwright

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

maxPages = 3

def scrapCars(pageNumber, yearMin=None, yearMax=None, make=None, model=None, trim=None, zip=None, radius=None, newRequest=False):
    global headers
    global maxPages

    if pageNumber > maxPages:
        return []
    
    base_url = makeBaseUrl(make,model,trim,yearMin,yearMax,zip,radius,pageNumber)

    print(base_url)

    # Use Playwright to scrape the page
    response = None
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Use headless=True to run without GUI
        page = browser.new_page()
        page.set_extra_http_headers(headers)
        page.goto(base_url, timeout=30000000, wait_until="load")
        response = page.content()
        browser.close()

    soup = BeautifulSoup(response, 'html.parser')

    with open("test.html", "w") as f:
        f.write(str(soup))

    # Find the total number of pages
    if newRequest:
        try:
            # Extract the correct meta tag content attribute containing the total number of listings
            meta_description = soup.find_all('meta', attrs={'name': 'description'})
            if meta_description:
                for meta in meta_description:
                    if 'new and used' in meta['content'] and 'for sale' in meta['content']:
                        listings_info = meta['content']
                        total_listings = int(listings_info.split(' ')[0].replace(',', ''))
                        break
            else:
                raise ValueError("No valid meta description found.")
            
            listings_per_page = 24
            maxPages = (total_listings + listings_per_page - 1) // listings_per_page
        except Exception as e:
            print(f"Error finding total pages: {e}")

    # Find all car listings
    car_listings = soup.find_all('div', class_='Listing__ListingWrapper-sc-a69vd9-0')

    cars = []

    # Process each car listing
    for listing in car_listings:
        # Extract image URL
        image_wrapper = listing.find('div', class_='Listing__ListingImageWrapper-sc-1v5k5vh-2')
        image_url = 'N/A'
        if image_wrapper:
            image_style = image_wrapper.find('a').get('style', '')
            image_url = image_style.split('url("')[1].split('")')[0] if 'url("' in image_style else 'N/A'

        car = {
            'imageUrl': image_url,
            'description': listing.find('a', class_='listing-title').text.strip() if listing.find('a', class_='listing-title') else 'N/A',
            'price': listing.find('p', class_='Typography__variantProp-sc-5cwz35-0 eaOVFJ').text.strip() if listing.find('p', class_='Typography__variantProp-sc-5cwz35-0 eaOVFJ') else 'N/A',
            'mileage': listing.find('p', class_='Typography__variantProp-sc-5cwz35-0 kMOSqH').text.strip() if listing.find('p', class_='Typography__variantProp-sc-5cwz35-0 kMOSqH') else 'N/A',
            'mainLink': listing.find('a', class_='listing-title').get('href', 'N/A') if listing.find('a', class_='listing-title').get('href', 'N/A') != 'N/A' else 'N/A'
        }
        cars.append(car)

    return cars

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
        radius = None

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
    
    return base_url

def main():
    # Example usage:
    print(scrapCars(pageNumber=1,make="Mercedes-Benz",newRequest=True))
    print(scrapCars(2,make="Toyota",newRequest=False))

if __name__ == "__main__":
    main()
