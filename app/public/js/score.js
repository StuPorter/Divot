var scores = {};

.ajax({
  dataType: "json",
  url : "/scores",
  type: "GET",
  data: "JSON",
  success: function(res) {
    //data - response from server
    scores = res;
    scores.forEach(function(score, index) {
$('#score-list-row').append('<a href="/scores/render/' + course.id + '"> <div class="profile-course-result"> <img src="' + course.img + '" /> <ul><li> <strong>Name:</strong>' + course.name + '</li><li> <strong>Location:</strong>' + course.location + '</li><br /></div></a>')    })
  },
  error: function (data, err) {
    console.log(err);
  }
});
