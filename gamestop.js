var closestStore;

function getClosestGameStop() {
  var latLng = new google.maps.LatLng(47.532927, -100.362007);
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': '1221 Main St W, Hazen, ND 58545'}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      closestStore = results[0].geometry.location;
    } else {
      console.log('Geocode failed: ' + status);
    }
  });
}

window.onload = getClosestGameStop;

function displayClosestGameStop() {
    if (closestStore) {
      var address = results[0].formatted_address;
      document.getElementById('closestStore').innerHTML = address;
    } else {
      document.getElementById('closestStore').innerHTML = 'No GameStop stores found.';
    }
  }
  
