from audioop import add
from http import HTTPStatus
from venv import create
from flask import Flask, jsonify, request, redirect
from flask_cors import cross_origin, CORS
from flask_login import login_required, LoginManager, current_user, login_user, logout_user
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

login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = os.environ.get("SECRET_KEY")

client = WebApplicationClient(os.environ.get("GOOGLE_CLIENT_ID"))
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@app.route("/")
def hello_world():
    print(current_user.is_authenticated)
    return "<p>This is the CS411 server!</p>"


@login_manager.user_loader
def user_loader(user_id):
    print("loading user")
    return User.get_from_id(user_id)


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
    
    login_user(user)

    # print(id_info)
    print(current_user.is_authenticated)

    return user.json()


@app.route("/logout")
def logout():
    print(current_user.is_authenticated)
    logout_user()


@app.route("/findPlans")
@cross_origin()
def findPlans():
    # take in foodType, city, dates
    term = request.args.get("foodType")
    location = request.args.get("city")
    # assume dates are in the format YYYY-MM-DD
    freeDates = request.args.get("dates").split(',')

    # api-endpoint
    url = 'https://api.yelp.com/v3/businesses/search'

    yelpToken = os.environ.get("YELP_API_KEY")

    # authorization using access token
    headers = {'Authorization': "Bearer " + yelpToken}

    # parameters I'm passing in to the api request
    params = {'term': term,
              'location': location,
              'limit': 5
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

    # api-endpoint
    url = 'https://api.openweathermap.org/data/2.5/onecall'

    weatherToken = os.environ.get("WEATHER_API_KEY")

    # authorization using access token
    headers = {'Authorization': "Bearer " + weatherToken}

    # parameters I'm passing in to the api request
    params = {'lat': bestRestaurants[0]["lat"],
              'lon': bestRestaurants[0]["lon"],
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
        dateWeatherList.append({"date": currentDate, "weather": dayWeather["weather"], "temp": dayWeather["temp"]})
        currentDate += timedelta(days=1)
    
    bestDates = []
    selectedDates = [day for day in dateWeatherList if day["date"].strftime("%Y-%m-%d") in freeDates]
    print(selectedDates)
    print(dateWeatherList)
    print(dateWeatherList[3]["date"].strftime("%Y-%m-%d"))
    bestDates = [day for day in selectedDates if day["weather"][0]["main"] == "Clear"]
    if not bestDates:
        bestDates = [day for day in selectedDates if day["weather"][0]["main"] == "Clouds"]
    else:
        bestDates = selectedDates
    
    print(bestDates)

    planIdeas = []
    for i in range(3):
        randIndex = random.randint(0, len(bestRestaurants)-1)
        restaurant = bestRestaurants[randIndex]
        del bestRestaurants[randIndex]
        randIndex = random.randint(0, len(bestDates)-1)
        planDate = bestDates[randIndex]
        planIdeas.append({"restaurant": restaurant, "date": planDate["date"], "weather": planDate["weather"]})
    
    print(planIdeas)
    return jsonify(planIdeas)


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


@app.route("/findRestaurants")
@cross_origin()
def findRestaurants():
    # term = json["foodType"]
    # location = json["location"]
    args = request.args
    term = args.get("foodType")
    location = args.get("location")

    # api-endpoint
    url = 'https://api.yelp.com/v3/businesses/search'

    yelpToken = os.environ.get("YELP_API_KEY")

    # authorization using access token
    headers = {'Authorization': "Bearer " + yelpToken}

    # parameters I'm passing in to the api request
    params = {'term': term,
              'location': location,
              'limit': 5
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
    
    print(restaurantInformation)

    return {"Message": "Success", "restaurants": restaurantInformation}


@app.route("/getWeather")
@cross_origin()
def getWeather():
    args = request.args
    latitude = args.get("lat")
    longitude = args.get("lon")

    print(latitude)
    print(longitude)
    print(date.today())

    # api-endpoint
    url = 'https://api.openweathermap.org/data/2.5/onecall'

    weatherToken = os.environ.get("WEATHER_API_KEY")

    # authorization using access token
    headers = {'Authorization': "Bearer " + weatherToken}

    # parameters I'm passing in to the api request
    params = {'lat': latitude,
              'lon': longitude,
              'units': "imperial",
              'appid': weatherToken
              }
    # api-call
    r = requests.get(url=url, params=params)

    # information passed back from api
    apiDict = r.json()

    dailyWeather = apiDict["daily"]
    weatherInfo = []
    # print(dailyWeather)

    for day in dailyWeather:
        print(day["weather"])
        min = day["temp"]["min"]
        max = day["temp"]["max"]
        weather = day["weather"][0]["description"]

        weatherDict = {
            "min": min,
            "max": max,
            "weather": weather
        }

        weatherInfo.append(weatherDict)

    return {"Message": "Success", "weather": weatherInfo}