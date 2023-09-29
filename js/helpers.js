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
 * Adds leading zero if missing.
 * For example when create timestrings.
 * @param {Number} number
 * @returns
 */
function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}

/**
 * Converts timestamp to formatted date.
 * @param {Number} timestamp
 * @returns
 */
function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());

  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
