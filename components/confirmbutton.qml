import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import "../js/lib/moment.min.js" as Moment
import "../js/helpers.js" as Helpers
import "../js/confirmbutton.js" as GetData

Button {
    function activate() {
        GetData.getWeaterData()
    }
}
