$(document).ready(function () {


  // This example requires the Places library. Include the libraries=places
  // // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQHbqilN4MFV6-QYxw3-Xay9BJbPBZvt8&libraries=places"></script>

  // https://maps.googleapis.com/maps/api/place/nearbysearch/json
  //   ?location=-33.8670522,151.1957362
  //   &radius=500
  //   &types=food
  //   &name=harbour
  //   &key=AIzaSyBQHbqilN4MFV6-QYxw3-Xay9BJbPBZvt8

  // function initMap() {
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -33.866, lng: 151.196},
  //     zoom: 15
  //   });
  // console.log("hello");

  //   var infowindow = new google.maps.InfoWindow();
  //   var service = new google.maps.places.PlacesService(map);

  //   service.getDetails({
  //     placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  //   }, function(place, status) {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         position: place.geometry.location
  //       });
  //       google.maps.event.addListener(marker, 'click', function() {
  //         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
  //           'Place ID: ' + place.place_id + '<br>' +
  //           place.formatted_address + '</div>');
  //         infowindow.open(map, this);
  //       });
  //     }
  //   });
  // }

  // // hide well when page loads
  $(".well").hide();

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLk-BHKWaXv4zCAWa9Ekc51UalnuS5yjo",
    authDomain: "travelbook-1543375707755.firebaseapp.com",
    databaseURL: "https://travelbook-1543375707755.firebaseio.com",
    projectId: "travelbook-1543375707755",
    storageBucket: "travelbook-1543375707755.appspot.com",
    messagingSenderId: "329432180812"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //----------------Pete and Maira----------------------------------
  $("#myModal").modal('show');

  //Add login event
  $("body").on("click", "#login-button", function () {
    event.preventDefault();
    console.log("Hi. I hear you");
    // Get e-mail and pass
    var email = $("#input-email").val();
    var password = $("#input-password").val();
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  //Add signup Event
  $("body").on("click", "#signup-button", function () {
    event.preventDefault();
    console.log("Hi. I hear you");
    // Get e-mail and pass
    var email = $("#input-email").val();
    var password = $("#input-password").val();
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .catch(e => console.log(e.message));
  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      //$('#myModal').hide();
    } else {
      console.log('not logged in');
    }
  })
  //---------------------------------------------------------------------------------

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });


  // --------------------- index page --------------------------------------------------------------------------------
  $("#submit-search-form").on("click", function () {


    // show well when submit button is clicked
    $(".well").show();

    //Will stop the page from refreshing so we can grab the values input by the user
    event.preventDefault()

    // grab a hold of the values the users input (the location and category)
    var location = $("#location").val();
    var category = $("#category").val();

    // Console.log() the values and see if they match what you entered into the form.
    console.log(location);
    console.log(category);
    //================================new===================//

    // Add conditionals to make sure at least one field is filled 
    if (location === "") {
      $('#emptyField').modal('show');
    }
    else {
      //================================end new===================//

      // Make an AJAX call to the Yelp API with location and category as query parameters

      $.ajax({
        url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
        method: "GET",
        headers: {
          authorization: "Bearer zTc8hKel4T1UcSNchYEMflSNuuZ4B6NErA4ebwBx5NE2WCMlTAC8YOpimFb5osb45soTdnkhO0bi1841cHisFdjLD0ihQhs47ZQH6q4CfBj-wJJAZlzIa5btBYv4W3Yx",
        }
      }).then(function (response) {
        console.log(response)
        $(".well").empty();

        for (var i = 0; i < response.businesses.length; i++) {
          // Assign variables to hold API information
          var imgURL = response.businesses[i].image_url;
          var businessName = response.businesses[i].name;
          var businessPhone = response.businesses[i].display_phone;
          var businessCity = response.businesses[i].location.city;
          var businessAddress = response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code;
          var businessURL = response.businesses[i].url;
          var businessID = response.businesses[i].id;

          // Dynamically generate a new table
          var newTable = $("<table width='100%'>");
          // Dynamically generate a table row to append cells to
          var newRow = $("<tr>").attr({ "class": "table-row-list", "width": "100%" });
          // Dynamically generate a table cell to append information to
          var leftCell = $("<td>").attr("width", "90%");
          // Assign variable to dynamically generate a horizontal rule
          var spacer = $("<hr>");
          // Append image tag to leftCell
          leftCell.append($("<img>").attr({ "src": imgURL, "class": "thumbnailAPI", "alt": businessName }));
          // Append business name to leftCell
          leftCell.append($("<a>").attr({ "href": businessURL, "class": "business-name", "target": "_blank" }).html("<h3 class=''>" + businessName + "</h3>"));
          // Append business phone number to leftCell
          leftCell.append($("<p>").attr("class", "phone").text(businessPhone));
          // Append business address to leftCell
          leftCell.append($("<p>").attr("class", "address").text(businessAddress));
          // Dynamically generate a table cell to append an add button to
          var rightCell = $("<td>").attr({ "width": "10%", "align": "center" });
          // Dynamically generate a button tag
          var addBtn = $("<button>");
          // Dynamically generate a span tag
          var addSpan = $("<span>");
          // Add class to button
          addBtn.addClass("add-button");
          // Add business ID to button to add to Firebase on click of plus sign
          addBtn.attr("data-id", businessID);
          // Add business city to button to add to Firebase on click of plus sign
          addBtn.attr("data-city", businessCity);
          // Add Bootstrap plus sign class to span
          addSpan.addClass("glyphicon glyphicon-plus-sign");
          // Add hide function to span
          addSpan.attr("aria-hidden", "true");
          // Append span to rightCell
          addBtn.append(addSpan);
          // Append button to rightCell
          rightCell.append(addBtn);
          // Append leftCell to newRow
          newRow.append(leftCell);
          // Append rightCell to newRow
          newRow.append(rightCell);
          // Append newRow to newTable
          newTable.append(newRow, spacer);
          // Append newTable to well div
          $(".well").append(newTable);
        }
      });
    }
  });
  // Add "interest" on click of plus button
  $("body").on("click", ".add-button", function () {


    // Assign variable to hold business ID to add to Firebase that's stored in this button's data-id
    var idToAdd = $(this).attr("data-id");
    // Assign variable to hold business city data value
    var cityToAdd = $(this).attr("data-city");

    // Pull data down from Firebase to compare
    database.ref().on("value", function (snapshot) {
      var businessCity = snapshot.val();

      // Set conditional to create new bucket if bucket does not exist - create new bucket with city name
      if (businessCity.exists()) {
        database.ref("/bucketData").push({
          businessID: idToAdd,
          businessCity: cityToAdd,
        });

        // if bucket with businessCity name exists, add 
      } else {
        database.ref()
      }
      // Push business ID and city to Firebase
      database.ref().push(cityToAdd);


    });
  });


  // ------------------------------------ profile page ------------------------------------

  // Append firebase data to profile page - format above (maybe) buckin fuckets
  // Create Firebase event for adding new restaurant to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    // Assign variables to hold the value of the database key/value pairs for each parameter of an Interest
    var businessCity = childSnapshot.val();
    // var businessCity = childSnapshot.val().city;
    // Assign a variable to create BootStrap autolayout columns to hold HTML framework then append to page
    var newBSColDiv = $("<div class ='col-lg-2 col-md-3 col-sm-6 col-12'>");
    // Assign a variable to create an anchor tag to wrap around bucket photo and title
    var newAnchor = $("<a>").attr("href", "#").html("<h3 id='city-name'>" + businessCity + "</h3>"); // Change href to target CSS in the future, creating an expandable and collapsible listicle
    // Assign a variable to create an img tag for bucket city
    var newImg = $("<img>").attr({ "src": "assets/photos/sf-icon.jpg", "alt": "City Name", "class": "city-thumbnail" }); // Pull image of the city from Google Places API in the future
    // Assign a variable to crean an h3 tag for the city name
    // var newHtag = $("<h3>").text(businessCity); // Change text to a variable that holds the city name in the future
    // Append newHtag and newImg to newAnchor
    newAnchor.append(newImg);
    // Append newAnchor to BootStrap Div
    newBSColDiv.append(newAnchor);
    // Append newDiv to class of buckets in container
    $(".buckets").append(newBSColDiv);
  });

  $("#yelp-submit").on("click", function () {
    event.preventDefault();


    // grab a hold of the values the users input (the location and category)
    var location = $("#location").val();
    // Start with category of restaurants for testing
    var category = $("#category").val();
    //   // Make an AJAX call to the Yelp API based on your research. 
    //   // Try and get a response back that returns a series of business fitting 
    //   // within a specified location and category.

    $.ajax({
      url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
      method: "GET",
      headers: {
        authorization: "Bearer zTc8hKel4T1UcSNchYEMflSNuuZ4B6NErA4ebwBx5NE2WCMlTAC8YOpimFb5osb45soTdnkhO0bi1841cHisFdjLD0ihQhs47ZQH6q4CfBj-wJJAZlzIa5btBYv4W3Yx",
      }
    }).then(function (response) {
      console.log(response);


      for (var i = 0; i < response.businesses.length; i++) {

        // Now that we're able to get the information we want, it's time to render it to the page.
        $("#well").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><p class="url">' + response.businesses[i].url + '</p><hr>')
      }
    });
  });
});