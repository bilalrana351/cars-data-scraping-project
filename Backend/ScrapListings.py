from bs4 import BeautifulSoup
import undetected_chromedriver as uc
import json

dataList = None

driver = uc.Chrome(version_main = 120)

with open("makesValuesCarGuru.txt","r") as f:
    dataList = json.loads(f.read())

totalData = {}

for value in dataList:
    driver.get(f"https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?zip=60601&inventorySearchWidgetType=AUTO&sortDir=ASC&sourceContext=untrackedExternal_false_0&distance=50&sortType=BEST_MATCH&entitySelectingHelper.selectedEntity={dataList[value]}")

    driver.implicitly_wait(20)

    soup = BeautifulSoup(driver.page_source,"html.parser")

    optionsDiv = soup.find("select",{"name":"selectedModelId"})

    options = optionsDiv.find_all("optgroup")

    for option in options:
        values = option.find_all("option")
        for value in values:
            totalData[value.text] = value["value"]

with open("modelsValuesCarGuru.txt","w") as f:
    f.write(json.dumps(totalData))


driver.quit()