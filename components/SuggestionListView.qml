import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ListView {
    id: suggestionsListView
    height: parent.height
    width: parent.width - standardSpacer
    model: suggestionModel
    header: Item {
        width: suggestionsListView.width
        height: 50
        Rectangle {
            id: headerItem
            width: parent.width
            height: parent.height
            color: "black"
            border.color: "gray"
            z: 2
            Text {
                text: "Suggestions (Click the names)"
                anchors.centerIn: parent
                color: Material.color(Material.Orange)
            }
        }
    }
    delegate: Item {
        width: suggestionsListView.width
        height: 30

        Rectangle {
            width: parent.width
            height: parent.height

            color: "black"
            border.color: "gray"
            Text {
                text: modelData
                anchors.centerIn: parent
                color: Material.color(Material.Orange)
            }

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    cityInput.text = modelData
                }
            }
        }
    }
}
