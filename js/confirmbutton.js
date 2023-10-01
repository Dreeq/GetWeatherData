/**
 * Gets weather data and populates TextAreas.
 */
function getWeaterData() {
  const kelvinToCelciusSubtractor = 273.15;
  let cityName = cityInput.text;
  if (cityName.trim() === "") {
    displayTemperature.text = "Please enter a city name.";
    return;
  }

  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let response = JSON.parse(request.responseText);
        let temperature = {
          Temperature:
            (response.main.temp - kelvinToCelciusSubtractor).toFixed(2) + "°C",
          "Feels like":
            (response.main.feels_like - kelvinToCelciusSubtractor).toFixed(2) +
            "°C",
          Max:
            (response.main.temp_max - kelvinToCelciusSubtractor).toFixed(2) +
            "°C",
          Min:
            (response.main.temp_min - kelvinToCelciusSubtractor).toFixed(2) +
            "°C",
        };

        let wind = {
          "Wind Speed": response.wind.speed.toFixed(2) + "m/s",
          Direction: Helpers.degreesToCardinal(response.wind.deg),
        };
        let air = {
          Humidity: response.main.humidity,
          Pressure: response.main.pressure,
          Visibility: response.visibility,
        };

        let timezoneOffset = response.timezone / 3600;
        let currentUtcTime = moment.utc();
        let cityTime = currentUtcTime.add(timezoneOffset, "hours");
        let sunriseObject = moment(response.sys.sunrise * 1000).utc();
        let sunsetObject = moment(response.sys.sunset * 1000).utc();

        let localSunriseTime = Helpers.getLocalTimeFromUtc(
          sunriseObject,
          timezoneOffset
        );
        let localSunsetTime = Helpers.getLocalTimeFromUtc(
          sunsetObject,
          timezoneOffset
        );

        let general = {
          Country: response.sys.country,
          "Local Time: ": cityTime.format("YYYY-MM-DD HH:mm:ss"),
          Sunrise: localSunriseTime.format("YYYY-MM-DD HH:mm:ss"),
          Sunset: localSunsetTime.format("YYYY-MM-DD HH:mm:ss"),
          "Timezone:": (timezoneOffset >= 0 ? "+" : "") + timezoneOffset,
        };
        let weatherText = "Weather: ";
        let weatherSeparator = "";
        if (response.weather.length > 1) {
          weatherSeparator = ", ";
        }
        for (let weatherType in response.weather) {
          weatherText +=
            response.weather[weatherType].description + weatherSeparator;
        }

        let temperatureText = Helpers.appendStringFromObject(temperature);
        let windText = Helpers.appendStringFromObject(wind);
        let airText = Helpers.appendStringFromObject(air);
        let generalText = Helpers.appendStringFromObject(general);
        displayGeneral.text = generalText;
        displayTemperature.text = temperatureText;
        displayWeather.text = weatherText;
        displayWind.text = windText;
        displayAir.text = airText;
      } else {
        console.error(
          "Failed to fetch data from OpenWeatherMap API.",
          "It can be that the city is not preset in the database.",
          "Is the city name misspelled?",
          "The free version is used for OpenWeatherApi so if it",
          "doesn't work it can be beceause of the limit of 60 requests per minute."
        );
      }
    }
  };
  request.send();
}
