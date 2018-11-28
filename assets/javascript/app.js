$(document).ready(function () {

    // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
    // jQuery.ajaxPrefilter(function (options) {
    //   if (options.crossDomain && jQuery.support.cors) {
    //     options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    //   }
    // });

    $(".yelp").on("submit", function () {


    //   //Will stop the page from refreshing so we can grab the values input by the user
    //   event.preventDefault()

    //   // grab a hold of the values the users input (the location and category)
    //   var location = $("#location").val();
    //   var category = $("#category").val();

    //   // Console.log() the values and see if they match what you entered into the form.
    //   console.log(location);
    //   console.log(category);

    //   // Make an AJAX call to the Yelp API based on your research. 
    //   // Try and get a response back that returns a series of business fitting 
    //   // within a specified location and category.

    //   $.ajax({
    //     url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
    //     method: "GET",
    //     headers: {
    //       authorization: "Bearer zTc8hKel4T1UcSNchYEMflSNuuZ4B6NErA4ebwBx5NE2WCMlTAC8YOpimFb5osb45soTdnkhO0bi1841cHisFdjLD0ihQhs47ZQH6q4CfBj-wJJAZlzIa5btBYv4W3Yx",
    //     }
    //   }).then(function (response) {
    //     console.log(response)


    //     for (var i = 0; i < response.businesses.length; i++) {

    //       // Now that we're able to get the information we want, it's time to render it to the page.
    //       $(".container").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">'+response.businesses[i].display_phone+'</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
    //       }
    //   });
    // });

$.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyBQHbqilN4MFV6-QYxw3-Xay9BJbPBZvt8")
.then(function (response){
console.log(response)
})
.catch(function (error){
    console.log(error)
})

    });
});
