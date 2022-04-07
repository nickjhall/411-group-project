from flask import Flask, jsonify
import requests
import os

app = Flask(__name__)
OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY") 

@app.route("/")
def hello_world():
    return "<p>This is the CS411 server!</p>"


@app.route("/weather")
def get_weather():
    response = requests.get("http://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=" + OPENWEATHER_API_KEY)
    return response.json()
