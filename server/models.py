from flask_login import UserMixin
import pymongo
import os

databaseClient = pymongo.MongoClient(os.environ.get("DATABASE_URI"))
db = databaseClient.makeAPlanDB
users = db.users


# TODO: connect to database
class User(UserMixin):

    def __init__(self, _id, name, email):
        self._id = _id
        self.name = name
        self.email = email
    
    def get_id(self):
      return self._id
    
    def get_email(self):
      return self.email
    
    def json(self):
      return {"_id": self._id, "name": self.name, "email": self.email}

    @staticmethod
    def get_from_id(user_id):
      result = users.find_one({"_id": user_id})
      if result:
        user = User(result["_id"], result["name"], result["email"])
        return user
      else:
        return None
    
    @staticmethod
    def get_from_email(email):
      return users.find_one({"email": email})
    
    @staticmethod
    def create(_id, name, email):
      existing_user = User.get_from_id(_id) 
      if existing_user is None:
        user = users.insert_one({"_id": _id, "name": name, "email": email})
        return user
      else:
        return existing_user

      