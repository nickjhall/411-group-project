# Notes on Changes

We decided to scale down the application due to time and complexity reasons. We originally planned to create an app with a "network" of users where a user would be able to invite another user to a plan, and then the other user would be able to confirm or change this plan. However, we decided that it would be more reasonable to create a single-person application, where each person has individually stored plans and it is used more for ideas than to coordinate with another person through the app. We also decided to remove the use of the Google Calendar API in favor of just basing the plan suggestions on the OpenWeather API and the Yelp API.

# User Stories

**As a new user, I want to sign in with my Google account to easily login to my personal account.**

The user will start on the home page, and there is a login button that the user can press to authenticate themselves. This button will automatically bring them to a secure Google sign in page. They can enter their Google credentials there, and then if the token is validated then they will be redirected to their profile page. However, if the token fails verification with the Google client, then a forbidden error will be returned. 


**As a logged-in user, I want to browse restaurants to decide on the best plan for me.**

The user can enter filters according to the filter user story. Then, the website will return a series of plans, which consist of a restaurant in the city chosen, a date, and the predicted weather for that date. Then, the user can select one of those plans by clicking the select plan button. If the user doesn't like any of the plan ideas, then they can change the filters according to the filters user story and resubmit a search. 


**While I am browsing plans, I want to enter filters so that the plans are the most accurate for my schedule, location and tastes.**

The user can select the food type, location, and dates that work for them by typing into the forms on the profile page. The dates can be chosen from a multiselect that includes each day in the next week, and the user can control click to select multiple dates. Once they are done filtering, they can submit with the submit button. If the user doesn't submit one of the fields, then no results will be returned.


**Once I have made a plan, I want to view all of my current plans.**

The user can click on the My Plans navigation in order to view their current plans. This is available from the profile page. If they don't have any plans then the page will tell them to make a plan. If they do have plans, then the page will display a list of plans with the restaurant information and the date chosen for the plan.


**As a user with a plan, I want to delete my plan because I changed my mind.**

The user will go to the My Plans page, which they can do either through the view plans user story, or by selecting a new plan. On this page, the user can select "cancel plan" for any of their plans. This will remove the plan from their account and they will be redirected to the profile page.