# Welcome to Travel Book!

## Project One

## Jackson Sabol, Christie Byrne, Pete Widders, Maira Jimenez


### Overview
  We created Travelbook, an app where users can build their own travel profile, full of the places they love, that they want to re-visit or recommend to other friends and family members. From our experiences, travelers value their friends and family's advice over strangers on the internet, so we created a platform to help them share these recommendations.

 Our application eliminates the need for writing down restaurant names to remember on napkins that you will inevitably lose, and disorganized lists in your phone that are a headache to search through! 
 
  We used HTML, CSS, JavaScript, Bootstrap, jQuery, JSON, Google Firebase and AJAX HTTP requests to let users search using Yelp, and then append their findings to their profile, with the help of Firebase for authentication and snapshots.

This app will automatically sort and store all of your favorite places to visit, with a few clicks of a button. In our Beta version, users will be searchable by username, similar to Spotify or Pinterest, to enable an easy-sharing feature.


 ### Setting up Firebase for Authentication/Registration

![alt text](assets/photos/firebase.png)

 ### Sign Up Functionality

We assigned two local variables to hold the data entered, first variable is `data` which holds the users email, as well as their first and last name. We also have a variable called `passwords`, which holds the password they create and the password confirmation. Below we have two if statements, the first one makes sure all required fields are not left empty. The second `if statement` makes sure the new password created and the password confirmation match and if this is true it creates a new user. We also added the Google log in functionality where users are able to log in using their Gmail account. 

![alt text](assets/photos/signup.png)

### Log In Authentication

When user wants to log in we send an authentication request to firebase to check if the email and password entered match any of our database. If yes, user is granted access to profile.
![alt text](assets/photos/login.png)

 ### To Research Restarurants and Location 
<ul>
 <li>Yelp API</li>
 <li>Google Software Development Kit-Google Cloud API</li>
</ul>

![alt text](assets/photos/searchbar.png)


### Add Restarurants to Profile
When the plus button next to a restaurant is clicked, push this interest to Firebase database. 

![alt text](assets/photos/addrestaurant.png)


### Link to Deployed Version

[Link to TravelBook](https://jacksonsabol.github.io/TravelBook/)

### Built With:
* HTML
* CSS
* JavaScript
* jQuery Library for appending to HTML
* JSON
* AJAX
* Google Firebase
* Bootstrap (Mobile Responsive)
* User Input Validations


## Thank you for reading! 



