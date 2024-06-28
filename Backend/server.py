from flask import Flask,request, jsonify
import json
import AutoTrader
import CarBravo
import Carfax
import CarGuru
import Carksl
import Carmax
import Cars
import Edmund
import TrueCar
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return jsonify({"status": 200, "message": "Server is running!"})

@app.route('/api/cars', methods=['POST'])
def cars():
    try:
        website = request.args.get('website', default = "truecar", type = str)
        body = request.get_json()
        make = None
        model = None
        distance = None
        zip = None
        trim = None
        page = "1"

        if "make" in body:
            make = body["make"]
        else:
            return jsonify({"status": 401, "message": "Invalid Request, make is required"})
        if "model" in body:
            model = body["model"]
            if model == "All Models":
                model = None
        if "distance" in body:
            distance = body["distance"]
            if distance == "All Distances":
                distance = None
        if "zip" in body:
            zip = body["zip"]
        if "trim" in body:
            trim = body["trim"]
        if "page" in body:
            page = body["page"]

        x = []
        if website == "autotrader":
            x = AutoTrader.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "carbravo":
            x = CarBravo.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "carfax":
            x = Carfax.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "carguru":
            x = CarGuru.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "carksl":
            x = Carksl.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "carmax":
            x = Carmax.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "cars":
            x = Cars.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "edmund":
            x = Edmund.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        if website == "truecar":
            x = TrueCar.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False)
        
        return jsonify({"status": 200, "message": "Data Recieved!", "data":x})
    except Exception as e:
        print(e)
        return jsonify({"status": 500, "message": "Internal Server Error!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)