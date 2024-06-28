from Carmax import scrapCars


result,count = scrapCars(pageNumber=1,newRequest=True,make="Honda")

print("count",count)

print("data",result)