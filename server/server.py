from flask import Flask, jsonify, request
import requests
import os

app = Flask(__name__)
OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY") 

@app.route("/")
def hello_world():
    return "<p>This is the CS411 server!</p>"


@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    response = requests.get("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + OPENWEATHER_API_KEY)
    return response.json()
