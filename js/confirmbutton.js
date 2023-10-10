/**
 * Gets weather data and populates TextAreas.
 */
function getWeaterData() {
  const kelvinToCelciusSubtractor = 273.15;
  let cityName = cityInput.text;
  if (cityName.trim() === "") {
    Helpers.clearTextAreaChildrenInformation(weatherDisplayGrid);
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

        if (response.wind && response.wind.gust !== undefined) {
          wind.Gust = response.wind.gust.toFixed(2) + "m/s";
        }

        let air = {
          Humidity: response.main.humidity + "%",
          Pressure: response.main.pressure + "hPa",
          Visibility: response.visibility + "m",
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

        let countryName = response.sys.country;
        let countryArray = JSON.parse(countriesList);
        for (let country in countryArray) {
          if (response.sys.country === countryArray[country]["Code"]) {
            countryName = countryArray[country]["Name"];
          }
        }

        let general = {
          Country: countryName,
          "Local Time: ": cityTime.format("YYYY-MM-DD HH:mm:ss"),
          Sunrise: localSunriseTime.format("YYYY-MM-DD HH:mm:ss"),
          Sunset: localSunsetTime.format("YYYY-MM-DD HH:mm:ss"),
          "Timezone:": (timezoneOffset >= 0 ? "+" : "") + timezoneOffset,
        };
        let weatherTypeText = "";
        let weatherSeparator = "";
        if (response.weather.length > 1) {
          weatherSeparator = ", ";
        }
        for (let weatherType in response.weather) {
          weatherTypeText +=
            response.weather[weatherType].description + weatherSeparator;
        }

        let weather = {
          Wheather: weatherTypeText,
        };

        if (response.clouds && response.clouds.all !== undefined) {
          weather.cloudiness = response.clouds.all.toFixed(2) + "%";
        }
        if (response.rain && response.rain["1h"] !== undefined) {
          weather["Rain 1h"] = response.rain["1h"].toFixed(2) + "mm";
        }

        if (response.rain && response.rain["3h"] !== undefined) {
          weather["Rain 3h"] = response.rain["3h"].toFixed(2) + "mm";
        }

        if (response.snow && response.snow["1h"] !== undefined) {
          weather["Snow 1h"] = response.snow["1h"].toFixed(2) + "mm";
        }

        if (response.snow && response.rain["3h"] !== undefined) {
          weather["Snow 3h"] = response.snow["3h"].toFixed(2) + "mm";
        }

        let temperatureText = Helpers.appendStringFromObject(temperature);
        let windText = Helpers.appendStringFromObject(wind);
        let airText = Helpers.appendStringFromObject(air);
        let generalText = Helpers.appendStringFromObject(general);
        let weatherText = Helpers.appendStringFromObject(weather);
        displayGeneral.text = generalText;
        displayTemperature.text = temperatureText;
        displayWeather.text = weatherText;
        displayWind.text = windText;
        displayAir.text = airText;
      } else {
        Helpers.clearTextAreaChildrenInformation(weatherDisplayGrid);
        console.error("Request status:", request.status);
        if (request.status === 429) {
          console.error(
            "Failed to fetch data from OpenWeatherMap API.",
            "The free version is used for OpenWeatherApi.",
            "The limit is 60 requests per minute."
          );
          displayTemperature.text =
            "Too many requests. Please try again later.";
        } else {
          console.error(
            "Failed to fetch data from OpenWeatherMap API.",
            "The city may not be preset in the database.",
            "Is the city name spelled wrong?"
          );
          displayTemperature.text = "Could not find city in weather database.";
        }
        return;
      }
    }
  };
  request.send();
}
