var response;

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	$("#invia_dati").on("click",function(){
		addDipendente();

	});
});


function addDipendente(){
		if($("#nome").val() == "" || $("#cognome").val() == ""){
			Materialize.toast('Nome e Cognome obbligatori', 2000);
			return false;
		}
		var nome = $("#nome").val();
		var cognome = $("#cognome").val();
		var telefono = $("#telephone").val();
		var cellulare = $("#mobile").val();
		var iban = $("#iban").val();
		var note = $("#note").val();
		
		$.ajax({
	      url: "script_php/postEmployee.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'nome': nome,
		      'cognome':cognome,
		      'telefono':telefono,
		      'cellulare':cellulare,
		      'iban':iban,
		      'note':note,
		      'db':getCookie('nomeDB')

		   },
		   success: function(data){		   
		   		Materialize.toast('Dipendente inserito', 2000,'',function(){window.location.href = 'dipendenti.html'});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});		
		return false;
}
