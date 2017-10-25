<?php
  // use OpenWeatherMap API
  $apiKey = "";

  $error = "";
  $weather = "";
  
  // check if the user submits a city
  if (array_key_exists("city", $_GET)) {
    // file_get_contents() reads a file into a string
    $units = $_GET["units"];
    $requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" . urlencode($_GET['city']) . "&units=" . $units . "&appid=" . $apiKey;
    $urlContents = file_get_contents($requestUrl); 
    // now we need to convert the result to array, true makes it an assoc array
    $weatherArray = json_decode($urlContents, true);
    // we need to check that we recieved a correct response
    if ($weatherArray["cod"] == 200) {
      // now we are ready to build a user friendly message
      // but first we choose whether we should use metrical or imperial units
      
      if ($units == "imperial") {
        echo $units;
        $weather = "The temperature in " . $weatherArray["name"] .  " is " . $weatherArray["main"]["temp"]. "&deg;F. The wind is " . $weatherArray["wind"]["speed"] . " m/s. The pressure is " . $weatherArray["main"]["pressure"] . " and humidity is " . $weatherArray["main"]["humidity"] . "%, " . $weatherArray["weather"][0]["description"] . ".";  
      } else {
        $weather = "The temperature in " . $weatherArray["name"] .  " is " . $weatherArray["main"]["temp"]. "&deg;C. The wind is " . $weatherArray["wind"]["speed"] . " m/s. The pressure is " . $weatherArray["main"]["pressure"] . " and humidity is " . $weatherArray["main"]["humidity"] . "%, " . $weatherArray["weather"][0]["description"] . ".";   
      }
      
    } else {
      $error = "The city could not be found :(";
    }
  }
  
?>


<!doctype html>
<html lang="en">
  <head>
    <title>How is weather</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">  
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h1>How is weather?</h1>
    
          <form>
          <span>Units</span>
           <div class="form-check form-check-inline">
             <label class="form-check-label">
               <input class="form-check-input" type="radio" name="units" value="metric">&deg;C
             </label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="units" value="imperial">&deg;F
            </label>
          </div>
            <input type="text" class="form-control" name="city" placeholder="Enter a city">
            <button type="submit" class="btn btn-primary btn-show" name="submit" value=1>Show</button>
          </form>

          <div class="message">
            <?php 
              if ($error != "") {
                echo '<div class="alert alert-danger" role="alert">' . $error . '</div>'; 
              // if use just else, then the blank alert info would be printed when app is launched
              } else if ($weather != "") {
                echo '<div class="alert alert-info" role="alert">' . $weather . '</div>';  
              }
            ?>
      </div>    
        </div>
      </div>
 
    </div>
    

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
  </body>
</html>