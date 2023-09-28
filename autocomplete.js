/**
 * Global array of cities.
 * loadCitiesFromFile() populates it and
 * updateSuggestions() uses it.
 */
let cities = [];

/**
 * Loads cities from cities500.txt to the array cities.
 */
function loadCitiesFromFile() {
  let file = Qt.resolvedUrl("qrc:Main/resources/cities500.txt");
  let fileContent = "";
  let fileReader = new XMLHttpRequest();
  fileReader.open("GET", file, false);
  fileReader.onreadystatechange = function () {
    if (
      fileReader.readyState === XMLHttpRequest.DONE &&
      fileReader.status === 200
    ) {
      fileContent = fileReader.responseText;
      cities = fileContent.split("\n");
    }
  };
  fileReader.send();
}

/**
 * Popluates suggestion ListView in main app based
 * on text input.
 * @param {string} input: Input from cityInput.
 */
function updateSuggestions(input) {
  suggestionModel.clear();
  for (let city in cities) {
    if (cities[city].toLowerCase().startsWith(input.toLowerCase())) {
      suggestionModel.append({
        modelData: cities[city],
      });
    }
  }
}
