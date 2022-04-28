from audioop import add
from flask import Flask, jsonify, request, redirect
from flask_cors import cross_origin
from flask_login import login_required, LoginManager, current_user, login_user, logout_user
import json
import requests
import os
from oauthlib.oauth2 import WebApplicationClient
from models import User
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

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


@app.route("/login")
def login():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"]
    )
    return redirect(request_uri)


@app.route("/login/callback")
def callback():
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )

    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(os.environ.get("GOOGLE_CLIENT_ID"), os.environ.get("GOOGLE_CLIENT_SECRET"))
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "Email unavailable/unverified.", 400
    
    user = User(_id=unique_id, name=users_name, email=users_email, pic=picture)
    if not User.get_from_id(unique_id):
        User.create(unique_id, users_name, users_email, picture)
    
    login_user(user)
    print(current_user.email + " logged in")

    return redirect("/")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route("/findRestaurants")
@login_required
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

    return {"Message": "Success", "restaurants": restaurantInformation}


@app.route("/getWeather")
@login_required
@cross_origin()
def getWeather():
    args = request.args
    latitude = args.get("lat")
    longitude = args.get("lon")

    print(latitude)
    print(longitude)


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

    for day in dailyWeather:
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