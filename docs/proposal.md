# Proposal

## Idea 1
An app to help you make dinner plans with a friend. Sign in with Google, then input your location and your friend's location. Using the average of the locations, the Yelp Fusion API returns a list of local restaurants with information such as ratings and cost. Then, the app uses the Google Calendar API to find your availability, and checks the upcoming weather at those times through the ColorfulClouds Weather API. Finally, the app returns a summary of your best meal options on the nicest days. The app would store users' profile information and potentially allow two users to create plans with input from both of their Google Calendars.

## Idea 2
An app to help encourage new tasks. Sign in with Google, then select the type of task you are looking to try. Using the Bored API, the app will generate a few potential tasks that the user can select from. The app will fetch a relevant video to the task from the YouTube API. Then, the Todoist API creates that task on the user's To Do list, with the YouTube video linked in the description. The app would store users' profile information and their completed tasks.