// Use Google Maps Web Services API
let apiKey = "";

// When user submits a city
$(".submit").click(function(e) {
  // avoid reloading the page
  e.preventDefault();        
  let city = encodeURIComponent($(".address").val());
  // the message we display to our user
  let message = "";
  // sent ajax request to Google Maps API
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=" + apiKey,
    method: "GET",
    success: function(data){
      // API returns status OK if there is a result
      if (data["status"] != "OK") {
        $("message").html("The location could not be found :(");  
      } else {
        console.log(data);
        // we itterate through each piece of address data
        $.each(data["results"][0]["address_components"], function(key, value){
          // print the name of the city and country
          if(value["types"][0] == "locality") {
            message += "The city is " + value["long_name"];
          }
          if(value["types"][0] == "country") {
            message += ", " + value["long_name"] + ". ";
          }
          // print postal code if there is one
          if(value["types"][0] == "postal_code") {
            message += "The postal code is " + value["long_name"];
          }
        });
        console.log(message);
        $(".message").html(message);
      }
    }
  });
});  