var scores = {};

$.ajax({
  dataType: "json",
  url : "/scores",
  type: "GET",
  data: "JSON",
  success: function(res) {
    scores = res;
    scores.forEach(function(score, index) {
$('#score-list-row').append('<a href="/scores/render/' + score.id + '"> <ul><li> <strong>Date:</strong>' + score.date + '</li><li> <strong>Name:</strong>' + score.coursename + '</li><li> <strong>Location:</strong>' + score.shot + '</li></ul><br /></div></a>')
// $('body').append(score.name + " was plaed and the score was " + score.shot + "<hr><br>");
   })
  },
  error: function (data, err) {
    console.log(err);
  }
});
