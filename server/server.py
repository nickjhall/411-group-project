from audioop import add
from http import HTTPStatus
from venv import create
from flask import Flask, jsonify, request, redirect
from flask_cors import cross_origin, CORS
import json
import requests
import os
import random
from datetime import date, timedelta
from oauthlib.oauth2 import WebApplicationClient
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from models import User, Plan
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
google_request = google_requests.Request()

app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY")

client = WebApplicationClient(os.environ.get("GOOGLE_CLIENT_ID"))
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@app.route("/login", methods=["GET", "POST"])
@cross_origin()
def login():
    print("login called")
    print(request.json)
    # print(request.form.get("test"))
    # return { "response": "hey" }
    token = request.json["token"]
    print(token)
    if token is None:
        return "No ID token", HTTPStatus.FORBIDDEN
    
    id_info = id_token.verify_oauth2_token(token, google_request, os.environ.get("GOOGLE_CLIENT_ID"))
    user = User(_id=id_info["sub"], name=id_info["name"], email=id_info["email"])
    if not User.get_from_id(id_info["sub"]):
        User.create(id_info["sub"], id_info["name"], id_info["email"])
    

    return user.json()


@app.route("/findPlans")
@cross_origin()
def findPlans():
    # take in foodType, city, dates
    term = request.args.get("foodType")
    location = request.args.get("location")
    # assume dates are in the format YYYY-MM-DD
    freeDates = request.args.get("dates").split(',')                         

    bestRestaurants = getBestRestaurants(term, location)

    lat = bestRestaurants[0]["lat"]
    lon = bestRestaurants[0]["lon"]
    bestDates = getBestDates(lat, lon, freeDates)

    planIdeas = []
    for i in range(3):
        randIndex = random.randint(0, len(bestRestaurants)-1)
        restaurant = bestRestaurants[randIndex]
        del bestRestaurants[randIndex]
        randIndex = random.randint(0, len(bestDates)-1)
        planDate = bestDates[randIndex]
        planIdeas.append({"restaurant": restaurant, "date": planDate["date"], "weather": planDate["weather"][0]["main"]})
    
    print(planIdeas)
    return jsonify(planIdeas)


def getBestRestaurants(term, location):
    # api-endpoint
    url = 'https://api.yelp.com/v3/businesses/search'

    yelpToken = os.environ.get("YELP_API_KEY")

    # authorization using access token
    headers = {'Authorization': "Bearer " + yelpToken}

    # parameters I'm passing in to the api request
    params = {'term': term,
              'location': location,
              'limit': 10
              }
    # api-call
    r = requests.get(url=url, params=params, headers=headers)

    # information passed back from api
    apiDict = r.json()

    allRestaurants = apiDict["businesses"]
    restaurantInformation = []
    
    for restaurant in allRestaurants:
        name = restaurant["name"]
        address = restaurant["location"]["display_address"]
        phone = restaurant["display_phone"]
        image = restaurant["image_url"]
        rating = restaurant["rating"]
        lat = restaurant["coordinates"]["latitude"]
        lon = restaurant["coordinates"]["longitude"]
    
        restaurantDict = {
            "name": name,
            "address": address,
            "phone": phone,
            "image": image,
            "rating": rating,
            "lat": lat,
            "lon": lon
        }

        restaurantInformation.append(restaurantDict)
    bestRestaurants = [rest for rest in restaurantInformation if rest["rating"] >= 4.0]

    return bestRestaurants


def getBestDates(lat, lon, freeDates):
    # api-endpoint
    url = 'https://api.openweathermap.org/data/2.5/onecall'

    weatherToken = os.environ.get("WEATHER_API_KEY")

    # authorization using access token
    headers = {'Authorization': "Bearer " + weatherToken}

    # parameters I'm passing in to the api request
    params = {'lat': lat,
              'lon': lon,
              'units': "imperial",
              'appid': weatherToken
              }
    # api-call
    r = requests.get(url=url, params=params)

    # information passed back from api
    apiDict = r.json()

    dailyWeather = apiDict["daily"]

    # create list of date, weather, temp tuples
    dateWeatherList = []
    currentDate = date.today()
    for dayWeather in dailyWeather:
        dateWeatherList.append({"date": str(currentDate), "weather": dayWeather["weather"], "temp": dayWeather["temp"]})
        currentDate += timedelta(days=1)
    
   
    bestDates = []
    selectedDates = [day for day in dateWeatherList if day["date"] in freeDates]


    for day in selectedDates:
        if day["weather"][0]["main"] == "Clear":
            bestDates.append(day)
    
    if len(bestDates) == 0:
        for day in selectedDates:
            if day["weather"][0]["main"] == "Clouds":
                bestDates.append(day)

    if len(bestDates) == 0:
        bestDates = selectedDates
    
    
    print("bestDates are ", bestDates)

    return bestDates


@app.route("/selectPlan", methods=["GET", "POST"])
@cross_origin()
def selectPlan():
    # expected input: createdBy, restaurant, address, pic, date
    print(request.json)
    plan = Plan.create(request.json["createdBy"], request.json["restaurant"], request.json["address"], request.json["pic"], request.json["date"])
    return {"Message": "Success"}


@app.route("/getPlans")
@cross_origin()
def getPlans():
    createdBy = request.args.get("createdBy")
    plans = Plan.get_from_user_id(createdBy)
    plans_json = jsonify([plan.json() for plan in plans])
    return plans_json

@app.route("/deletePlans", methods=["GET"])
@cross_origin()
def deletePlans():
    planId = request.args.get("planId")
    print(planId)
    Plan.delete(planId)
    return {"Message": "Success"}