// Initial array of cars
var cars = ["Porsche", "Ferrari", "Tesla", "Range Rover"];

  // displayGiph function re-renders the HTML to display the appropriate content
  function displayGiph() {

    var car = $(this).attr("data-name");

    // will have to get the site info to see how to properly access that API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&limit=10&api_key=dc6zaTOxFJmzC";

    // Creating an AJAX call for the specific car button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response.data);
      
      //Clears all the car gifs prior to loading the new ones.
      $("#cars-view").empty();
      
      //creates a div in which to store all the car info
      var carDiv = $("<div class='car'>");

      // Allows the DOM to iterate through the array of responses given to us by the API.
       for (var l = 0; l < response.data.length; l++){
        var carData = response.data[l];
         
        // Retrieving the URL for the still image
        var imgURL = carData.images.fixed_height_still.url;
        console.log(imgURL);

        var dataStill = carData.images.fixed_height_still.url;
        var dataAnimate = carData.images.fixed_height.url;

        // Creating an element to hold the still image
        var image = $("<img>").attr({src:imgURL, still: dataStill, animate: dataAnimate, datastate: 'still', class: "gif"});
        console.log(image);
        
        //Retreiving the rating tag information for the image
        var rated = carData.rating;

        // Creating an element to have the rating displayed above the image (makes floating things easier)
        var pOne = $("<p>").text("Rating: " + rated).append("<br>").append(image);

        // Displaying the rating
        carDiv.append(pOne);

        // Putting the car gifs above the previous cars
        $("#cars-view").prepend(carDiv);
      }

      $(".gif").on("click", function() {

      var state = $(this).attr("datastate");

        if (state ==='still'){
          $(this).attr("src", $(this).attr("animate"));
          $(this).attr("datastate", "animate");
        }

        if(state ==='animate'){
          $(this).attr("src", $(this).attr("still"));
          $(this).attr("datastate", "still");
        }

      });
    });
  }

  // Function for displaying car data
  function renderButtons() {

    // Deleting the cars prior to adding new car
    $("#buttons-view").empty();

    // Looping through the array of cars
    for (var i = 0; i < cars.length; i++) {

      // Then dynamicaly generating buttons for each car in the array
      var a = $("<button>");
      // Adding a class of car to our button
      a.addClass("car");
      // Adding a data-attribute
      a.attr("data-name", cars[i]);
      // Providing the initial button text
      a.text(cars[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a car button is clicked
  $("#add-car").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var car = $("#car-input").val().trim();

    // Adding movie from the textbox to our array
    cars.push(car);

    // Calling renderButtons which handles the processing of our cars array
    renderButtons();

    // Clears the textbox
    $("#car-input").val("")
  });

  // Adding a click event listener to car buttons
  $("#buttons-view").on("click", ".car", displayGiph);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

    
