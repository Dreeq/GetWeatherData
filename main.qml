import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 400
    height: 300
    title: "Weather App"
    property int standardSpacer: 20

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
                text: "Get Temperature"
                anchors {
                    top: cityInput.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                onClicked: {
                    let cityName = cityInput.text
                    if (cityName.trim() === "") {
                        displayWeather.text = "Please enter a city name."
                        return
                    }

                    let apiKey = "4afb6b20c994a55bd3a73570d07516c6"
                    let url = "http://api.openweathermap.org/data/2.5/weather?q="
                        + cityName + "&appid=" + apiKey

                    let request = new XMLHttpRequest()
                    request.open("GET", url)
                    request.onreadystatechange = function () {
                        if (request.readyState === XMLHttpRequest.DONE) {
                            if (request.status === 200) {
                                let response = JSON.parse(request.responseText)
                                let temperature = response.main.temp - 273.15
                                let temperatureText = "Temperature in "
                                    + cityName + ": " + temperature.toFixed(
                                        2) + "°C"
                                displayWeather.text = temperatureText
                            } else {
                                console.error(
                                            "Failed to fetch data from OpenWeatherMap API.")
                            }
                        }
                    }
                    request.send()
                }
            }

            TextArea {
                id: displayWeather
                anchors {
                    top: confirmButton.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                readOnly: true
                text: ""
            }
        }
    }
}
