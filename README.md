# 411-group-project
Group members include Jason Zhang, Nick Hall, Kourosh Ghaffari, Weirun Huang, Erickson Monterroza

# How to run the client
1) Make sure you have react install, you would also need an updated enough version of node (I use node version 14.18.1 and that works)
2) Change directory into client/my-app and then type in "npm start", this should launch the initial App.js which is located inside client/my-app/src/components
3) If working, you should see a message welcoming you to the CS411 client

# How to run the server
1) Make sure you have Flask installed (official documentation can be great for this)
2) Change directory into server
3) Run the following commands
    - 1) "pip install -r requirements.txt"
    - 2) "export FLASK_APP=server.py"
    - 3) "flask run"
In order to avoid having to export FLASK_APP and API keys every time, it is recommended to create a .env file inside of server with each line declaring a key value pair.
E.g. 
    FLASK_APP=server.py
    FLASK_ENV=development
    YELP_API_KEY=SomeLongStringHere

4) You should see a message similar to "Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)", follow the url
5) If successful, you'll see a message welcomign you to the CS411 server