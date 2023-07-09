// Import the Google Maps API.
const google = require("google-maps");

// Create a function that takes a search term and a location as input, and returns a list of Staples locations in that location.
function findLocations(searchTerm, location) {
  // Create a Google Maps Geocoder object.
  const geocoder = new google.maps.Geocoder();

  // Get the latitude and longitude of the location.
  const latLng = geocoder.geocode(location)[0].geometry.location;

  // Create a Google Maps Places Service object.
  const placesService = new google.maps.places.PlacesService();

  // Create a request object that specifies the search terms and the radius.
  const request = {
    query: searchTerm,
  };

  // Call the PlacesService.searchPlaces() method to get a list of places that match the search terms.
  placesService.searchPlaces(request, (results) => {
    // Loop through the results and find all instances where the place is a Staples location.
    const matchingLocations = results.filter((result) => {
      return result.types.includes("store");
    });

    // Display the list of matching locations as text.
    document.getElementById("results").innerHTML = matchingLocations
      .map((result) => result.name)
      .join("\n");
  });
}

// Get the search term and location from the HTML page.
const searchTerm = document.getElementById("searchTerm").value;
const location = document.getElementById("location").value;

// Create a Google Maps Autocomplete object.
const autocomplete = new google.maps.places.Autocomplete(
  document.getElementById("location"),
);

// Set the bounds of the autocomplete object to Newfoundland.
autocomplete.setBounds(new google.maps.LatLngBounds(
  [47.1023, -53.7116],
  [52.2787, -36.8207],
));

// When the user types in the location field, get suggestions from the Google Maps API.
autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();

  // If the user has selected a place, set the location field to the place's name.
  if (place) {
    document.getElementById("location").value = place.name;
  }
});
