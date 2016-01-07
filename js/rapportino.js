$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
    populateListDipendenti("");
	$('select').material_select();
	//$("#div_iva").hide();
	$("#tipologia").on("change",function(){
		if($(this).val() == 'd')
		{
			//$("#label_nominativo").text( "Nominativo");
      //per nascondere campo
      //$("#div_iva").hide();
      $("#start_search").click( function() {
        var tmp = $("#search").val();
        tmp = "nome like '%"+tmp+"%' or cognome like '%"+tmp+"%' ";
        populateListDipendenti(tmp);
      });

      	populateListDipendenti("");

      //$("#icon_prefix").text("account_circle");
		}
		else if ($(this).val() == 'c')
		{
      $("#start_search").click( function() {
    		var tmp = $("#search").val();
    		tmp = "nominativo like '%"+tmp+"%'";
    		populateListClient(tmp);
    	});
      populateListClient("");

			//$("#label_nominativo").text("Ragione Sociale");
      //per vedere campo
      //$("#div_iva").show();
			//$("#icon_prefix").text("business");
		}
	}) ;
	/*$("#invia_dati").on("click",function(){
		//addCliente();

	});*/
});



function populateListDipendenti(filter){

	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getEmployee.php?q= "+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div><i class="info small material-icons green-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="dettaglio_rapportino.html" class="secondary-content"><i class="explode material-icons green-text">call_received</i></a></div>	';


	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];

		explodeDipendente(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];
	        explodeDipendente(json[index]);
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}


function populateListClient(filter){

	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getClients.php?q= "+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
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
		        elementi[i].innerHTML = '<div><i class="info small material-icons blue-text">account_circle</i>'+data[i]['nominativo']+'<a href="dettaglio_rapportino.html" class="secondary-content"><i class="explode material-icons blue-text">call_received</i></a></div>	';
		    }else{
		        elementi[i].innerHTML = '<div><i class="info small material-icons blue-text">business</i>'+data[i]['nominativo']+'<a href="dettaglio_rapportino.html" class="secondary-content"><i class="explode material-icons blue-text">call_received</i></a></div>	';
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
