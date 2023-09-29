import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "../js/helpers.js" as Helpers

Button {
    text: "Get Weather"
    onClicked: {
        const kelvinToCelciusSubtractor = 273.15
        let cityName = cityInput.text
        if (cityName.trim() === "") {
            displayTemperature.text = "Please enter a city name."
            return
        }

        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName
            + "&appid=" + apiKey

        let request = new XMLHttpRequest()
        request.open("GET", url)
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let response = JSON.parse(request.responseText)
                    let temperature = {
                        "Temperature": (response.main.temp - kelvinToCelciusSubtractor).toFixed(
                                           2) + "°C",
                        "Feels like": (response.main.feels_like
                                       - kelvinToCelciusSubtractor).toFixed(
                                          2) + "°C",
                        "Max": (response.main.temp_max - kelvinToCelciusSubtractor).toFixed(
                                   2) + "°C",
                        "Min": (response.main.temp_min - kelvinToCelciusSubtractor).toFixed(
                                   2) + "°C"
                    }

                    let wind = {
                        "Speed": response.wind.speed.toFixed(2) + "m/s",
                        "Direction": Helpers.degreesToCardinal(
                                         response.wind.deg)
                    }
                    let air = {
                        "Humidity": response.main.humidity,
                        "Pressure": response.main.pressure,
                        "Visibility": response.visibility
                    }
                    let general = {
                        "Country": response.sys.country,
                        "Sunrise": Helpers.convertTimestamp(
                                       response.sys.sunrise),
                        "Senset": Helpers.convertTimestamp(response.sys.sunset),
                        "Timezone:": (response.timezone / 3600 >= 0 ? '+' : '')
                                     + response.timezone / 3600
                    }
                    let weatherText = ""
                    let weatherSeparator = ""
                    if (response.weather.length > 1) {
                        weatherSeparator = ", "
                    }
                    for (let weatherType in response.weather) {
                        weatherText += response.weather[weatherType].description + weatherSeparator
                    }

                    let temperatureText = Helpers.appendStringFromObject(
                            temperature)
                    let windText = Helpers.appendStringFromObject(wind)
                    let airText = Helpers.appendStringFromObject(air)
                    let generalText = Helpers.appendStringFromObject(general)
                    displayGeneral.text = generalText
                    displayTemperature.text = temperatureText
                    displayWeather.text = weatherText
                    displayWind.text = windText
                    displayAir.text = airText
                } else {
                    console.error(
                                "Failed to fetch data from OpenWeatherMap API.",
                                "Is the city name misspelled?",
                                "The free version is used for OpenWeatherApi so if it",
                                "doesn't work it can be beceause of the limit of 60 requests per minute.")
                }
            }
        }
        request.send()
    }
}
