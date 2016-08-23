// Get City and Current Temp
var weather = new XMLHttpRequest();
weather.open("GET", "http://api.wunderground.com/api/7477a71c0cd8752e/conditions/q/Canada/Toronto.json", false);
weather.send(null);

var r = JSON.parse(weather.response).current_observation;
var city = r.display_location.city + "  ";
var temp = r.temp_c + "&deg;";
var cityTemp = city + temp;

// Display City and Current Temp
document.getElementById("cityTemp").innerHTML = cityTemp;

// Get 5 Day Forecast Info
var forecast = new XMLHttpRequest();
forecast.open("GET", "http://api.wunderground.com/api/7477a71c0cd8752e/forecast10day/q/Canada/Toronto.json", false);
forecast.send(null);

var d = JSON.parse(forecast.response).forecast.simpleforecast.forecastday;
var numOfDays = document.querySelectorAll(".day");
var dayImg = new Array();
var dayHigh = new Array();
var dayLow = new Array();
var day = new Array();

for (var i = 0; i < numOfDays.length; i++) {
	dayImg[i] = d[i].icon;
	dayHigh[i] = d[i].high.celsius + "&deg;";
	dayLow[i] = d[i].low.celsius + "&deg;";

	if (dayImg[0] === "partlycloudy" || dayImg[0] === "nt_partlycloudy" || dayImg[0] === "partlysunny" || dayImg[0] === "nt_partlysunny") {
		document.body.style.background = "url(img/partlycloudy.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "chancetstorms" || dayImg[0] === "nt_chancetstorms" || dayImg[0] === "tstorms" || dayImg[0] === "nt_tstorms") {
		document.body.style.background = "url(img/chancetstorms.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "cloudy" || dayImg[0] === "nt_cloudy" || dayImg[0] === "mostlycloudy" || dayImg[0] === "nt_mostlycloudy") {
		document.body.style.background = "url(img/cloudy.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "snow" || dayImg[0] === "nt_snow" || dayImg[0] === "chancesnow" || dayImg[0] === "nt_chancesnow") {
		document.body.style.background = "url(img/snowy.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "flurries" || dayImg[0] === "nt_flurries" || dayImg[0] === "chanceflurries" || dayImg[0] === "nt_chanceflurries") {
		document.body.style.background = "url(img/flurries.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "rain" || dayImg[0] === "nt_rain" || dayImg[0] === "chancerain" || dayImg[0] === "nt_chancerain") {
		document.body.style.background = "url(img/rainy.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "sleet" || dayImg[0] === "nt_sleet" || dayImg[0] === "chancesleet" || dayImg[0] === "nt_chancesleet") {
		document.body.style.background = "url(img/sleet.jpg) no-repeat center center fixed";
	} else if (dayImg[0] === "fog" || dayImg[0] === "nt_fog" || dayImg[0] === "hazy" || dayImg[0] === "nt_hazy") {
		document.body.style.background = "url(img/foggy.jpg) no-repeat center center fixed";
	}
	var url = "http://icons.wxug.com/i/c/j/";
	dayImg[i] = url + dayImg[i] + ".png";

	document.getElementById("dayImg" + i).src = dayImg[i];
	document.getElementById("dayHigh" + i).innerHTML = dayHigh[i];
	document.getElementById("dayLow" + i).innerHTML = dayLow[i];
}

for (var i = 2; i < 5; i++) {
	day[i] = d[i].date.weekday;
	document.getElementById("day" + i).innerHTML = day[i].toLowerCase();
}


// Get Hourly Info for Today
var hourly = new XMLHttpRequest();
hourly.open("GET", "http://api.wunderground.com/api/7477a71c0cd8752e/hourly10day/q/Canada/Toronto.json", false);
hourly.send(null);

var h = JSON.parse(hourly.response).hourly_forecast;
var numOfHours = document.querySelectorAll(".todayHour");
var todayHour = new Array();
var todayHourImg = new Array();
var todayHourTemp = new Array();

for (var i = 0; i < numOfHours.length; i++) {
	var ampm = h[i].FCTTIME.ampm;
	var icon = h[i].icon;

	todayHour[i] = h[i].FCTTIME.hour;
	if (ampm === "PM" && todayHour[i] !== "12") {
		todayHour[i] = parseInt(todayHour[i]) - 12;
	} else if (ampm === "AM" && todayHour[i] === "0") {
		todayHour[i] = parseInt(todayHour[i]) + 12;
	}
	todayHour[i] = todayHour[i].toString() + h[i].FCTTIME.ampm;

	todayHourImg[i] = h[i].icon;
	var url = "http://icons.wxug.com/i/c/j/";
	todayHourImg[i] = url + todayHourImg[i] + ".png";
	todayHourTemp[i] = h[i].temp.metric + "&deg;";

	document.getElementById("todayHour" + i).innerHTML = todayHour[i];
	document.getElementById("todayHourImg" + i).src = todayHourImg[i];
	document.getElementById("todayHourTemp" + i).innerHTML = todayHourTemp[i];
}