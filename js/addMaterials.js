var response;

$(document).ready(function(){
	$("#invia_dati").on("click",function(){
		addMateriale();

	});
});


function addMateriale(){
		if($("#descrizione").val() == ""){
			   Materialize.toast('Descrizione Obbligatoria', 2000);
			   return false;
		}
		var descrizione = $("#descrizione").val();
		var codice = $("#codice").val();
		var prezzo = $("#prezzo").val();
		var costo = $("#costo").val();
		var note = $("#note").val();
		alert(descrizione + "," +codice + "," +prezzo + "," +costo + "," +note);
		$.ajax({
	      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/postMaterials.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'codice':codice,
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note
		   },
		   success: function(data){		   
		   		Materialize.toast('Materiale inserito', 2000,'',function(){window.location.href = 'materiali.html'});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});		
		return false;
}
