$(document).ready(function(){
  $("#sez_splash").show();
  $("#sez_login").hide();
  var delay = 3000;
  setTimeout(function() { showLogin() }, delay);

});
function showLogin(){
  //$("#sez_splash").hide();
  $("#sez_splash").fadeOut(1000);
  $("#sez_login").fadeIn(2000);
  //$("#sez_login").show();
}
