
$(document).ready(function(){
  var lat = "";
  var long = "";
  var  urlpath = "";

  getLocation();
});

function getLocation() {
  navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
    function foundLocation(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      urlpath = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=7b55adeb0d728359168d323b4e66d693";
      loadWeatherData();
      }

    function noLocation() {
        alert('Could not find location');
    }
}

function loadWeatherData() {
      $.ajax({
      url: urlpath,
     success: function(result){
     $("#cityName").append(result.name);
     $("#tempF").append(kToF(result.main.temp));
     $("#tempC").append(kToC(result.main.temp) + "°C");
     $("#weatherType").append(result.weather[0].description);
     var newDataIcon = "";
     if(result.weather[0].id >= 200 && result.weather[0].id <= 232){
       newDataIcon = "0";
     }
     else if(result.weather[0].id >= 300 && result.weather[0].id <= 321){
       newDataIcon = "Q";
     }
     else if(result.weather[0].id >= 500 && result.weather[0].id <= 531){
       newDataIcon = "R";
     }
     else if(result.weather[0].id >= 600 && result.weather[0].id <= 622){
       newDataIcon = "W";
     }
     else if(result.weather[0].id >= 701 && result.weather[0].id <= 781){
       newDataIcon = "M";
     }
     else if(result.weather[0].id == 800){
       newDataIcon = "B";
     }
     else{
       newDataIcon = "N";
     }

     $(".weather-icon").attr('data-icon', newDataIcon);},

     error: function(){
       alert("boo");
     }
     }
     );
}

function kToC(number){
  return Math.round((number - 273) * 10)/10;
}

function kToF(number){
  return Math.round(((number * (9/5)) - 459.67) * 10)/10;
}
