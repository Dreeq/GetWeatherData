import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "components"
import "js/autocomplete.js" as AutoComplete

ApplicationWindow {
    visible: true
    width: 1024
    height: 800
    title: "Weather App"
    color: "black"
    property int standardSpacer: 20
    property string apiKey: "4afb6b20c994a55bd3a73570d07516c6"

    Item {
        anchors.fill: parent
        Rectangle {
            color: "black"
            width: parent.width - standardSpacer
            height: parent.height - standardSpacer
            anchors.centerIn: parent
            Text {
                id: title
                text: "Weather App"
                font.pixelSize: 24
                font.bold: true
                font.family: "Roboto"
                color: Material.color(Material.Orange)
                z: 3
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
                enabled: true
                placeholderText: "Enter city name"
                onTextChanged: {
                    AutoComplete.updateSuggestions(cityInput.text, citiesList)
                }
                Keys.onReturnPressed: confirmButton.activate()
            }
            SuggestionListView {
                anchors {
                    top: weatherDisplayGrid.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
            }
            ListModel {
                id: suggestionModel
            }

            ConfirmButton {
                id: confirmButton
                text: "Get Weather"
                anchors {
                    top: cityInput.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                onClicked: confirmButton.activate()
            }
            GridLayout {
                id: weatherDisplayGrid
                columns: 3
                anchors {
                    top: confirmButton.bottom
                    horizontalCenter: parent.horizontalCenter
                    topMargin: standardSpacer
                }
                TextArea {
                    id: displayGeneral
                    font.capitalization: Font.Capitalize
                    readOnly: true
                    text: ""
                }

                TextArea {
                    id: displayTemperature
                    readOnly: true
                    text: ""
                }
                TextArea {
                    id: displayWeather
                    font.capitalization: Font.Capitalize
                    readOnly: true
                    text: ""
                }
                TextArea {
                    id: displayWind
                    font.capitalization: Font.Capitalize
                    readOnly: true
                    text: ""
                }
                TextArea {
                    id: displayAir
                    font.capitalization: Font.Capitalize
                    readOnly: true
                    text: ""
                }
            }
        }
    }
}
