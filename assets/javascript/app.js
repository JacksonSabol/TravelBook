$(document).ready(function () {

  // // hide <div> with class of well on index.html when page loads
  $(".well").hide();

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLk-BHKWaXv4zCAWa9Ekc51UalnuS5yjo",
    authDomain: "travelbook-1543375707755.firebaseapp.com",
    databaseURL: "https://travelbook-1543375707755.firebaseio.com",
    projectId: "travelbook-1543375707755",
    storageBucket: "travelbook-1543375707755.appspot.com",
    messagingSenderId: "329432180812",
    // Google Oauth client ID and discovery docs
    clientId: "329432180812-j5jie5pqjehkhoutg3qkuq7aohnsntl0.apps.googleusercontent.com"
  };
  firebase.initializeApp(config);

  // ====================== login start ======================//
  var database = firebase.database();
  // Assign a variable to equal the Firebase pathway to the Interests folder
  var interestRef = database.ref('Interests')
  // Assign a variable to equal the Firebase pathway to the Users folder
  var usersRef = database.ref('Users')
  // Assign a variable to hold the value of whether a user is logged in or not
  var auth = null;
  // Assign a variable to a blank string 'globally' so it can be reassigned when a user is authenticated (logged in)
  var userID = "";
  // Google authentication (underneath Firebase authorization)
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  //  Authenticate with Google 'on-click'
  $('#googleLogin').on('click', function signInGoogle() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // console.log(token);
      // The signed-in user info.
      var user = result.user;
      // console.log(user);
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      // console.log(errorCode);
      var errorMessage = error.message;
      // console.log(errorMessage)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // console.log(credential);
    });
  });

  // Register with Firebase
  $('#registerForm').on('submit', function (e) {
    // Prevent default action of submitting form then refreshing the page
    e.preventDefault();
    // Hide the signUpModal
    $('#signUpModal').modal('hide');
    // Assign a variable locally to hold the data entered into the sign up form
    var data = {
      email: $('#registerEmail').val(), // Get the email
      firstName: $('#registerFirstName').val(), // Get firstName
      lastName: $('#registerLastName').val(), // Get lastName
    };
    // Assign a variable locally to hold the password data for comparison
    var passwords = {
      password: $('#registerPassword').val(), // Get the password
      cPassword: $('#registerConfirmPassword').val(), // Get the confirm password
    }
    // Make sure none of the fields important to logging in are empty
    if (data.email != '' && passwords.password != '' && passwords.cPassword != '') {
      // If they're filled, check if the passwords match
      if (passwords.password == passwords.cPassword) {
        // Create the user if the passwords match, sending the email and password to Google Firebase's build-in authentication system
        firebase.auth()
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function (user) {
            return user.updateProfile({
              displayName: data.firstName + ' ' + data.lastName
            })
          })
          .then(function (user) {
            // Reassign variable auth to the user information so that user needs to be logged in to save data
            auth = user;
            // Save the profile data
            usersRef.child(user.uid).set(data)
              .then(function () {
                // Log that the user has been added with the user's UID
                // console.log("User Information Saved:", user.uid);
              })
          })
          .catch(function (error) { // Check for errors
            // console.log("Error creating user:", error);
            // console.log("Error creating user:", error.code);
          });
      } else {
        // Log that the password and confirm password didn't match
        // console.log("ERROR: Passwords didn't match");
      }
    }
  });

  //  // Modal for when something is added to profile 
  $("body").on("click", ".add-button", function (e) {
    // Prevent default action of submitting then refreshing the page
    e.preventDefault();
    // Show the addToProfile modal
    $('#addToProfModal').modal('show');
    // Set timeout to only show modal for 1.5 seconds
    setTimeout(addToProfileDone, 1000 * 1.5);
  });

  // Function to hide addToProfModal
  function addToProfileDone() {
    $('#addToProfModal').modal('hide');
  }

  // Login when form with id of loginForm is submitted
  $('#loginForm').on('submit', function (e) {
    // Prevent default action of submitting then refreshing the page
    e.preventDefault();
    // Hide the loginModal
    $('#loginModal').modal('hide');
    // Make sure the login email and login password fields aren't empty
    if ($('#loginEmail').val() != '' && $('#loginPassword').val() != '') {
      // If they're not, assign a variable to hold the input field data
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      // Send authentication request to Firebase with the email and password provided by user
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function (authData) {
          // Reassign variable auth to the data returned by the Firebase authentication process (basically, so it's not null anymore)
          auth = authData;
          // Log that user is logged in
          // console.log("Successfully logged in");
        })
        .catch(function (error) { // Check for errors
          // console.log("Login Failed!", error);
          // console.log("Login Failed Code", error.code);
          // Re-show loginModal if the login failed to authenticate
          $('#loginModal').modal('show');
        });
    }
  });

  // Sign out using built-in Firebase function on click of logout button
  $('#logout').on('click', function (e) {
    // Allow default of refresh page to trigger .on('child_added') below
    // Sign user out
    firebase.auth().signOut();
    // Log that user successfully signed out
    // console.log("Succesfully signed out");
  });

  // Open the loginSignUp modal when the button is clicked
  $('#loginSignUp').on('click', function (e) {
    // Prevent default action of refreshing page
    e.preventDefault();
    // Show LogIn modal on click of login button
    $("#loginModal").modal('show');

  });

  // ====================== login end ====================== //
  // ====================== Add interest start ====================== //

  // Add "interest" on click of plus button
  $("body").on("click", ".add-button", function (event) {
    event.preventDefault();
    // Check to make sure a user is signed in by comparing the value of the variable 'auth'
    // We reassign it to the user's data when the user logs in, otherwise it stays as 'null'
    if (auth != null) {
      // Check if Interest has a price associated with it on the Yelp API response (restaurant versus general attraction)
      if ($(this).attr("data-price") == null) {
        // If the user is logged in, push/create a key (Firebase directory) with a value equal to an object of the information stored in the .add-button data attributes
        interestRef.child(auth.uid)
          .push({
            name: $(this).attr("data-biz-name"),
            phone: $(this).attr("data-biz-phone"),
            address: $(this).attr("data-biz-address"),
            businessID: $(this).attr("data-id"),
            businessCity: $(this).attr("data-city"),
            businessURL: $(this).attr("data-biz-url"),
            bizImgURL: $(this).attr("data-img-url"),
            bizCategory: $(this).attr("data-category")
          });
      }
      else {
        interestRef.child(auth.uid)
          .push({
            name: $(this).attr("data-biz-name"),
            phone: $(this).attr("data-biz-phone"),
            address: $(this).attr("data-biz-address"),
            businessID: $(this).attr("data-id"),
            businessCity: $(this).attr("data-city"),
            businessURL: $(this).attr("data-biz-url"),
            bizImgURL: $(this).attr("data-img-url"),
            bizPrice: $(this).attr("data-price"),
            bizCategory: $(this).attr("data-category")
          });
      }
    }
    // If user is not logged in, auth=null, and show them the log in modal
    else {
      $("#loginModal").modal('show');
    }
  });

  // ====================== Add interest end ====================== //
  // ====================== Append interest start ====================== //

  // When the authentication state changes, run this function to append information - * 
  firebase.auth().onAuthStateChanged(function (user) {
    // If user data exists - i.e. the user is logged in
    if (user) {
      // Reassign placeholder variable auth to equal the authentication data returned
      auth = user;
      // Change the class of the body to auth-true for reference
      $('body').removeClass('auth-false').addClass('auth-true');
      // Hide the Login/Sign Up button when user logs in
      $("#loginSignUp").hide();
      // Show the Logout button when user logs in
      $("#logout").show();
      // Pull the data of the authenticated user equal to the unique ID Google assigns when registering
      usersRef.child(user.uid).once('value').then(function (data) {
        var info = data.val();
        // * Check if user has a photo and append it
        if (user.photoUrl) {
          $('#user-info img').show();
          $('#user-info img').attr('src', user.photoUrl);
          $('#user-info').html('<span id="user-name">' + user.displayName + '</span>');
          $('#user-info #user-name').show();
        }
        // * Otherwise, check if user has a display name and append it
        else if (user.displayName) {
          $('#user-info img').hide();
          $('#user-info').html('<span id="user-name">' + user.displayName + '</span>');
        }
        // * Otherwise check if user has first name and append it
        else if (info.firstName) {
          $('#user-info img').hide();
          $('#user-info').html('<span id="user-name">' + info.firstName + '</span>');
        }
        // * Otherwise check if user has an email address and append it - user is required to have an email to authenticate so this is a 'worst case scenario'
        else if (info.email) {
          $('#user-info img').hide();
          $('#user-info').html('<span id="user-name">' + info.email + '</span>');
        }
      });
      // Reassign userID to the user's unique Google UID so it can be used later ('global' scope)
      userID = user.uid;
    }
    else {
      // No user is signed in so change body class to auth-false - not obviously useful at present, but it's a carry over from the script we based this on
      $('body').removeClass('auth-true').addClass('auth-false');
      // Hide the Logout button when user authentication fails
      $("#logout").hide();
      // Show the Login/Sign Up button when user authentication fails
      $("#loginSignUp").show();
      // Clear the <div> with id of user-name - * 
      $('#user-name').html('');
      // Reassign variable auth to null so we can reference that no one is logged in
      auth = null;
    }
  });
  // ====================== Append interest end ====================== //

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  // --------------------- index page --------------------------------------------------------------------------------
  // Toggle Sign up Modal from loginModal if not a member
  $("body").on("click", "#toggleSignUpModal", function () {
    event.preventDefault();
    // Hide loginModal
    $("#loginModal").modal('hide');
    // Show Sign Up modal on click of Sign Up link
    $("#signUpModal").modal('show');
  });

  // Toggle Log in Modal from signUpModal if already a member
  $("body").on("click", "#toggleLogInModal", function () {
    // Prevent the default action of refreshing the page
    event.preventDefault();
    // Hide loginModal
    $("#signUpModal").modal('hide');
    // Show Sign Up modal on click of Sign Up link
    $("#loginModal").modal('show');
  });

  // Call Yelp API and display results from query user inputted parameters
  $("#submit-search-form").on("click", function () {

    // show <div> with class of well when submit button is clicked
    $(".well").show();

    // Prevent the default action of refreshing the page
    event.preventDefault()

    // Assign local variables to the values the user's input (the location and category)
    var location = $("#location").val();
    var category = $("#category").val();

    // Add conditionals to make sure the most imporatant field (location) is filled
    if (location === "") {
      // Show emptyField modal
      $('#emptyField').modal('show');
    }
    else {

      // Make an AJAX call to the Yelp API with location and category as query parameters

      $.ajax({
        url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
        method: "GET",
        headers: {
          authorization: "Bearer zTc8hKel4T1UcSNchYEMflSNuuZ4B6NErA4ebwBx5NE2WCMlTAC8YOpimFb5osb45soTdnkhO0bi1841cHisFdjLD0ihQhs47ZQH6q4CfBj-wJJAZlzIa5btBYv4W3Yx",
        }
      }).then(function (response) {
        // Empty the <div> with class of well to make room for new results - better than prepending at the end because prepending puts them in opposite order of relevance
        $(".well").empty();
        // Loop through the results
        for (var i = 0; i < response.businesses.length; i++) {
          // Assign variables to hold API information
          var imgURL = response.businesses[i].image_url;
          var businessName = response.businesses[i].name;
          var businessPhone = response.businesses[i].display_phone;
          var businessCity = response.businesses[i].location.city;
          var businessAddress = response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code;
          var businessURL = response.businesses[i].url;
          var businessCategory = response.businesses[i].categories[0].title;
          var businessID = response.businesses[i].id;
          var businessLatitude = response.businesses[i].coordinates.latitude;
          var businessLongitude = response.businesses[i].coordinates.longitude;
          var businessPrice = response.businesses[i].price;

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
          leftCell.append($("<p>").attr("class", "data-biz-phone").text(businessPhone)); // cb changed this to data-biz-phone not data-phone
          // Append business address to leftCell
          leftCell.append($("<p>").attr("class", "data-biz-address").text(businessAddress));
          // Dynamically generate a table cell to append an add button to
          var rightCell = $("<td>").attr({ "width": "10%", "align": "center" });
          // Dynamically generate a button tag
          var addBtn = $("<button type='submit'>");
          // Dynamically generate a span tag
          var addSpan = $("<span>");
          // Add class to button
          addBtn.addClass("add-button");
          // Add business ID to button to add to Firebase on click of plus sign
          addBtn.attr("data-category", businessCategory);
          // Add business ID to button to add to Firebase on click of plus sign
          addBtn.attr("data-latitude", businessLatitude);
          // Add business ID to button to add to Firebase on click of plus sign
          addBtn.attr("data-longitude", businessLongitude);
          // Add business ID to button to add to Firebase on click of plus sign
          addBtn.attr("data-id", businessID);
          // Add business city to button to add to Firebase on click of plus sign
          addBtn.attr("data-city", businessCity);
          // Add business name to button to add to Firebase on click of plus sign
          addBtn.attr("data-biz-name", businessName);
          // Add business address to button to add to Firebase on click of plus sign
          addBtn.attr("data-biz-address", businessAddress);
          // Add business phone to button to add to Firebase on click of plus sign
          addBtn.attr("data-biz-phone", businessPhone);
          // Add business URL to button to add to Firebase on click of plus sign
          addBtn.attr("data-biz-url", businessURL);
          // Add imgURL to button to add to firebase on click of plus sign
          addBtn.attr("data-img-url", imgURL);
          // Add business ID to button to add to Firebase on click of plus sign
          // Check to see if business has a price associated with it before assigning an undefined value to the data-id
          if (businessPrice != null) {
            addBtn.attr("data-price", businessPrice);
          }
          // Add Bootstrap plus sign class to span
          addSpan.addClass("glyphicon glyphicon-plus-sign");
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

  // ------------------------------------ profile page ------------------------------------

  // Append firebase data to profile page
  // Create Firebase event to listen for the addition of a new 'Interest' to the database
  interestRef.on('child_added', function (firstChildSnapshot) {
    // Add conditional to only loop through the second children if the tree name matches the user's UID
    // userID defined as empty string inside document.ready function, then reassigned when the auth state changes (user logs in)
    // Limit what gets appended to only things associated with the logged in user
    if (firstChildSnapshot.key === userID) {
      firstChildSnapshot.forEach(function (secondChildSnapshot) {
        // Loop through the child folders whose names (keys) are assigned by Google Firebase upon creation
        // Their key name contains 72 bits of entropy so we don't want to attempt guess their names - we just want to loop through all of them
        // Assign variable to hold the value of the database key/value pairs for each parameter of an Interest
        var interestReturned = secondChildSnapshot.val();
        // Assign a variable to create BootStrap autolayout columns to hold HTML framework then append to page
        var newBSColDiv = $("<div class ='col-lg-12 col-md-12 col-sm-12 col-12'>"); //class ='col-lg-2 col-md-3 col-sm-6 col-12'> or "col-6 col-sm-3"
        // Assign a variable to create an anchor tag to wrap around bucket photo and title
        var newAnchor = $("<a>").attr({ "href": interestReturned.businessURL, "target": "_blank" }).html("<h3 id= 'smallerh3 " + interestReturned.businessCity + "'>" + interestReturned.name + '</h3> <p> phone: ' + interestReturned.phone + ' <br> address: ' + interestReturned.address + '<br> price: ' + interestReturned.bizPrice + ' <br> type of food:  ' + interestReturned.bizCategory + '</p><br>'); // href currently sends user to business's Yelp page
        // Assign a variable to create an img tag
        var newImg = $("<img>").attr({ "src": interestReturned.bizImgURL, "alt": interestReturned.businessCity, "class": "business-thumbnail" }); // src is currently the Yelp business page's default photo
        // Append newHtag and newImg to newAnchor
        newAnchor.prepend(newImg);
        // Append newAnchor to BootStrap Div
        newBSColDiv.append(newAnchor);
        // Append newDiv to class of buckets in container
        $(".buckets").append(newBSColDiv);
      });
    }
    else {
      // do nothing, because we don't want data that's not associated with the logged-in user's UID
    }
  });
});