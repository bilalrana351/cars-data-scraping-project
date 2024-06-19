def replaceSpaces(model,make,trim):
    # In all the makes models and trims we will replace space with -
    if model == None: # In case of None we will let None be None
        pass
    else: 
        model = model.replace(" ","_").lower()
        model = model.replace("-","_").lower()
    if make == None:
        pass
    else:
        make = make.replace(" ","_").lower()
        make = make.replace("-","_").lower()
    if trim == None:
        pass
    else:
        trim = trim.replace(" ","_").lower()
        trim = trim.replace("-","_").lower()
    return [model,make,trim]

if __name__ == "__main__":
    raise Exception("This file is not meant to run by itself")

# Determine if new records are needed
def areNewRecordsNeeded(current,pageCapacity):
    if ((current % pageCapacity) == 0):
        return True
    else:
        return False