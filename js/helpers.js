/**
 * Converts degrees to wind directions.
 * @param {Number} windDegrees
 * @returns
 */
function degreesToCardinal(windDegrees) {
  windDegrees = (windDegrees + 360) % 360;
  const directions = [
    "North",
    "North-Northeast",
    "Northeast",
    "East-Northeast",
    "East",
    "East-Southeast",
    "Southeast",
    "South-Southeast",
    "South",
    "South-Southwest",
    "Southwest",
    "West-Southwest",
    "West",
    "West-Northwest",
    "Northwest",
    "North-Northwest",
  ];
  const index = Math.round(windDegrees / 22.5);
  return directions[index % 16];
}

/**
 * Appends strings with keys and values from object.
 * @param {*} inputObject Object containing data.
 * @returns Appended string.
 */
function appendStringFromObject(inputObject) {
  let returnString = "";
  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const value = inputObject[key];

      returnString += key + ": " + value + "\n";
    }
  }
  return returnString;
}

/**
 * Converts time to localtime by given offset.
 * @param {object} timeObject Moment object
 * @param {Number} timeOffset Time offset from utc.
 * @returns
 */
function getLocalTimeFromUtc(timeObject, timeOffset) {
  if (timeOffset < 0) {
    timeObject = timeObject.subtract(Math.abs(timeOffset), "hours");
  } else if (timeOffset > 0) {
    timeObject = timeObject.add(timeOffset, "hours");
  }
  return timeObject;
}

/**
 * Clear text areas inside of an QML item.
 * @param {*} parentItem, Item containing text areas to be cleared.
 */
function clearTextAreaChildrenInformation(parentItem) {
  for (let item of parentItem.children) {
    if (item instanceof TextArea) {
      item.text = "";
    }
  }
}
