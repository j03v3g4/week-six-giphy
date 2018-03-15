// Function to house and run my code when the page loads
$(document).ready(function () {

    // Empty array for giphys
    var topics = []
    console.log(topics);

    // Variable for putting user input into the queryURL
    // var search = $(response.data).data("search");
    // Replace trending in queryURL when ready: search?q=" + search + "
    var queryURL = "https://api.giphy.com/v1/gifs/trending?q=&limit=10&api_key=mhgoaULVsWSutziQOiWLctWPaNKBRVrl";
    
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

    // Function to iterate through topics array to create and append buttons to html
    function displayButtons() {
        
        // Empty buttons div so that buttons don't repeat when another is added
        $("#buttons").empty();
        
        // For loop to display buttons
        for (var i = 0; i < topics.length; i++) {
            
            // Create button in html
            var button = $("<button>");

            // Add class and data attributes for putting user input into queryURL and pausing / unpausing later
            button.addClass("btn");
            button.attr("data-search", topics[i]);
            button.text(topics[i]);

            // Write buttons to html
            $("#buttons").append(button);
        }
    }

    // Function to add click event to the submit button that pushes userInput to topics array and makes a button
    $("#submit").on("click", function(event) {
        
        // Don't let the user create a blank button
        event.preventDefault();

        // Variable for new buttons
        var newButton = $("#userInput").val().trim();

        // Push to topics array
        topics.push(newButton);
        console.log(topics);

        // Clear userInput so they can enter new info
        $("#userInput").val('');

        // Rerun displayButtons to show newButton
        displayButtons();
    })


});