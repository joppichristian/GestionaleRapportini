var response;

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

	$("#invia_dati").on("click",function(){
		addMezzo();

	});
});


function addMezzo(){
		if($("#descrizione").val() == ""){
			   Materialize.toast('Descrizione Obbligatoria', 2000);
			   return false;
		}
		var descrizione = $("#descrizione").val();
		var prezzo = $("#prezzo").val();
		var costo = $("#costo").val();
		var note = $("#note").val();
		$.ajax({
	      url: "script_php/postMezzi.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note,
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){		   
		   		Materialize.toast('Mezzo inserito', 2000,'',function(){window.location.href = 'mezzi.html'});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});		
		return false;
}
