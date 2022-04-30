# 411-group-project
Group members include Jason Zhang, Nick Hall, Kourosh Ghaffari, Weirun Huang, Erickson Monterroza

# How to run the client
1) Make sure you have react install, you would also need an updated enough version of node (I use node version 14.18.1 and that works)
2) Change directory into client/my-app and then type:
    - Type in "npm install" and wait for node packages to install (should take a while)
    - Type in "npm start", this should launch the initial App.js which is located inside client/my-app/src/components
3) If working, you should see a message welcoming you to the CS411 client
4) You may have to modify the backend_url in the config file depending on what your server's address is.
5) Add a new line to config.js defining the Google client ID:

    const config = {
        backend_url: "http://localhost:5000",
        google_client_id: ""
    }

    export default config;

# How to run the server
1) Make sure you have Flask installed (official documentation can be great for this)
2) Change directory into server
3) Run the following commands
    - "pip install -r requirements.txt"
    - "export FLASK_APP=server.py"
    - "flask run"

In order to avoid having to export FLASK_APP and API keys every time, it is recommended to create a .env file inside of server with each line declaring a key value pair, e.g.:

    FLASK_APP=server.py
    FLASK_ENV=development
    SECRET_KEY=
    DATABASE_URI=
    YELP_API_KEY=
    WEATHER_API_KEY=
    GOOGLE_CLIENT_ID=

4) You should see a message similar to "Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)", follow the url
5) If successful, you'll see a message welcoming you to the CS411 server