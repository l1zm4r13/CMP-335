async function getQuote() {
    try {
        // Fetch a random quote from the Stranger Things Quotes API
        let response = await fetch("https://strangerthingsquotes.shadowdev.xyz/api/quotes/");

        // Check if the API request was successful
        if (!response.ok) {throw new Error("API request failed");}

        // Parse the JSON response
        let jsonData = await response.json();

        // Log the JSON data to the console for debugging
        console.log(jsonData);

        // Extract the quote and author from the JSON data
        let theQuote = jsonData[0].quote;
        let theAuthor = jsonData[0].author;

        // Display the quote and author on the webpage
        document.getElementById("quoteResults").innerHTML ="<h2 id='quoteText'></h2>" + "<p id='quoteAuthor'></p>";
        document.getElementById("quoteText").textContent = theQuote;
        document.getElementById("quoteAuthor").textContent = "— " + theAuthor;

    } catch (error) {
        // Display a friendly message if something goes wrong
        document.getElementById("quoteResults").innerHTML =
            "<p>Something went wrong. Please try again later.</p>";
    }
}
