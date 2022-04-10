from audioop import add
from flask import Flask, request
from flask_cors import cross_origin
import requests
import os

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>This is the CS411 server!</p>"


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

        restaurantDict = {
            "name": name,
            "address": address,
            "phone": phone,
            "image": image,
            "rating": rating
        }

        restaurantInformation.append(restaurantDict)

    return {"Message": "Success", "restaurants": restaurantInformation}