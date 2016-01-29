var json = new Array();
var index=0;
var id=0;

$(document).ready(function() {
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

	$("#info").show();
	$("#modifica_cliente").hide();
	$("#search").on('input', function() {
		var tmp = $("#search").val();
		populateList(tmp);
	});
	$("#modify").click( function() {
		completaForm();
	});
	$("#invia_dati").click( function() {
		modifyCliente();
	});
	$("#annulla_modify").click( function() {
		explodeClient(json[0]);
	});
	$("#delete").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#yes").click(function(){
		$("#modal_cancellazione").closeModal();
		deleteCliente();
	});
	$("#no").click(function(){
		$("#modal_cancellazione").closeModal();
	});
	populateList("");

});


function populateList(filter){

	var q = filter;
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
	$("#modifica_cliente").hide();
	$("#info").show();
	$("#nominativo").empty();
	$("#indirizzi").empty();
	$("#telefono").empty();
	$("#cellulare").empty();
	$("#codice_fiscale").empty();
	$("#partita_iva").empty();
	$("#email").empty();
	$("#site").empty();
	$("#note").empty();
	$("#logo_cliente").empty();
	if(cliente['tipologia'] == 'p'){
		$("#logo_cliente").append('<i id="logo_cliente" class="large material-icons blue-text">account_circle</i>');
		$("#nominativo").append('<div class="blue-text" style="margin-left:15%;">Nominativo </div><i class="info small material-icons blue-text">account_circle</i> '+cliente['nominativo']);
			}
	else
	{
		$("#logo_cliente").append('<i id="logo_cliente" class="large material-icons blue-text">business</i>');
		$("#nominativo").append('<div class="blue-text" style="margin-left:15%;">Ragione Sociale </div><i class="info small material-icons blue-text">business</i>'+cliente['nominativo']);
	}

    if(cliente['indirizzo'] != null && cliente['citta'] != null && cliente['cap'] != null && cliente['provincia'] != null && cliente['indirizzo'] != "" && cliente['citta'] != "" && cliente['cap'] != "" && cliente['provincia'] != "")
       $("#indirizzi").append('<div class="blue-text" style="margin-left:15%;">Indirizzo </div><i class="info small material-icons blue-text">place</i>'+cliente['indirizzo']+' - '+cliente['citta']+' - '+cliente['cap']+ ' - '+cliente['provincia']);
	if(cliente['telefono'] != null && cliente['telefono'] != "")
       $("#telefono").append('<div class="blue-text" style="margin-left:15%;">Telefono </div><i class="info small material-icons blue-text">phone</i>'+cliente['telefono']);
	if(cliente['cellulare'] != null && cliente['cellulare'] != "")
       $("#cellulare").append('<div class="blue-text" style="margin-left:15%;">Cellulare </div><i class="info small material-icons blue-text">phone_iphone</i>'+cliente['cellulare']);
    if(cliente['codice_fiscale'] != null && cliente['codice_fiscale'] != "") {
		$("#codice_fiscale").append('<div class="blue-text" style="margin-left:15%;">Codice Fiscale </div><i class="info small material-icons blue-text">code</i>'+cliente['codice_fiscale']);
		}
	if(cliente['partita_iva'] != null && cliente['partita_iva'] != "")
		$("#partita_iva").append('<div class="blue-text" style="margin-left:15%;">Partita Iva </div><i class="info small material-icons blue-text">code</i>'+cliente['partita_iva']);
    if(cliente['email'] != null && cliente['email'] != "")
       $("#email").append('<div class="blue-text" style="margin-left:15%;">Email </div> <i class="info small material-icons blue-text">email</i>'+cliente['email']);
    if(cliente['sito'] != null && cliente['sito'] != "")
       $("#site").append('<div class="blue-text" style="margin-left:15%;">Sito Web </div><i class="info small material-icons blue-text">public</i>'+cliente['sito']);
      if(cliente['note'] != null && cliente['note'] != "")
       $("#note").append('<div class="blue-text" style="margin-left:15%;">Note </div><i class="info small material-icons blue-text">chat_bubble</i>'+cliente['note']);

}

function deleteCliente(){
	
	
	
	$.ajax({
		url: "script_php/deleteClient.php", //Relative or absolute path to response.php file
	      type:"POST",	
	      data:{'id': id,'db':getCookie('nomeDB')},
		  success: function(data) {
		    Materialize.toast('Cliente eliminato', 2000);
			populateList("");
		  },
	      error: function(xhr){
		     console.log(xhr.status);
	      }
    });

}

function completaForm(){
	if(json[index]['tipologia'] == 'p')
		$("#div_iva").hide();
	else
		$("#div_iva").show();
	$("#modifica_cliente").show();
	$("#info").hide();
	$("#form_nominativo").val(json[index]['nominativo']);
	$("#form_indirizzo").val(json[index]['indirizzo']);
	$("#form_indirizzo").focus();
	$("#form_citta").val(json[index]['citta']);
	$("#form_citta").focus();
	$("#form_cap").val(json[index]['cap']);
	$("#form_cap").focus();
	$("#form_prov").val(json[index]['provincia']);
	$("#form_prov").focus();
	$("#form_telephone").val(json[index]['telefono']);
	$("#form_telephone").focus();
	$("#form_mobile").val(json[index]['cellulare']);
	$("#form_mobile").focus();
	$("#form_code").val(json[index]['codice_fiscale']);
	$("#form_code").focus();
	$("#form_iva").val(json[index]['partita_iva']);
	$("#form_iva").focus();
	$("#form_email").val(json[index]['email']);
	$("#form_email").focus();
	$("#form_site").val(json[index]['sito']);
	$("#form_site").focus();
	$("#form_note").val(json[index]['note']);
	$("#form_note").focus();
	$("#form_nominativo").focus();

	}
function modifyCliente(){
	var nominativo = $("#form_nominativo").val();
	var indirizzo = $("#form_indirizzo").val();
	var citta = $("#form_citta").val();
	var cap = $("#form_cap").val();
	var provincia = $("#form_prov").val();
	var telefono = $("#form_telephone").val();
	var cellulare = $("#form_mobile").val();
	var codice_fiscale = $("#form_code").val();
	var p_iva = $("#form_iva").val();
	var email = $("#form_email").val();
	var sito = $("#form_site").val();
	var note = $("#form_note").val();

	$.ajax({
	     url: "script_php/updateClients.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'nominativo': nominativo,
		      'indirizzo':indirizzo,
		      'citta':citta,
		      'cap':cap,
		      'provincia':provincia,
		      'telefono':telefono,
		      'cellulare':cellulare,
		      'cf':codice_fiscale,
		      'piva':p_iva,
		      'email':email,
		      'site':sito,
		      'note':note,
		      'id':json[index]['id'],
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){
			   Materialize.toast('Cliente modificato', 2000,'',function(){populateList("");});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});
}
