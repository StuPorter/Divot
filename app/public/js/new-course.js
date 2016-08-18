console.log("linked");

var searchResults = [],
    ajaxObj       = {},
    foundAddress  = false;

function initMap(res, zoom) {
  // setting the position of the first marker
  var pos;
  if (res) {
    pos = new google.maps.LatLng(res.geometry.location.lat(), res.geometry.location.lng());
  } 
    else {
      pos = new google.maps.LatLng(41.8781, -87.6298);
    }
  
  var map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: zoom || 10
  });

  var marker = new google.maps.Marker({
        position: pos,
        map: map
  });
};

function fromLatLngToPoint(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function showResult(result) {
  // $('#latitude').val(result.geometry.location.lat());
  ajaxObj.lat = result.geometry.location.lat();
  // $('#longitude').val(result.geometry.location.lng());
  ajaxObj.lng = result.geometry.location.lng();
  ajaxObj.address = result.formatted_address;
  foundAddress = true;
  $('#full-address').val(result.formatted_address);
  console.log(ajaxObj);
  initMap(result, 14);
}

function getLatitudeLongitude(callback, address) {
  // If adress is not supplied, use default value 'Chicago'
  address = address || 'Chicago, IL';
  // Initialize the Geocoder
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

$('#btn').on("click", function () {
  var address = $('#address').val();
  getLatitudeLongitude(showResult, address);
});

$('#submit-btn').click(function(e) {
  ajaxObj.name  = $('#street-name').val();
  ajaxObj.img   = $('#street-image').val();
  ajaxObj.about = $('#street-about').val();
  // console.log('_________________________');
  // console.log('Starting request ');

  $.ajax({
    url : "/courses/new",
    type: "POST",
    data : ajaxObj,
    success: function(data) {
      console.log(data);
    },
    error: function (data, err) {
      console.log(data);
      console.log(err);
    }
  });
});
