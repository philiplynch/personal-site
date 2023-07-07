function getClosestGameStop() {
    var latLng = new google.maps.LatLng(47.532927, -100.362007);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': '1221 Main St W, Hazen, ND 58545'}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var closestStore = results[0].geometry.location;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: closestStore,
          zoom: 10
        });
        var marker = new google.maps.Marker({
          position: closestStore,
          map: map
        });
      } else {
        console.log('Geocode failed: ' + status);
      }
    });
  }
  
  window.onload = getClosestGameStop;
  