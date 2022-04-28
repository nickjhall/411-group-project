from flask_login import UserMixin
import pymongo
import os

databaseClient = pymongo.MongoClient(os.environ.get("DATABASE_URI"))
db = databaseClient.makeAPlanDB
users = db.users


# TODO: connect to database
class User(UserMixin):

    def __init__(self, _id, name, email, pic):
        self._id = _id
        self.name = name
        self.email = email
        self.pic = pic
    
    def get_id(self):
      return self._id
    
    def get_email(self):
      return self.email

    @staticmethod
    def get_from_id(user_id):
      result = users.find_one({"_id": user_id})
      if result:
        user = User(result["_id"], result["name"], result["email"], result["pic"])
        return user
      else:
        return None
    
    @staticmethod
    def get_from_email(email):
      return users.find_one({"email": email})
    
    @staticmethod
    def create(_id, name, email, pic):
      existing_user = User.get_from_id(_id) 
      if existing_user is None:
        user = users.insert_one({"_id": _id, "name": name, "email": email, "pic": pic})
        return user
      else:
        return existing_user

      