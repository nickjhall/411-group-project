# General Overview

With our application, we help set up and organize your meal plans by taking out some of the work for you. You tell us what type of food you're craving, where you are and where you want to go and you leave the rest to us. In terms of where you are, you can input a street, city, or even a zip code and we will find the places closest to you. From the home menu you are able to access your planner, showing any meal plans that you have already made, or you can search for a restuarant. After searching with your given parameters, we will give you the three best restuarants for you. Along with the restuarant name, we give you the address, phone number, google rating, and even tell you what the weather is on the given day in order to help you better plan your outings. All of this information is available both in the restuarant selection as well as in the planner. Once you find a place that you want to go to, you simple click the "Make Plan" button to create the plan for yourself. Once any plan is made, you are brought to your planner where you will see your new plan as well as any other outings that you have organized on the application. From the planner you are able to view all of the plans that you have made, and, if needed, you can cancel any plans that you have already created and return to the home menu.


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