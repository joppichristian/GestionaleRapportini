$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	if(getCookie('vRR')==0)
		window.location.replace("dashboard.html");
    populateListDipendenti("");
	$('select').material_select();
	//$("#div_iva").hide();
	$("#search").on("input" , function() {
	        var tmp = $("#search").val();
	        if($("#tipologia").val() == 'd')
	        	populateListDipendenti(tmp);
	        else
				populateListClient(tmp);
	});
	$("#tipologia").on("change",function(){
		if($(this).val() == 'd')
		{
	    	populateListDipendenti("");
		}
		else if ($(this).val() == 'c')
		{
			populateListClient("");
		}
	}) ;
	
		        
});



function populateListDipendenti(filter){

	var q=filter;
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="dettaglio_rapportino_dipendente.html?id='+data[i]['id']+'" class="secondary-content"><i class="explode material-icons orange-text">call_received</i></a></div>	';


	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];

      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}


function populateListClient(filter){

	var q=filter;
	$.ajax({
      dataType: "json",
      url: "script_php/getClients.php?q="+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
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

		        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">account_circle</i>'+data[i]['nominativo']+'<a href="dettaglio_rapportino_cliente.html?id='+data[i]['id']+'&nome='+data[i]['nominativo']+'" class="secondary-content"><i class="explode material-icons orange-text">call_received</i></a></div>	';
		    	}else{
		        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">business</i>'+data[i]['nominativo']+'<a href="dettaglio_rapportino_cliente.html?id='+data[i]['id']+'&nome='+data[i]['nominativo']+'" class="secondary-content"><i class="explode material-icons orange-text">call_received</i></a></div>	';
	        }

	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];


      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}
