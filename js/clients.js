$(document).ready(function(){
	console.log("Entro");
	$.ajax({
      dataType: "json",
      url: "../script_php/getClients.php", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
        console.log(data);
        return false;
      }
    });
    return false;
});