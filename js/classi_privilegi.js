var json = new Array();
var index=0;
var id=0;

$(document).ready(function() {
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	
	
	$('select').material_select();
	 
		
		
	$("#info").show();
	$("#modifica_gruppo").hide();
	$("#search").on('input', function() {
		var tmp = $("#search").val();
		populateList(tmp);
	});
	$("#modify").click( function() {
		completaForm();
	});
	$("#invia_dati").click( function() {
		modifyGroup();
	});
	$("#annulla_modify").click( function() {
		explodeGroup(json[0]);
	});
	$("#delete").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#yes").click(function(){
		$("#modal_cancellazione").closeModal();
		deleteGroup();
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

		explodeGroup(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];
	        explodeGroup(json[index]);
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}
function explodeGroup(classe){
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

function deleteGroup(){
	
	if(getCookie("cCL")==0)
		return;
	$.ajax({
		url: "script_php/deleteClient.php", //Relative or absolute path to response.php file
	      type:"POST",	
	      data:{'id': id,'db':getCookie('nomeDB')},
		  success: function(data) {
		    Materialize.toast('Gruppo dipendenti eliminato', 2000);
			populateList("");
		  },
	      error: function(xhr){
		     console.log(xhr.status);
	      }
    });

}

function completaForm(){
	$("#modifica_gruppo").show();
	$("#info").hide();
	$("#form_descrizione").val(json[index]['descrizione']);
	$("#clienti_no_selected").empty();
	$("#clienti_selected").empty();
	$("#materiali_no_selected").empty();
	$("#materiali_selected").empty();
	$("#mezzi_no_selected").empty();
	$("#mezzi_selected").empty();
	$("#dipendenti_no_selected").empty();
	$("#dipendenti_selected").empty();
	$("#security_no_selected").empty();
	$("#security_selected").empty();
	$("#rapportini_no_selected").empty();
	$("#rapportini_selected").empty();
	
	if(json[index]["visualizzazione_cliente"]==1){
		$("#clienti_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_cl   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_cl   material-icons right'>remove</i></div>");
		else
			$("#clienti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_cl material-icons right'>add</i></div>");
		if(json[index]["modifica_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_cl   material-icons right'>remove</i></div>");
		else
			$("#clienti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_add_cl material-icons right'>add</i></div>");
		if(json[index]["cancellazione_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_cl   material-icons right'>remove</i></div>");
		else
			$("#clienti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_cl material-icons right'>add</i></div>");
				
	}
	else{
		$("#clienti_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_cl material-icons right'>add</i></div>");
		$("#clienti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_cl material-icons right'>add</i></div>");
		$("#clienti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_cl material-icons  right'>add</i></div>");
		$("#clienti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_cl material-icons right'>add</i></div>");
		
	}
	
	if(json[index]["visualizzazione_materiale"]==1){
		$("#materiali_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_ma   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_ma   material-icons right'>remove</i></div>");
		else
			$("#materiali_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_ma material-icons right'>add</i></div>");
		if(json[index]["modifica_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_ma   material-icons right'>remove</i></div>");
		else
			$("#materiali_no_selected").append("<div class='chip cyan'>Modifica<i class='add_add_ma material-icons right'>add</i></div>");
		if(json[index]["cancellazione_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_ma   material-icons right'>remove</i></div>");
		else
			$("#materiali_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_ma material-icons right'>add</i></div>");
				
	}
	else{
		$("#materiali_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_ma material-icons right'>add</i></div>");
		$("#materiali_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_ma material-icons right'>add</i></div>");
		$("#materiali_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_ma material-icons  right'>add</i></div>");
		$("#materiali_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_ma material-icons right'>add</i></div>");
		
	}
	
	
	if(json[index]["visualizzazione_mezzo"]==1){
		$("#mezzi_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_me   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_me   material-icons right'>remove</i></div>");
		else
			$("#mezzi_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_me material-icons right'>add</i></div>");
		if(json[index]["modifica_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_me   material-icons right'>remove</i></div>");
		else
			$("#mezzi_no_selected").append("<div class='chip cyan'>Modifica<i class='add_add_me material-icons right'>add</i></div>");
		if(json[index]["cancellazione_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_me   material-icons right'>remove</i></div>");
		else
			$("#mezzi_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_me material-icons right'>add</i></div>");
				
	}
	else{
		$("#mezzi_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_me material-icons right'>add</i></div>");
		$("#mezzi_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_me material-icons right'>add</i></div>");
		$("#mezzi_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_me material-icons  right'>add</i></div>");
		$("#mezzi_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_me material-icons right'>add</i></div>");
		
	}
	
	
	if(json[index]["visualizzazione_dipendente"]==1){
		$("#dipendenti_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_di   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_di   material-icons right'>remove</i></div>");
		else
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_di material-icons right'>add</i></div>");
		if(json[index]["modifica_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_di   material-icons right'>remove</i></div>");
		else
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_add_di material-icons right'>add</i></div>");
		if(json[index]["cancellazione_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_di   material-icons right'>remove</i></div>");
		else
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_di material-icons right'>add</i></div>");
				
	}
	else{
		$("#dipendenti_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_di material-icons right'>add</i></div>");
		$("#dipendenti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_di material-icons right'>add</i></div>");
		$("#dipendenti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_di material-icons  right'>add</i></div>");
		$("#dipendenti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_di material-icons right'>add</i></div>");
		
	}

	if(json[index]["modifica privilegi"]==1){
		$("#security_selected").append("<div class='chip cyan'>Gestione completa<i class='remove_manage_pr   material-icons right'>remove</i></div>");
	}
	else{
		$("#security_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_pr material-icons right'>add</i></div>");
		
	}
	
	if(json[index]["visualizzazione_resoconti_rapportini"]==1){
		$("#rapportini_selected").append("<div class='chip cyan'>Gestione completa<i class='remove_manage_rapp   material-icons right'>remove</i></div>");				
	}
	else{
		if(json[index]["rapportino_rapido"]==1){
			$("#rapportini_selected").append("<div class='chip cyan'>Aggiunta rapportino rapido<i class='remove_add_rapp  material-icons right'>remove</i></div>");	
			$("#rapportini_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_rapp   material-icons right'>add</i></div>");			
		}
		else{
			$("#rapportini_no_selected").append("<div class='chip cyan'>Aggiunta rapportino rapido<i class='add_add_rapp  material-icons right'>add</i></div>");
			$("#rapportini_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_rapp   material-icons right'>add</i></div>");	
		}
		
		
	}


	$("#form_descrizione").focus();
	$('#select').material_select('update');
}
function modifyGroup(){
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
