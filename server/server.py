from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>This is the CS411 server!</p>"