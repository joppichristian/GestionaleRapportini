var json = new Array();
var index=0;
var id=0;

$(document).ready(function() {
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	$(document).ready(function() {
	    $('select').material_select();
	  });
		
		
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
      url: "script_php/getGroups.php?q="+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
		    elementi[i].innerHTML = '<div><i class="info small material-icons cyan-text">security</i>'+data[i]['descrizione']+'<a href="#!" class="secondary-content"><i class="explode material-icons cyan-text">call_received</i></a></div>	';
		  
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
function explodeClient(classe){
	$("#modifica_gruppo").hide();
	$("#info").show();
	$("#descrizione").empty();
	$("#clienti").empty();
	$("#materiali").empty();
	$("#mezzi").empty();
	$("#dipendenti").empty();
	$("#privilegi").empty();
	$("#rapportino").empty();
	$("#logo_gruppo").empty();
		
	$("#logo_gruppo").append('<i id="logo_cliente" class="large material-icons cyan-text">security</i>');
	$("#descrizione").append('<div class="cyan-text" style="margin-left:15%;">Descrizione</div><i class="info small material-icons cyan-text">group</i>'+classe['descrizione']);

	if(classe['visualizzazione_cliente'] != 0 || classe['aggiunta_cliente'] != 0 || classe['modifica_cliente'] != 0 || classe['cancellazione_cliente'] != 0)
		$("#clienti").append('<div class="cyan-text" style="margin-left:15%;">Clienti</div><i class="info small material-icons cyan-text">account_circle</i>');
    if(classe['visualizzazione_cliente'] != 0 )
       $("#clienti").append('<div class="chip cyan">Lettura</div> ');
    if(classe['aggiunta_cliente'] != 0 )
       $("#clienti").append('<div class="chip cyan">Aggiunta</div> ');
    if(classe['modifica_cliente'] != 0 )
       $("#clienti").append('<div class="chip cyan">Modifica</div> ');
    if(classe['cancellazione_cliente'] != 0 )
       $("#clienti").append('<div class="chip cyan">Cancellazione</div>');
    if(classe['visualizzazione_materiale'] != 0 || classe['aggiunta_materiale'] != 0 || classe['modifica_materiale'] != 0 || classe['cancellazione_materiale'] != 0)
    	$("#materiali").append('<div class="cyan-text" style="margin-left:15%;">Materiali</div><i class="info small material-icons cyan-text">local_grocery_store</i>');
    if(classe['visualizzazione_materiale'] != 0 )
       $("#materiali").append('<div class="chip cyan">Lettura</div>');
    if(classe['aggiunta_materiale'] != 0 )
       $("#materiali").append('<div class="chip cyan">Aggiunta</div> ');
    if(classe['modifica_materiale'] != 0 )
       $("#materiali").append('<div class="chip cyan">Modifica</div> ');
    if(classe['cancellazione_materiale'] != 0 )
       $("#materiali").append('<div class="chip cyan">Cancellazione</div>');
    if(classe['visualizzazione_mezzo'] != 0 || classe['aggiunta_mezzo'] != 0 || classe['modifica_mezzo'] != 0 || classe['cancellazione_mezzo'] != 0)
    	$("#mezzi").append('<div class="cyan-text" style="margin-left:15%;">Mezzi</div><i class="info small material-icons cyan-text">directions_bus</i>');
    if(classe['visualizzazione_mezzo'] != 0 )
       $("#mezzi").append('<div class="chip cyan">Lettura</div> ');
    if(classe['aggiunta_mezzo'] != 0 )
       $("#mezzi").append('<div class="chip cyan">Aggiunta</div> ');
    if(classe['modifica_mezzo'] != 0 )
       $("#mezzi").append('<div class="chip cyan">Modifica</div> ');
    if(classe['cancellazione_mezzo'] != 0 )
       $("#mezzi").append('<div class="chip cyan">Cancellazione</div>');
    if(classe['visualizzazione_dipendente'] != 0 || classe['aggiunta_dipendente'] != 0 || classe['modifica_dipendente'] != 0 || classe['cancellazione_dipendente'] != 0)
    	$("#dipendenti").append('<div class="cyan-text" style="margin-left:15%;">Dipendenti</div><i class="info small material-icons cyan-text">directions_walk</i>');
    if(classe['visualizzazione_dipendente'] != 0 )
       $("#dipendenti").append('<div class="chip cyan">Lettura</div> ');
    if(classe['aggiunta_dipendente'] != 0 )
       $("#dipendenti").append('<div class="chip cyan">Aggiunta</div> ');
    if(classe['modifica_dipendente'] != 0 )
       $("#dipendenti").append('<div class="chip cyan">Modifica</div> ');
    if(classe['cancellazione_dipendente'] != 0 )
       $("#dipendenti").append('<div class="chip cyan">Cancellazione</div>');
	 if(classe['modifica_privilegi'] != 0 )
    	$("#privilegi").append('<div class="cyan-text" style="margin-left:15%;">Classi di dipendenti e privilegi associati</div><i class="info small material-icons cyan-text">security</i><div class="chip cyan">Gestione completa</div>');
    if(classe['visualizzazione_resoconti_rapportini'] != 0 )
    	$("#rapportino").append('<div class="cyan-text" style="margin-left:15%;">Rapportini</div><i class="info small material-icons cyan-text">content_paste</i><div class="chip cyan">Gestione completa</div>');
    else if(classe['rapportino_rapido'] != 0 )
    	$("#rapportino").append('<div class="cyan-text" style="margin-left:15%;">Rapportini</div><i class="info small material-icons cyan-text">content_paste</i><div class="chip cyan">Aggiunta rapida</div>');
   


}

function deleteCliente(){
	
	if(getCookie("cCL")==0)
		return;
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
	$("#modifica_gruppo").show();
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
