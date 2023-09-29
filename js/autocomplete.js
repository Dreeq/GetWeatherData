
/**
 * Popluates suggestion ListView in main app based
 * on text input.
 * @param {string} input: Input from cityInput.
 */
function updateSuggestions(input, cities) {
    suggestionModel.clear()
    for (let city in cities) {
        if (cities[city].toLowerCase().startsWith(input.toLowerCase())) {
            suggestionModel.append({
                                       "modelData": cities[city]
                                   })
        }
    }
}
