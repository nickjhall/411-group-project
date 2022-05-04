# User Stories

**As a new user, I want to sign in with my Google account so that I can easily work around the schedule on my Google Calendar**

When opening the application, the user will be asked to sign in with their Google account. Then, the application will request access to their Google Calendar. If they grant the application permission, then they can continue to the profile setup story. If they don't grant permission, then the application will just use a default work schedule when creating plans. 

**As a new, logged-in user, I want to complete my user profile so that I don’t have to input my preferences every time.**

Once the user has followed "sign in" story, they will be prompted to complete their profile setup. They will fill out a few forms about themselves, such as their location and food preferences. They do not need to complete this setup before moving on to create plans, and they can skip through it. They can always click on their profile to edit their information if they would like to make a change. 

**As a logged-in user, I want to create an event so that I can invite my friend to a specific plan.**

The user will click on a button to create a new event, then enter the unique ID of their friend and follow the "filter select" user story. hen the user will click the "send invite" button. If the user's unique ID is invalid, then no event is created and an error is shown. A successfully created invite will be shown as pending under their event list, and can be edited according to the "modify event" user story. 

**As a user that is creating an event, I want to select filters so that I can find the best event for my preferences.**

During the "create event" story, the user will be able to select from several options for the event. They will be able to select their default preferences for time, location, food type, or restaurants, or they can enter specific values for these fields. If a value is not filled in for any or all fields, then the user can click "suggest" for each field to fill in a suggested choice. The user will only be able to click the "send invite" button once all fields are filled.

**As a logged-in user, I want to accept or reject my friend’s invitation so that I can choose whether to join their event.**

A new plan will appear under the user's event list as "pending". The user can either click the accept button or the reject button. If the accept button is chosen, then the event status changes to "confirmed". Anything about the event can then be changed through the "modify event" user story. If the reject button is chosen, then the user is prompted for a reason, and the event status changes to "rejected: reason".

**As a user with a planned event, I want to modify my events so that I can still go out if my schedule changes.**

Once atleast one plan has been created from the "create event" user story, either user can click on "modify", and they can change any details about the event, then click "propose". The event status will change to "change proposed" for the other user, and they will have to accept or reject the change. If they accept the change, then the status changes to "change confirmed". If reject is chosen, the user must select a reason and the status displays "change rejected: reason". Both users can repeat this process as many times as desired. 

**As a user with a planned event, I want to cancel my event so that I can change my mind.**

After a plan has been created and exists in the event list, either user can click on the "cancel" button and provide a reason. The user will be prompted to confirm that they want to cancel the event. If they confirm, the event status will changed to "cancelled: reason". 