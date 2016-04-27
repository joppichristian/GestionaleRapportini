var json = new Array();
var rapp = new Array();
var index=0;
var id=0;
var gruppo;
var username;
var old_username;

$(document).ready(function() {
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");


	if(getCookie("cDI")==0){
		$("#cDI").hide();
		$("#cDI2").hide();
	}
	else{
		$("#cDI").show();
		$("#cDI2").show();
	}
	if(getCookie("aDI")==0){
		$("#aDI").hide();
		$("#aDI2").hide();
	}
	else{
		$("#aDI").show();
		$("#aDI2").show();
	}
	if(getCookie("mDI")==0){
		$("#mDI").hide();
		$("#mDI2").hide();
	}
	else{
		$("#mDI").show();
		$("#mDI2").show();
	}

	$('ul.tabs').tabs();
	$('div.indicator').css("background-color","#4caf50");
	$("#info").show();
	$("#modifica_dipendente").hide();
	$("#search").on('input',function() {
		var tmp = $("#search").val();
		populateList(tmp);
	});
	$("#modify").click( function() {
		completaForm();
	});
	$("#modify2").click( function() {
		completaForm();
	});
	$("#modify_pr").click( function() {
		completaForm();
	});
	$("#invia_dati").click( function() {
		modifyDipendente();
	});
	$("#annulla_modify").click( function() {
		explodeDipendente(json[0]);
	});
	$("#delete").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#delete2").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#delete_pr").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#yes").click(function(){
		$("#modal_cancellazione").closeModal();
		deleteCheck();
	});
	$("#no").click(function(){
		$("#modal_cancellazione").closeModal();
	});
	$("#reset_pwd").click(function(){
		resetPwd();
	});

	
	
	populateList("");

});


