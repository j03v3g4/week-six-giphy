// Function to house and run my code when the page loads
$(document).ready(function () {

    // Global variables========================================================================================================
    // Empty array for giphys
    var topics = []

    var queryURL = "https://api.giphy.com/v1/gifs/trending?q=rainbow&limit=10&api_key=mhgoaULVsWSutziQOiWLctWPaNKBRVrl";
    console.log(queryURL);

    // AJAX function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);

        //   For loop to display search results
        for (var i = 0; i < response.data.length; i++) {

            // Get ratings
            var rating = response.data[i].rating;
            // Get still giphy
            var still = response.data[i].images.fixed_height_still.url;
            // Get animated giphy
            var animated = response.data[i].images.fixed_height.url;
            // Create div for giphys in the html
            var displayDiv = $("<div>");
            // Create image tag for giphys in the html
            var displayImg = $("<img>");
            // Create p tag for ratings in the html
            var displayRating = $("<p>").text("Rating: " + rating);

            // Add class and data attributes for pausing / unpausing later
            displayImg.addClass("giphy");
            displayImg.attr("data-state", "still");
            displayImg.attr("src", still);
            displayImg.attr("data-still", still);
            displayImg.attr("data-animate", animated);

            // Write everything to the html
            $("#giphys").prepend(displayDiv);
            displayDiv.append(displayImg);
            displayDiv.append(displayRating);
        }
    });
});