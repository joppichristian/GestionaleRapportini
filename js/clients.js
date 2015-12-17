

function loaddata() {
	console.log("Debug");
   $.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getClients.php", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    console.log("Ciao");
        console.log(data);
        return false;
      },
      error: function(xhr){
	      console.log(xhr.status);
	      console.log(data);
        return false;
      }
    });
    
    //return false;
}
