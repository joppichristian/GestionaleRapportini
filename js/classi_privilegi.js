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
		if(json[index]["id"] == getCookie("classe_privilegi"))
			$("#modal_modifica").openModal();
		else
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
	
	$("#yes_mod").click(function(){
		$("#modal_modifica").closeModal();
		modifyGroup();
	});
	$("#no_mod").click(function(){
		$("#modal_modifica").closeModal();
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
	
	if(classe['descrizione'] == "Amministrazione"){
		$("#btn_modify").hide();
		$("#btn_delete").hide();
	}
	else{
		$("#btn_modify").show();
		$("#btn_delete").show();
	}
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
	var tmp = null;
	$.ajax({
		url: "script_php/check_gruppo.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,	
	      data:{
		      'az':getCookie('id_azienda'),
		      'cl':id
		  },
		  success: function(data) {
			  tmp = data;
			  console.log(data);
		},
	      error: function(xhr){
		     console.log(xhr.status);
		     return;
	      }
    });
	if(getCookie("cCL")==0)
		return;
	if(tmp!=null){
		Materialize.toast('Errore! Ci sono dipendenti associati al gruppo!', 2000);
	    return;
    }
    else{
		$.ajax({
			url: "script_php/deleteGroup.php", //Relative or absolute path to response.php file
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
	
	if(json[index]["visualizzazione_cliente"]==1 ){
		$("#clienti_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_cl   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_cl   material-icons right'>remove</i></div>");
		else if(getCookie("aCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_cl material-icons right'>add</i></div>");
		if(json[index]["modifica_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_cl   material-icons right'>remove</i></div>");
		else if(getCookie("mCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_cl material-icons right'>add</i></div>");
		if(json[index]["cancellazione_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_cl   material-icons right'>remove</i></div>");
		else if(getCookie("cCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_cl material-icons right'>add</i></div>");
				
	}
	else{
		if(getCookie("vCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_cl material-icons right'>add</i></div>");
		if(getCookie("aCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_cl material-icons right'>add</i></div>");
		if(getCookie("mCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_cl material-icons  right'>add</i></div>");
		if(getCookie("cCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_cl material-icons right'>add</i></div>");
		
	}
	
	if(json[index]["visualizzazione_materiale"]==1){
		$("#materiali_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_ma   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_ma   material-icons right'>remove</i></div>");
		else if(getCookie("aMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_ma material-icons right'>add</i></div>");
		if(json[index]["modifica_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_ma   material-icons right'>remove</i></div>");
		else if(getCookie("mMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_ma material-icons right'>add</i></div>");
		if(json[index]["cancellazione_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_ma   material-icons right'>remove</i></div>");
		else if(getCookie("cMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_ma material-icons right'>add</i></div>");
				
	}
	else{
		if(getCookie("vMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_ma material-icons right'>add</i></div>");
		if(getCookie("aMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_ma material-icons right'>add</i></div>");
		if(getCookie("mMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_ma material-icons  right'>add</i></div>");
		if(getCookie("cMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_ma material-icons right'>add</i></div>");
			
	}
	
	
	if(json[index]["visualizzazione_mezzo"]==1){
		$("#mezzi_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_me   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_me   material-icons right'>remove</i></div>");
		else if(getCookie("aME")==1)
			$("#mezzi_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_me material-icons right'>add</i></div>");
		if(json[index]["modifica_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_me   material-icons right'>remove</i></div>");
		else if(getCookie("mME")==1)
			$("#mezzi_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_me material-icons right'>add</i></div>");
		if(json[index]["cancellazione_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_me   material-icons right'>remove</i></div>");
		else if(getCookie("cME")==1)
			$("#mezzi_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_me material-icons right'>add</i></div>");
				
	}
	else{
		if(getCookie("vME")==1)
		$("#mezzi_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_me material-icons right'>add</i></div>");
		if(getCookie("aME")==1)
		$("#mezzi_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_me material-icons right'>add</i></div>");
		if(getCookie("mME")==1)
		$("#mezzi_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_me material-icons  right'>add</i></div>");
		if(getCookie("cME")==1)
		$("#mezzi_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_me material-icons right'>add</i></div>");
		
	}
	
	
	if(json[index]["visualizzazione_dipendente"]==1){
		$("#dipendenti_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_di   material-icons right'>remove</i></div>");
		if(json[index]["aggiunta_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_di   material-icons right'>remove</i></div>");
		else if(getCookie("aDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_di material-icons right'>add</i></div>");
		if(json[index]["modifica_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_di   material-icons right'>remove</i></div>");
		else if(getCookie("mDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_di material-icons right'>add</i></div>");
		if(json[index]["cancellazione_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Cancellazione<i class='remove_delete_di   material-icons right'>remove</i></div>");
		else if(getCookie("cDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_di material-icons right'>add</i></div>");
				
	}
	else{
		if(getCookie("vDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Lettura<i class='add_visual_di material-icons right'>add</i></div>");
		if(getCookie("aDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_di material-icons right'>add</i></div>");
		if(getCookie("mDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_di material-icons  right'>add</i></div>");
		if(getCookie("cDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Cancellazione<i class='add_delete_di material-icons right'>add</i></div>");
		
	}

	if(json[index]["modifica_privilegi"]==1){
		$("#security_selected").append("<div class='chip cyan'>Gestione completa<i class='remove_manage_pr   material-icons right'>remove</i></div>");
	}
	else{
		if(getCookie("MP")==1)
			$("#security_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_pr material-icons right'>add</i></div>");
		
	}
	
	if(json[index]["visualizzazione_resoconti_rapportini"]==1 && json[index]["visualizzazione_cliente"]==1){
		$("#rapportini_selected").append("<div class='chip cyan'>Gestione completa<i class='remove_manage_rapp   material-icons right'>remove</i></div>");				
	}
	else if(json[index]["visualizzazione_cliente"]==1){
		if(json[index]["rapportino_rapido"]==1){
				$("#rapportini_selected").append("<div class='chip cyan'>Aggiunta rapportino rapido<i class='remove_add_rapp  material-icons right'>remove</i></div>");	
			if(getCookie("vRR")==1)
				$("#rapportini_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_rapp   material-icons right'>add</i></div>");			
		}
		else{
			if(getCookie("RR")==1)
				$("#rapportini_no_selected").append("<div class='chip cyan'>Aggiunta rapportino rapido<i class='add_add_rapp  material-icons right'>add</i></div>");
			if(getCookie("vRR")==1)
				$("#rapportini_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_rapp   material-icons right'>add</i></div>");	
		}
		
		
	}


	$("#form_descrizione").focus();
	
	
	
	$(".add_visual_cl").click(function(){
		json[index]["visualizzazione_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_visual_cl").click(function(){
		json[index]["visualizzazione_cliente"] = 0;
		json[index]["aggiunta_cliente"] = 0;
		json[index]["modifica_cliente"] = 0;
		json[index]["cancellazione_cliente"] = 0;
		json[index]["rapportino_rapido"] = 0;
		json[index]["visualizzazione_resoconti_rapportini"] = 0;
		completaForm();
		
	});
	
	$(".add_add_cl").click(function(){
		json[index]["aggiunta_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_add_cl").click(function(){
		json[index]["aggiunta_cliente"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_cl").click(function(){
		json[index]["modifica_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_modify_cl").click(function(){
		json[index]["modifica_cliente"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_cl").click(function(){
		json[index]["cancellazione_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_delete_cl").click(function(){
		json[index]["cancellazione_cliente"] = 0;
		completaForm();
		
	});

	
	$(".add_visual_ma").click(function(){
		json[index]["visualizzazione_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_visual_ma").click(function(){
		json[index]["visualizzazione_materiale"] = 0;
		json[index]["aggiunta_materiale"] = 0;
		json[index]["modifica_materiale"] = 0;
		json[index]["cancellazione_materiale"] = 0;
		completaForm();
		
	});
	
	$(".add_add_ma").click(function(){
		json[index]["aggiunta_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_add_ma").click(function(){
		json[index]["aggiunta_materiale"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_ma").click(function(){
		json[index]["modifica_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_modify_ma").click(function(){
		json[index]["modifica_materiale"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_ma").click(function(){
		json[index]["cancellazione_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_delete_ma").click(function(){
		json[index]["cancellazione_materiale"] = 0;
		completaForm();
		
	});
	
	
	$(".add_visual_me").click(function(){
		json[index]["visualizzazione_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_visual_me").click(function(){
		json[index]["visualizzazione_mezzo"] = 0;
		json[index]["aggiunta_mezzo"] = 0;
		json[index]["modifica_mezzo"] = 0;
		json[index]["cancellazione_mezzo"] = 0;
		completaForm();
		
	});
	
	$(".add_add_me").click(function(){
		json[index]["aggiunta_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_add_me").click(function(){
		json[index]["aggiunta_mezzo"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_me").click(function(){
		json[index]["modifica_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_modify_me").click(function(){
		json[index]["modifica_mezzo"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_me").click(function(){
		json[index]["cancellazione_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_delete_me").click(function(){
		json[index]["cancellazione_mezzo"] = 0;
		completaForm();
		
	});
	
	
	$(".add_visual_di").click(function(){
		json[index]["visualizzazione_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_visual_di").click(function(){
		json[index]["visualizzazione_dipendente"] = 0;
		json[index]["aggiunta_dipendente"] = 0;
		json[index]["modifica_dipendente"] = 0;
		json[index]["cancellazione_dipendente"] = 0;
		completaForm();
		
	});
	
	$(".add_add_di").click(function(){
		json[index]["aggiunta_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_add_di").click(function(){
		json[index]["aggiunta_dipendente"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_di").click(function(){
		json[index]["modifica_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_modify_di").click(function(){
		json[index]["modifica_dipendente"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_di").click(function(){
		json[index]["cancellazione_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_delete_di").click(function(){
		json[index]["cancellazione_dipendente"] = 0;
		completaForm();
		
	});
	
	
	$(".add_manage_pr").click(function(){
		json[index]["modifica_privilegi"] = 1;
		completaForm();
	});
	
	$(".remove_manage_pr").click(function(){
		json[index]["modifica_privilegi"] = 0;
		completaForm();
		
	});
	
	
	$(".add_manage_rapp").click(function(){
		json[index]["rapportino_rapido"] = 1;
		json[index]["visualizzazione_resoconti_rapportini"] = 1;
		completaForm();
	});
	
	$(".remove_manage_rapp").click(function(){
		json[index]["visualizzazione_resoconti_rapportini"] = 0;
		completaForm();
		
	});
	
	$(".add_add_rapp").click(function(){
		json[index]["rapportino_rapido"] = 1;
		completaForm();
	});
	
	$(".remove_add_rapp").click(function(){
		json[index]["visualizzazione_resoconti_rapportini"] = 0;
		json[index]["rapportino_rapido"] = 0;
		completaForm();
		
	});

	
	
}
function modifyGroup(){
	
	$.ajax({
	     url: "script_php/updateGroup.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'descrizione': $("#form_descrizione").val(),
		      'vCL': json[index]["visualizzazione_cliente"],
		      'aCL':json[index]["aggiunta_cliente"],
		      'mCL':json[index]["modifica_cliente"],
		      'cCL':json[index]["cancellazione_cliente"],
		      'vMA': json[index]["visualizzazione_materiale"],
		      'aMA':json[index]["aggiunta_materiale"],
		      'mMA':json[index]["modifica_materiale"],
		      'cMA':json[index]["cancellazione_materiale"],
		      'vME': json[index]["visualizzazione_mezzo"],
		      'aME':json[index]["aggiunta_mezzo"],
		      'mME':json[index]["modifica_mezzo"],
		      'cME':json[index]["cancellazione_mezzo"],
		      'vDI': json[index]["visualizzazione_dipendente"],
		      'aDI':json[index]["aggiunta_dipendente"],
		      'mDI':json[index]["modifica_dipendente"],
		      'cDI':json[index]["cancellazione_dipendente"],
		      'RR': json[index]["rapportino_rapido"],
		      'vRR':json[index]["visualizzazione_resconti_rapportini"],
		      'MP':json[index]["modifica_privilegi"],
		      'id':json[index]['id'],
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){
			   console.log(data);
			   Materialize.toast('Gruppo modificato', 2000,'',function(){
				   if(json[index]['id'] == getCookie("classe_privilegi"))
				   {
						setCookie("nomeDB","");
						window.location.replace("index.html");   
				   }
				   populateList("");
				});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});
}
