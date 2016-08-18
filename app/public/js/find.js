
var  streets = [], pointers = [], markers = [];
// Request API to get all poiners
 
$.ajax({
  dataType: "json", 
  url : "/streets",
  type: "GET",
  data: "JSON",
  success: function(res) {
    //data - response from server
    streets = res;
    console.log("ajax call terminated");
    // console.log(streets);
  },
  error: function (data, err) {
    console.log(err);
  }
});



function initMap(lat, lng, zoom) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom || 12,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
   marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map
    });
  

   var marker;

    streets.forEach(function(val, i) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(val.lat, val.lng),
        map: map,
        icon: '/img/flag.png',
        url: "/streets/render/" + val.id
      });
      console.log('marker', i);
     var infowindow = new google.maps.InfoWindow();

      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infowindow.setContent(val.name);
          infowindow.open(map, marker);
        }
      })(marker, i));


      google.maps.event.addListener(marker, 'click', function() {
        window.location.href = this.url;
      });

      // google.maps.event.addListener(marker, 'mouseover', function () {
      //   var point = fromLatLngToPoint(marker.getPosition(), map);
      //   $('#marker-tooltip').html(marker.tooltipContent + '<br>Pixel coordinates: ' + marker.position.lat() + ', ' + marker.position.lat()).css({
      //       'left': point.x,
      //           'top': point.y
      //   }).show();
      // });

      // google.maps.event.addListener(marker, 'mouseout', function () {
      //   $('#marker-tooltip').hide();
      // });

    }); 
}

function fromLatLngToPoint(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function getLatitudeLongitude(callback, address) {
  address = address || 'Boston';
  geocoder = new google.maps.Geocoder();
  if (geocoder) {
      geocoder.geocode({
        'address': address
      }, 
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            callback(results[0]);
          }
      });
  }
}

function showResult(result) {
  $('#full-address').val(result.formatted_address);
  $('#search-results').append('<p class="find-search-result"> - ' + 
    result.formatted_address  + ' - </p>');
  
  initMap(result.geometry.location.lat(), result.geometry.location.lng(), 14);
}

initMap(41.8781, -87.6298, 14);

$('#btn').on("click", function () {
  var address = $('#address').val();
  getLatitudeLongitude(showResult, address);
});
// var searchResults = [], streets = []

// function initMap(res, zoom) {
 
//   // setting the position of the first marker
//   var pos;
//   if (res) {
//     pos = new google.maps.LatLng(res.geometry.location.lat(), res.geometry.location.lng());
//     // console.log("new location")
//   } 
//     else {
//       pos = new google.maps.LatLng(43.754604, -79.374078);
//       // console.log("standart location");
//     }
  

//   streets.forEach(function(street, index) {
//     console.log(street);
//     var pos1;

//     pos1 = new google.maps.LatLng(street.lat, street.lng);
//     pointers.push(pos1);

//     var marker = new google.maps.Marker({
//         position: pos1,
//         map: map
//     });

   
//   })

//   console.log(streets)
  
//   var map = new google.maps.Map(document.getElementById('map'), {
//       center: pos,
//       zoom: zoom || 12
//   });

//   var marker = new google.maps.Marker({
//         position: pos,
//         map: map
//     });



//   marker.tooltipContent = 'The comunity name';
//   var infoWindow = new google.maps.InfoWindow({
//       content: 'This is an info window'
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//         infoWindow.open(map, marker);
//     });
  
//   google.maps.event.addListener(marker, 'mouseover', function () {
//     var point = fromLatLngToPoint(marker.getPosition(), map);
//     // console.log(point);
//     $('#marker-tooltip').html(marker.tooltipContent + '<br>Pixel coordinates: ' + marker.position.lat() + ', ' + marker.position.lat()).css({
//         'left': point.x,
//             'top': point.y
//     }).show();
//   });

//   google.maps.event.addListener(marker, 'mouseout', function () {
//       $('#marker-tooltip').hide();
//   });
// };



// function showResult(result) {
//   $('#latitude').val(result.geometry.location.lat());
//   $('#longitude').val(result.geometry.location.lng());
//   $('#full-address').val(result.formatted_address);
//   addResultToList(result);
//   initMap(result, 14, searchResults);
// }

// function addResultToList(result) {
//   searchResults.push({
//     name: result.formatted_address,
//     lat:  result.geometry.location.lat(),
//     lng:  result.geometry.location.lng()
//   });

//   $('#search-results').append('<a href="#"><p> <strong>Full address: </strong>' + 
//     result.formatted_address + ' <strong>Lat:</strong> ' + result.geometry.location.lat() + 
//     ' <strong>Lng:</strong> ' + result.geometry.location.lng() + '</p></a>');
// }


// initMap();






