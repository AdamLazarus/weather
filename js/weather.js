function getWeather(){
 $.ajax({
 url: "http://api.openweathermap.org/data/2.5/weather?lat=23.9218389&lon=120.6457898&APPID=7b55adeb0d728359168d323b4e66d693",
success: function(result){
$("#cityName").append(result.name);
$("#tempF").append(kToF(result.main.temp));
$("#tempC").append(kToC(result.main.temp));
$("#weatherType").append(result.weather[0].description)},

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
