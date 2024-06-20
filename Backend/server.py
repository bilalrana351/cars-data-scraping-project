from flask import Flask,request, jsonify
import json
import Cars
import TrueCar
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
        page = "1"

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
        if "page" in body:
            page = body["page"]

        x = TrueCar.scrapCars(1,make="honda")
        return jsonify({"status": 200, "message": "Data Recieved!", "data":x})
    except Exception as e:
        print(e)
        return jsonify({"status": 500, "message": "Internal Server Error!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)