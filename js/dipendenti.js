var json = new Array();
var index=0;
var id=0;

$(document).ready(function() {
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
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
	$("#invia_dati").click( function() {
		modifyDipendente();
	});
	$("#annulla_modify").click( function() {
		explodeDipendente(json[0]);
	});
	$("#delete").click( function() {
		deleteDipendente();
	});
	populateList("");

});


function populateList(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div><i class="info small material-icons green-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="#!" class="secondary-content"><i class="explode material-icons green-text">call_received</i></a></div>	';


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
	$("#modifica_dipendente").hide();
	$("#info").show();
	$("#nominativo").empty();
	$("#telefono").empty();
	$("#cellulare").empty();
	$("#iban").empty();
	$("#note").empty();
	$("#logo_dipendente").empty();
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

}

function deleteDipendente(){
	$.confirm({
				title: 'Elimino Dipendente',
				confirmButton: 'Elimina',
				cancelButton: 'Annulla',
				content: 'Sei sicuro di voler eliminare il Dipendente?',
				theme: 'supervan',
				confirmButtonClass: 'btn-info',
				animation:'RotateY',
				animationSpeed: 1000,
				confirm: function () {
					$.ajax({
				      url: "script_php/deleteEmployee.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id,'db':getCookie('nomeDB')},
				      success: function(data) {
					      Materialize.toast('Dipendente eliminato', 2000);
					      populateList("");
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });
				 }
			});

}

function completaForm(){

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
	$("#form_nome").focus();

	}
function modifyDipendente(){
	var nome = $("#form_nome").val();
	var cognome = $("#form_cognome").val();
	var telefono = $("#form_telephone").val();
	var cellulare = $("#form_mobile").val();
	var iban = $("#form_iban").val();
	var note = $("#form_note").val();

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
		      'id':json[index]['id'],
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){
			   Materialize.toast('Dipendente modificato', 2000,'',function(){populateList("");});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});
}
