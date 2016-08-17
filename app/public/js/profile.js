var currentUser = {};

  
$.ajax({
  dataType: "json",
  url:      "/users/current",
  type:     "GET",
  data:     "JSON",
  success: function(res) {
    currentUser = res;
    // console.log(res);
    if (currentUser.img) {
      $('#user-image').html('<img class="profile-user-image" src="' + currentUser.img + '" />');
    }
    if (currentUser.username) {
      $('#user-username').html('<p><strong> Userame:</strong> ' + currentUser.username + '</p>');
    }
    if (currentUser.avgscore) {
      $('#user-avgscore').html('<p><strong> My avgscore:</strong> ' + currentUser.avgscore + '</p>');
    }
    if (currentUser.fullname) {
      $('#user-fullname').html('<p><strong> Golfer: </strong> ' + currentUser.fullname + '</p>');
    }
    if (currentUser.homecourse) {
      $('#user-homecourse').html('<p><strong>My Homecourse:</strong> ' + currentUser.homecourse + '</p>');
    }
    if (currentUser.email) {
      $('#user-email').html('<p><strong>My email:</strong> ' + currentUser.email + '</p>');
    }
  },
  function (data, err) {
    //err - response object from server
    // console.log(data);
    console.log(err);
  }
});
  


