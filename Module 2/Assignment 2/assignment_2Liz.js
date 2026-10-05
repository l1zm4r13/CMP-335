async function getDisneyCharacter() {

    // get the character name entered by the user
    let theCharacter = document.forms["characterForm"]["characterName"].value;

    // make sure a character name was entered
    if (theCharacter == "") {alert("Please enter a Disney character.");
        return false;
    }

    // start building the API call
    let apiString = "https://api.disneyapi.dev/character?name=";

    apiString = apiString + encodeURIComponent(theCharacter);

    // make the API call and store the response
    let response = await fetch(apiString);

    // read the response as JSON
    let jsonData = await response.json();

    // temporarily check what the Disney API returned
    console.log(jsonData);
    console.log(jsonData.data);

    // clear the previous results
    document.getElementById("characterResults").innerHTML = "";

    // check if the API returned an array of characters
    if (Array.isArray(jsonData.data)) {
        // loop through each character in the array
        for (let character of jsonData.data) {
            // temporarily check the character information
            console.log(character.name);
            console.log(character.films);
            console.log(character.tvShows);
            // display each character's name
            document.getElementById("characterResults").innerHTML +=  "<h3>" + character.name + "</h3>" +
            "<img src='" + character.imageUrl + "' alt='" + character.name + "'>" +
            "<p><strong>Films:</strong> " + character.films + "</p>" +
            "<p><strong>TV Shows:</strong> " + character.tvShows + "</p>";
        }
    } else {
        // display the single character returned by the API
        document.getElementById("characterResults").innerHTML += "<h3>" + jsonData.data.name + "</h3>" +
        "<img src='" + jsonData.data.imageUrl + "' alt='" + jsonData.data.name + "'>" +
        "<p><strong>Films:</strong> " + jsonData.data.films + "</p>" +
        "<p><strong>TV Shows:</strong> " + jsonData.data.tvShows + "</p>";;
    }
}