var json_clienti = new Array();
$(document).ready(function(){
	populateLists("");	
})

function populateLists(filter){
	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getClients.php?q=", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_clienti = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        if(data[i]['tipologia'] == 'p'){
		        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">account_circle</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="explode material-icons purple-text">call_received</i></a></div>	';
		    }else{
		        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">business</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="explode material-icons purple-text">call_received</i></a></div>	';
	        }

	    	$("#elenco_clienti").append(elementi[i]);


	    	}
		}
	});
}