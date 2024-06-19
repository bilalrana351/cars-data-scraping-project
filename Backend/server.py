from flask import Flask
import Cars

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/api/data')
def returnData():
    # The arguments list is : 
    return Cars.scrapCars() # This will return an array of listings
if __name__ == '__main__':
    app.run(debug=True)