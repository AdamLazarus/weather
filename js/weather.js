
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
      urlpath = "https://api.forecast.io/forecast/15c542bede243bcd7698fb33d5963755/" + lat + "," + long;
      loadWeatherData();
      getCity();
      }

    function noLocation(error) {
        alert(error.message);
    }
}

function loadWeatherData() {
      $.ajax({
      url: urlpath,
      type: "POST",
      dataType: 'jsonp',
     success: function(result){
     $("#tempF").append(kToF(result.currently.temperature));
     $("#tempC").append(fToC(result.currently.temperature) + "°C");
     $("#weatherType").append(result.currently.summary);
     var skycons = new Skycons({"color": "black"});
      skycons.add("icon1", result.currently.icon);
      skycons.play();
    },

     error: function(error){
       alert(error.message);
     }
     }
     );
}

function getCity(){
  $.ajax({
  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyCIOhpHRouUCMTAeLi6OtxrrV3mdxO3w4c",
  type: "POST",
  dataType: 'json',
 success: function(result){
     $("#cityName").append(result.results[3].formatted_address);
 },

 error: function(error){
   alert(error.message);
 }
 }
 );
}

function fToC(number){
  return Math.round(((number - 32) / 1.8) * 10)/10;
}

function kToC(number){
  return Math.round((number - 273) * 10)/10;
}

function kToF(number){
  return Math.round(((number * (9/5)) - 459.67) * 10)/10;
}
