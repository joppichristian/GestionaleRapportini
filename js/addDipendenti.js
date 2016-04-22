var response;

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
if(getCookie('aDI')==0)
		window.location.replace("dashboard.html");
	$("#invia_dati").on("click",function(){
		addDipendente();
	});
	populateGroups();

});


function addDipendente(){
	
		if(!checkInserted())
		{
			Materialize.toast('Errore! Limite di utenze raggiunto!\n Contatta l\'amministratore per poter inserire altri utenti!', 5000);
			return false;

		}
		
		if($("#nome").val() == "" || $("#cognome").val() == ""){
			Materialize.toast('Nome e Cognome obbligatori', 2000);
			return false;
		}
		if($("#username").val() == "" || $("#password").val() == ""){
			Materialize.toast('Username e Password obbligatori', 2000);
			return false;
		}
		var nome = $("#nome").val();
		var cognome = $("#cognome").val();
		var telefono = $("#telephone").val();
		var cellulare = $("#mobile").val();
		var iban = $("#iban").val();
		var classe_pr = $("#privilegi").val();
		var codicefiscale = $("#codicefiscale").val();
		var note = $("#note").val();
		var username = $("#username").val();
		var password = $("#password").val();
		var password = SHA512(password);

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
		      'classe_pr':classe_pr,
		      'azienda':getCookie('id_azienda'),
		      'cod':codicefiscale,
		      'username':username,
		      'password':password,
		      'db':getCookie('nomeDB')

		   },
		   success: function(data){
		   		Materialize.toast('Dipendente inserito', 2000,'',function(){
			   		if(!checkInserted())
						Materialize.toast('Hai raggiunto il limite di utenze massimo!\n Contatta l\'amministratore per poter aggiungere altri utenti!', 5000,"",function(){window.location.href = 'dipendenti.html'});
						window.location.href = 'dipendenti.html'	
			   		});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});
		return false;
}


function checkInserted(){
	var result = false;
	
	$.ajax({
		url: "script_php/check_dipendenti_inseriti.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,	
	      data:{
		      'az':getCookie("id_azienda")
		   },
		  success: function(data) {
		    	if(data[0]['remained'] == 0)
		    		result = false;
		    	else result = true; 
		  },
	      error: function(data){
		     console.log(data);
	      }
    });
	return result;
}

function populateGroups(){
	$.ajax({
      dataType: "json",
      url: "script_php/getGroups.php?db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	      if(data != null){
			  for(var i=0;i<data.length;i++){
		      	$("select").append('<option value='+data[i]['id']+' class="blue-text">'+data[i]['descrizione']+'</option>');
		      }
		      $('select').material_select();

	      }
	  },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}