function populateList(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ filter+"&db="+getCookie('nomeDB')+"&all=0", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div class="explode"><i class="info small material-icons green-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="#!" class="secondary-content"><i class="material-icons green-text">call_received</i></a></div>	';


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
function explodeDipendente(dipendente){
	$("#menu").show();
	$('ul.tabs').tabs();
	$('div.indicator').css("background-color","#4caf50");
	$("#link_anagrafica").click();
	$("#modifica_dipendente").hide();
	$("#info").show();
	$("#nominativo").empty();
	$("#telefono").empty();
	$("#cellulare").empty();
	$("#iban").empty();
	$("#note").empty();
	$("#logo_dipendente").empty();
	$("#username").empty();
	$("#gruppo_privilegi").empty();
	$("#logo_dipendente").append('<i id="logo_dipendente" class="large material-icons green-text">directions_walk</i>');
	$("#nominativo").append('<div class="green-text" style="margin-left:15%;">Nominativo </div><i class="info small material-icons green-text">account_circle</i> '+dipendente['nome']+ ' '+ dipendente['cognome']);
	if(dipendente['telefono'] != null && dipendente['telefono'] != "")
       $("#telefono").append('<div class="green-text" style="margin-left:15%;">Telefono </div><i class="info small material-icons green-text">phone</i>'+dipendente['telefono']);
	if(dipendente['cellulare'] != null && dipendente['cellulare'] != "")
       $("#cellulare").append('<div class="green-text" style="margin-left:15%;">Cellulare </div><i class="info small material-icons green-text">phone_iphone</i>'+dipendente['cellulare']);
    if(dipendente['iban'] != null && dipendente['iban'] != "")
       $("#iban").append('<div class="green-text" style="margin-left:15%;">IBAN </div> <i class="info small material-icons green-text">credit_card</i>'+dipendente['iban']);
    if(dipendente['note'] != null && dipendente['note'] != "")
       $("#note").append('<div class="green-text" style="margin-left:15%;">Note </div><i class="info small material-icons green-text">chat_bubble</i>'+dipendente['note']);


	$.ajax({
      dataType: "json",
      url: "script_php/getUserInfo.php?id="+dipendente['id']+"&azienda="+getCookie('id_azienda'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	  	$("#username").append('<div class="green-text" style="margin-left:15%;">Username </div><i class="info small material-icons green-text">person</i>'+data[0]['username']);
	  	gruppo = data[0]['classe_privilegi'];
	  	username = data[0]['username'];
	  },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

	$.ajax({
      dataType: "json",
      url: "script_php/getGroups.php?db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	  	for(var i=0;i<data.length;i++)
	  		if(data[i]['id']== gruppo){
	  		    $("#gruppo_privilegi").append('<div class="green-text" style="margin-left:15%;">Gruppo di Appartenenza </div><i class="info small material-icons green-text">style</i>'+data[i]['descrizione']);
	  		    	return true;
	  		}

	  },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}

function deleteCheck(){
	if(getCookie("cDI")==0)
		return;
	
	$.ajax({
		url: "script_php/check.php", //Relative or absolute path to response.php file
	      type:"POST",	
	      data:{
		      'slVLS': "rapportini.id",
		      'tb1': "dipendenti",
		      'tb2':"rapportini",
		      'fl1':"dipendenti.id",
		      'fl2':"id_dipendente",
		      'WH':"dipendenti.id = " + id,
		      'db':getCookie('nomeDB')
		   },
		  success: function(data) {
		    rapp = data;
		    if(data == null){
			    deleteDipendente();
		    }
		    else{
			    disableDipendente();
		    }
		  
		    
		  },
	      error: function(data){
		     console.log(data);
	      }
    });

}
function deleteRapportino(){
	for(var i=0;i<rapp.length;i++)
			$.ajax({
				url: "script_php/deleteRapportino.php", //Relative or absolute path to response.php file
				type:"POST",
						      data:{'id': rapp[i]['id'],'db':getCookie('nomeDB')},
						      success: function(data) {
							  },
						      error: function(xhr){
							     console.log(xhr.status);
						      }
				    });
}


function deleteDipendente(){
	if(getCookie("cDI")==0)
		return;
					$.ajax({
				      url: "script_php/deleteEmployee.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id,'db':getCookie('nomeDB'),'azienda':getCookie("id_azienda")},
				      success: function(data) {
					      Materialize.toast('Dipendente eliminato', 2000);
					      populateList("");
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });

}

function disableDipendente(){
	if(getCookie("cDI")==0)
		return;
					$.ajax({
				      url: "script_php/disableEmployee.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id,'db':getCookie('nomeDB'),'azienda':getCookie("id_azienda")},
				      success: function(data) {
					      Materialize.toast('Dipendente eliminato. Il suo storico rapportini viene comunque mantenuto!', 2000);
					      populateList("");
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });

}


function completaForm(){
	$("#rules").hide();
	$("#menu").hide();
	$("#modifica_dipendente").show();
	$("#info").hide();
	$("#form_nome").val(json[index]['nome']);
	$("#form_cognome").val(json[index]['cognome']);
	$("#form_cognome").focus();
	$("#form_telephone").val(json[index]['telefono']);
	$("#form_telephone").focus();
	$("#form_mobile").val(json[index]['cellulare']);
	$("#form_mobile").focus();
	$("#form_iban").val(json[index]['iban']);
	$("#form_iban").focus();
	$("#form_note").val(json[index]['note']);
	$("#form_note").focus();
	$("#form_username").val(username);
	$("#form_username").focus();
	$("#form_nome").focus();
	old_username = $("#form_username").val();
	populateGroups();
}
function modifyDipendente(){
	var nome = $("#form_nome").val();
	var cognome = $("#form_cognome").val();
	var telefono = $("#form_telephone").val();
	var cellulare = $("#form_mobile").val();
	var codicefiscale = $("#codicefiscale").val();

	var iban = $("#form_iban").val();
	var note = $("#form_note").val();
	var user = $("#form_username").val();
	
	
	if(!checkUsernameInserted(user) && old_username != user)
		{
			Materialize.toast('Errore! Username gi&agrave; utilizzato!', 5000);
			return false;

		}
	
	var classe=$("select").val();
	$.ajax({
	     url: "script_php/updateEmployee.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'nome': nome,
		      'cognome':cognome,
		      'telefono':telefono,
		      'cellulare':cellulare,
		      'iban':iban,
		      'note':note,
		      'cod': codicefiscale,
		      'id':json[index]['id'],
		      'username':user,
		      'classe':classe,
		      'db':getCookie('nomeDB'),
		      'azienda':getCookie('id_azienda')
		   },
		   success: function(data){
			   console.log(data);
			   Materialize.toast('Dipendente modificato', 2000,'',function(){populateList("");});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});
}


function checkUsernameInserted(username){
	var result = false;
	
	$.ajax({
		url: "script_php/check_username_inseriti.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,	
	      data:{
		      'us':username
		   },
		  success: function(data) {
		    	if(data[0]['inserted'] > 0)
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
	$("select").empty();
	$.ajax({
      dataType: "json",
      url: "script_php/getGroups.php?db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	      if(data != null){
			  for(var i=0;i<data.length;i++){
		      	$("select").append('<option value='+data[i]['id']+' class="green-text">'+data[i]['descrizione']+'</option>');
		      }
		      $('select').val(gruppo);
		      $('select').material_select();

	      }
	  },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}
function resetPwd(){
	var password = $("#form_password").val();
	var psw = SHA512(password);
	$.ajax({
	     url: "script_php/updatePwd.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'id':json[index]['id'],
		      'password':psw,
		      'azienda':getCookie('id_azienda')
		   },
		   success: function(data){
			   console.log(data);
			   Materialize.toast('Password ripristinata', 2000,'',function(){populateList("");});

			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});
}
