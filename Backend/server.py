from flask import Flask,request, jsonify
import json
from Cars import scrapCars
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return jsonify({"status": 200, "message": "Server is running!"})

@app.route('/get/cars', methods=['POST'])
def cars():
    try:
        body = request.get_json()
        make = None
        model = None
        distance = None
        zip = None

        if "make" in body:
            make = body["make"]
        else:
            return jsonify({"status": 401, "message": "Invalid Request, make is required"})
        if "model" in body:
            model = body["model"]
        if "distance" in body:
            distance = body["distance"]
        if "zip" in body:
            zip = body["zip"]

        print(make,model,distance,zip)
        x = scrapCars(make=make,model=model,zip=zip,radius=distance,recordsNumber=15,newRequest=True)
        return jsonify({"status": 200, "message": "Data Recieved!", "data": "Will be Validated"})
    except Exception as e:
        print(e)
        return jsonify({"status": 500, "message": "Internal Server Error!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)