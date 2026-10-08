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

    // start trying the API request
    try {
        // make the API call and store the response
        let response = await fetch(apiString);

        // check if the character was not found
        if (response.status == 404) {
            document.getElementById("characterResults").innerHTML = "<p>No Disney characters found. Please try another name.</p>";
            return false;
        }
    
        // check if the API request was successful
        if (!response.ok) {alert("Unable to retrieve Disney characters. Please try again.");
            return false;
        }

        // read the response as JSON
        let jsonData = await response.json();

        // clear the previous results
        document.getElementById("characterResults").innerHTML = "";

        // check if no characters were found
        if (!jsonData.data ||(Array.isArray(jsonData.data) && jsonData.data.length == 0)) {
            document.getElementById("characterResults").innerHTML = "<p>No Disney characters found. Please try another name.</p>";
            return false;
        }

        // check if the API returned an array of characters
        if (Array.isArray(jsonData.data)) {
            // loop through each character in the array
            for (let character of jsonData.data) {
                // store the films and TV shows
                let films = character.films;
                let tvShows = character.tvShows;

                // check if the character has any films
                if (films.length == 0) {films = "None listed";}

                // check if the character has any TV shows
                if (tvShows.length == 0) {tvShows = "None listed";}

                // display each character's name
                document.getElementById("characterResults").innerHTML += 
                    "<div class='col-12 col-md-6 col-lg-4'>" +
                        "<div class='card h-100'>" +
                            "<img src='" + character.imageUrl + "' class='card-img-top' alt='" + character.name + "'>" +
                            "<div class='card-body'>" +
                                "<h3 class='card-title'>" + character.name + "</h3>" +
                                "<p class='card-text'><strong>Films:</strong> " + films + "</p>" +
                                "<p class='card-text'><strong>TV Shows:</strong> " + tvShows + "</p>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
            }
        } else {
            // store the films and TV shows for the single character
            let films = jsonData.data.films;
            let tvShows = jsonData.data.tvShows;

            // check if the character has any films
            if (films.length == 0) {films = "None listed";}

            // check if the character has any TV shows
            if (tvShows.length == 0) {tvShows = "None listed";}

            // display the single character inside a Bootstrap card
            document.getElementById("characterResults").innerHTML +=
                "<div class='col-12 col-md-6 col-lg-4'>" +
                    "<div class='card h-100'>" +
                        "<img src='" + jsonData.data.imageUrl + "' class='card-img-top' alt='" + jsonData.data.name + "'>" +
                        "<div class='card-body'>" +
                            "<h3 class='card-title'>" + jsonData.data.name + "</h3>" +
                            "<p class='card-text'><strong>Films:</strong> " + films + "</p>" +
                            "<p class='card-text'><strong>TV Shows:</strong> " + tvShows + "</p>" +
                        "</div>" +
                    "</div>" +
                "</div>";
        }
    } catch (error) {
        // display a message if something goes wrong
        document.getElementById("characterResults").innerHTML = "<p>Something went wrong. Please check your connection and try again.</p>";
    }
}