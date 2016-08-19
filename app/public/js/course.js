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
 

var course;
var url = $(location).attr('href');
url = url.split('/');
var index = parseInt(url[url.length - 1]);
// console.log(index)

initMap();

$.ajax({
  dataType: "json", 
  url : "/courses/" + index,
  type: "GET",
  success: function(res) {
    //data - response from server
    course = res;
    if (course.img) {
      $('#course-image').html('<img class="profile-user-image" src="' + course.img + '" />');
    }
    if (course.name) {
      $('#course-name').html('<p ><strong>Course name:</strong> ' +  course.name + '</p>')
    }
    if (course.location) {
      $('#course-location').html('<p ><strong>Location:</strong> ' +  course.location + '</p>')
    }
    if (course.difficulty) {
      $('#course-difficulty').html('<p ><strong>Difficulty :</strong> ' + course.difficulty + '</p>')
    }
    if (course.about) {
      $('#course-about').html('<p ><strong>Course Review:</strong> ' + course.about + '</p>')
    }
    initMap(street.lat, street.lng, 15);
  },
  error: function (data, err) {
    console.log('error loading courses', err);
  }
});






$('#street-new-post-btn').click(function() {
  var postAuthor = $('#street-post-author').val(),
      postText   = $('#street-post-text').val();
      console.log('Click');
  $("#street-post-results").append('<p><strong>@' + postAuthor + ':</strong>&nbsp;' + postText + '</p>');
    

});




