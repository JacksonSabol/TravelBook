# Welcome to Travel Book!

## Project One

# Jackson Sabol, Christie Byrne, Pete Widders, Maira Jimenez


###Overview
 We employed HTML, CSS, JavaScript, Bootstrap, jQuery, JSON, Google Firebase and AJAX HTTP requests to generate the Travelbook app where users can create an account and build their own travel profile. Users are able to search and add their favorite restaurant/activities from cities they have previously visited to their profile page. Our overall concenpt and development of this app is that we believe when people travel to a new place they are more inclined to ask the opinion of someone they know such as a friend or family member for recommendations rather than asking online and reading a stranger's review. We believe there isn't a user-friendly platform at the moment where users are able to build a travel profile and share their travel recommendations with others. We think this app would also be a great personal tool for people who love to travel  to have a space amd keep track of all the places they've visited and would want to re-visit. 

 ###Setting up firebase for Authentication/Registration
*Firebase


 ### To Research Restarurants and Location 
 *Yelp API
 *Google API
###Google and Yelp API's

-run yelp request after google places

https://maps.googleapis.com/maps/api/place/nearbysearch/json
  ?location=-33.8670522,151.1957362
  &radius=500
  &types=food
  &name=harbour
  &key=
AIzaSyBhJlQHvH5eKFMF847xmHIf3-cktkOPwJA -- maps

-make the api call to yelp, then google afterwards.


https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY

https://www.w3schools.com/html/html5_geolocation.asp

### Add Restarurants to Profile
When the plus button next to a restaurant is clicked, push this interest to Firebase database. 


Thank you for reading! 
[Link to Travelbook app]
##Built With:
*HTML
*CSS
*JavaScript
*jQuery Library for appending to HTML
*JSON
*Google Firebase
*Bootstrap(Mobile Responsive)
*User Input Validations
