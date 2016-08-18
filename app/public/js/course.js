// google maps code here to render the map 
  
  function initMap(lat, lng, zoom) {
    $('#street-map').html('<div id="map"  class="map-find"></div>')
    // setting the position of the first marker
    var pos;
    if (lat && lng) {
      pos = new google.maps.LatLng(lat, lng);
      // console.log("new location")
    } 
      else {
        pos = new google.maps.LatLng(43.754604, -79.374078);
        // console.log("standart location");
      }
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: zoom || 8
    });

    var marker = new google.maps.Marker({
          position: pos,
          map: map
      });

    marker.tooltipContent = 'The comunity name';
    var infoWindow = new google.maps.InfoWindow({
        content: 'This is an info window'
    });
  };
    
  function fromLatLngToPoint(latLng, map) {
    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
  }
// End google maps code 
};


 // document.getElementById("url").innerHTML = url;

// $.ajax({
//   dataType: "json",
//   url: '/posts',
//   type: 'get',
//   data: {street_id: index},
//   success: function(res){
//     console.log("get call worked ")
//   }, 
//   error: function (data, err) {
//     console.log('error loading posts ', err)
//   }
// });


  


