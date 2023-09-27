import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 400
    height: 600
    title: "Weather App"
    property int standardSpacer: 20
    property string apiKey: "4afb6b20c994a55bd3a73570d07516c6"
    property var cityNames: ["New York", "Los Angeles", "Chicago" // Add more city names here
    ]

    Item {
        anchors.fill: parent
        Rectangle {

            width: parent.width - standardSpacer
            height: parent.height - standardSpacer
            anchors.centerIn: parent

            Text {
                id: title
                text: "Weather App"
                font.pixelSize: 24
                color: "steelblue"
                font.bold: true
                anchors {
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
            }

            TextField {
                id: cityInput
                width: parent.width - standardSpacer
                anchors {
                    top: title.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                placeholderText: "Enter city name"
            }

            Button {
                id: confirmButton
                text: "Get Weather"
                anchors {
                    top: cityInput.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                onClicked: {
                    let cityName = cityInput.text
                    if (cityName.trim() === "") {
                        displayTemperature.text = "Please enter a city name."
                        return
                    }

                    let url = "http://api.openweathermap.org/data/2.5/weather?q="
                        + cityName + "&appid=" + apiKey

                    let request = new XMLHttpRequest()
                    request.open("GET", url)
                    request.onreadystatechange = function () {
                        if (request.readyState === XMLHttpRequest.DONE) {
                            if (request.status === 200) {
                                let response = JSON.parse(request.responseText)
                                let temperature = response.main.temp - 273.15
                                let weatherText = ""
                                let weatherSeparator = ""
                                if (response.weather.length > 1) {
                                    weatherSeparator = ", "
                                }
                                for (let weatherType in response.weather) {
                                    weatherText += response.weather[weatherType].description
                                            + weatherSeparator
                                }
                                let temperatureText = temperature.toFixed(
                                        2) + "°C"
                                displayTemperature.text = temperatureText
                                displayWeather.text = weatherText
                            } else {
                                console.error(
                                            "Failed to fetch data from OpenWeatherMap API.",
                                            "The free version is used for OpenWeatherApi so if it",
                                            "doesn't work it can be beceause of the limit of 60 requests per minute.")
                            }
                        }
                    }
                    request.send()
                }
            }

            TextArea {
                id: displayTemperature
                anchors {
                    top: confirmButton.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                readOnly: true
                text: ""
            }
            TextArea {
                id: displayWeather
                anchors {
                    top: displayTemperature.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                font.capitalization: Font.Capitalize
                readOnly: true
                text: ""
            }
        }
    }
}
