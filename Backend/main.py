from flask import Flask,request, jsonify
from flask import render_template, send_from_directory
from waitress import serve
import requests
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
import webbrowser
import socket

app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def send_static(path):
    print("Requested path:", path)
    links = [""]
    if path in links:
        return render_template('index.html')
    else:
        return send_from_directory('static', path)

@app.route('/api/cars', methods=['POST'])
def cars():
    try:
        website = request.args.get('website', default = "truecar", type = str)
        body = request.get_json()
        make = None
        model = None
        distance = None
        zip = None
        year = None
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
        if "year" in body:
            year = body["year"]
            try:
                year = int(year)
            except:
                year = None
            if year == "":
                year = None

        x = []
        if website == "autotrader":
            x = AutoTrader.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "carbravo":
            x = CarBravo.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "carfax":
            x = Carfax.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "carguru":
            x = CarGuru.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "carksl":
            x = Carksl.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "carmax":
            x = Carmax.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "cars":
            x = Cars.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "edmund":
            x = Edmund.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        if website == "truecar":
            x = TrueCar.scrapCars(page,make=make,model=model,trim=trim,zip=zip,radius=distance, newRequest=False, yearMax=year, yearMin=year)
        
        return jsonify({"status": 200, "message": "Data Recieved!", "data":x})
    except Exception as e:
        print(e)
        return jsonify({"status": 500, "message": "Internal Server Error!"})

def get_ipv4_address():
    hostname = socket.gethostname()
    ipv4_address = socket.gethostbyname(hostname)
    return ipv4_address

@app.route('/getip', methods=['GET'])
def getip():
    return json.dumps({"STATUS":"OK","IP":"http://" + get_ipv4_address() + ":" + str(PORT)})