var json = new Array();
var index;
var id=0;

$(document).ready(function() {
	$("#start_search").click( function() {
		var tmp = $("#search").val();
		tmp = "nominativo like '%"+tmp+"%'";
		populateList(tmp);
	});
	$("#delete").click( function() {
		deleteCliente();
	});
	populateList("");
	
});


function populateList(filter){
	
	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getClients.php?q= "+ q, //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {  
	        
	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        if(data[i]['tipologia'] == 'p'){
		        elementi[i].innerHTML = '<div><i class="info small material-icons blue-text">account_circle</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="explode material-icons blue-text">call_received</i></a></div>	';  
		    }else{
		        elementi[i].innerHTML = '<div><i class="info small material-icons blue-text">business</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="explode material-icons blue-text">call_received</i></a></div>	';  
	        }
	       
	    	$("#elenco").append(elementi[i]);            
            

	    }
	    id = data[0]['id'];

		explodeClient(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];
	        explodeClient(json[index]);      
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });
    
    //return false;

}
function explodeClient(cliente){
	$("#nominativo").empty();
	$("#indirizzi").empty();
	$("#telefono").empty();
	$("#codice_fiscale").empty();
	$("#email").empty();
	$("#site").empty();
	$("#logo_cliente").empty();
	if(cliente['tipologia'] == 'p'){
		$("#logo_cliente").append('<i id="logo_cliente" class="large material-icons blue-text">account_circle</i>');
		$("#nominativo").append('<i class="info small material-icons blue-text">account_circle</i>'+cliente['nominativo']);
		if(cliente['codice_fiscale'] != null) 
			$("#codice_fiscale").append('<i class="info small material-icons blue-text">code</i>'+cliente['codice_fiscale']);
	}
	else
	{
		$("#logo_cliente").append('<i id="logo_cliente" class="large material-icons blue-text">business</i>');
		$("#nominativo").append('<i class="info small material-icons blue-text">business</i>'+cliente['nominativo']);
		if(cliente['partita_iva'] != null) 
			$("#codice_fiscale").append('<i class="info small material-icons blue-text">code</i>'+cliente['partita_iva']);
	}
	
    if(cliente['indirizzo'] != null && cliente['citta'] != null && cliente['cap'] != null && cliente['provincia'] != null)
       $("#indirizzi").append('<i class="info small material-icons blue-text">place</i>'+cliente['indirizzo']+' - '+cliente['citta']+' - '+cliente['cap']+ ' - '+cliente['provincia']);
	if(cliente['telefono'] != null) 
       $("#telefono").append('<i class="info small material-icons blue-text">phone</i>'+cliente['telefono']);
    if(cliente['email'] != null) 
       $("#email").append('<i class="info small material-icons blue-text">email</i>'+cliente['email']);
    if(cliente['codice_fiscale'] != null) 
       $("#site").append('<i class="info small material-icons blue-text">public</i>'+cliente['site']);

}

function deleteCliente(){
	alert(id);
	$.ajax({
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/deleteClient.php", //Relative or absolute path to response.php file
      type:"POST",
      data:{'id': id},
      success: function(data) {
	      populateList("");
	  },
      error: function(xhr){
	     console.log(xhr.status);
      }
    });

}