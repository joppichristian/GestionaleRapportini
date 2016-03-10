var response;

var arr;

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	if(getCookie('MP')==0)
		window.location.replace("dashboard.html");
	$('select').material_select();
	$("#div_iva").hide();
	$("#tipologia").on("change",function(){
		if($(this).val() == 'p')
		{
			$("#label_nominativo").text( "Nominativo");
			$("#div_iva").hide();
			$("#icon_prefix").text("account_circle");
		}
		else if ($(this).val() == 'a')
		{
			$("#label_nominativo").text("Ragione Sociale");
			$("#div_iva").show();
			$("#icon_prefix").text("business");
		}
	}) ;
	$("#invia_dati").on("click",function(){
		if($("#form_descrizione").val()!="")
			addClasse();
		else
			Materialize.toast("Descrizione obbligatoria!",2000);

	});
	
	arr = new Array();
	
	
	arr['visualizzazione_cliente'] = 0;
	arr['aggiunta_cliente'] = 0;
	arr['modifica_cliente'] = 0;
	arr['cancellazione_cliente'] = 0;
	arr['visualizzazione_materiale'] = 0;
	arr['aggiunta_materiale'] = 0;
	arr['modifica_materiale'] = 0;
	arr['cancellazione_materiale'] = 0;
	arr['visualizzazione_mezzo'] = 0;
	arr['aggiunta_mezzo'] = 0;
	arr['modifica_mezzo'] = 0;
	arr['cancellazione_mezzo'] = 0;
	arr['visualizzazione_dipendente'] = 0;
	arr['aggiunta_dipendente'] = 0;
	arr['modifica_dipendente'] = 0;
	arr['cancellazione_dipendente'] = 0;
	arr['visualizzazione_resoconti_rapportini'] = 0;
	arr['rapportino_rapido'] = 0;
	arr['gestione_privilegi'] = 0;
	
	completaForm();
	
});

function completaForm(){
	
	
	
	$("#modifica_gruppo").show();
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
	
	if(arr["visualizzazione_cliente"]==1 ){
		$("#clienti_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_cl   material-icons right'>remove</i></div>");
		if(arr["aggiunta_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_cl   material-icons right'>remove</i></div>");
		else if(getCookie("aCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_cl material-icons right'>add</i></div>");
		if(arr["modifica_cliente"]==1)
			$("#clienti_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_cl   material-icons right'>remove</i></div>");
		else if(getCookie("mCL")==1)
			$("#clienti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_cl material-icons right'>add</i></div>");
		if(arr["cancellazione_cliente"]==1)
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
	
	if(arr["visualizzazione_materiale"]==1){
		$("#materiali_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_ma   material-icons right'>remove</i></div>");
		if(arr["aggiunta_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_ma   material-icons right'>remove</i></div>");
		else if(getCookie("aMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_ma material-icons right'>add</i></div>");
		if(arr["modifica_materiale"]==1)
			$("#materiali_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_ma   material-icons right'>remove</i></div>");
		else if(getCookie("mMA")==1)
			$("#materiali_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_ma material-icons right'>add</i></div>");
		if(arr["cancellazione_materiale"]==1)
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
	
	
	if(arr["visualizzazione_mezzo"]==1){
		$("#mezzi_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_me   material-icons right'>remove</i></div>");
		if(arr["aggiunta_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_me   material-icons right'>remove</i></div>");
		else if(getCookie("aME")==1)
			$("#mezzi_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_me material-icons right'>add</i></div>");
		if(arr["modifica_mezzo"]==1)
			$("#mezzi_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_me   material-icons right'>remove</i></div>");
		else if(getCookie("mME")==1)
			$("#mezzi_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_me material-icons right'>add</i></div>");
		if(arr["cancellazione_mezzo"]==1)
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
	
	
	if(arr["visualizzazione_dipendente"]==1){
		$("#dipendenti_selected").append("<div class='chip cyan'>Lettura<i class='remove_visual_di   material-icons right'>remove</i></div>");
		if(arr["aggiunta_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Aggiunta<i class='remove_add_di   material-icons right'>remove</i></div>");
		else if(getCookie("aDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Aggiunta<i class='add_add_di material-icons right'>add</i></div>");
		if(arr["modifica_dipendente"]==1)
			$("#dipendenti_selected").append("<div class='chip cyan'>Modifica<i class='remove_modify_di   material-icons right'>remove</i></div>");
		else if(getCookie("mDI")==1)
			$("#dipendenti_no_selected").append("<div class='chip cyan'>Modifica<i class='add_modify_di material-icons right'>add</i></div>");
		if(arr["cancellazione_dipendente"]==1)
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

	if(arr["modifica_privilegi"]==1){
		$("#security_selected").append("<div class='chip cyan'>Gestione completa<i class='remove_manage_pr   material-icons right'>remove</i></div>");
	}
	else{
		if(getCookie("MP")==1)
			$("#security_no_selected").append("<div class='chip cyan'>Gestione completa<i class='add_manage_pr material-icons right'>add</i></div>");
		
	}
	
	if(arr["visualizzazione_resoconti_rapportini"]==1 && arr["visualizzazione_cliente"]==1){
		$("#rapportini_selected").append("<div class='chip cyan'>Gestione completa<i class='remove_manage_rapp   material-icons right'>remove</i></div>");				
	}
	else if(arr["visualizzazione_cliente"]==1){
		if(arr["rapportino_rapido"]==1){
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
	
	
	
	$(".add_visual_cl").click(function(){
		arr["visualizzazione_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_visual_cl").click(function(){
		arr["visualizzazione_cliente"] = 0;
		arr["aggiunta_cliente"] = 0;
		arr["modifica_cliente"] = 0;
		arr["cancellazione_cliente"] = 0;
		arr["rapportino_rapido"] = 0;
		arr["visualizzazione_resoconti_rapportini"] = 0;
		completaForm();
		
	});
	
	$(".add_add_cl").click(function(){
		arr["aggiunta_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_add_cl").click(function(){
		arr["aggiunta_cliente"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_cl").click(function(){
		arr["modifica_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_modify_cl").click(function(){
		arr["modifica_cliente"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_cl").click(function(){
		arr["cancellazione_cliente"] = 1;
		completaForm();
	});
	
	$(".remove_delete_cl").click(function(){
		arr["cancellazione_cliente"] = 0;
		completaForm();
		
	});

	
	$(".add_visual_ma").click(function(){
		arr["visualizzazione_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_visual_ma").click(function(){
		arr["visualizzazione_materiale"] = 0;
		arr["aggiunta_materiale"] = 0;
		arr["modifica_materiale"] = 0;
		arr["cancellazione_materiale"] = 0;
		completaForm();
		
	});
	
	$(".add_add_ma").click(function(){
		arr["aggiunta_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_add_ma").click(function(){
		arr["aggiunta_materiale"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_ma").click(function(){
		arr["modifica_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_modify_ma").click(function(){
		arr["modifica_materiale"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_ma").click(function(){
		arr["cancellazione_materiale"] = 1;
		completaForm();
	});
	
	$(".remove_delete_ma").click(function(){
		arr["cancellazione_materiale"] = 0;
		completaForm();
		
	});
	
	
	$(".add_visual_me").click(function(){
		arr["visualizzazione_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_visual_me").click(function(){
		arr["visualizzazione_mezzo"] = 0;
		arr["aggiunta_mezzo"] = 0;
		arr["modifica_mezzo"] = 0;
		arr["cancellazione_mezzo"] = 0;
		completaForm();
		
	});
	
	$(".add_add_me").click(function(){
		arr["aggiunta_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_add_me").click(function(){
		arr["aggiunta_mezzo"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_me").click(function(){
		arr["modifica_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_modify_me").click(function(){
		arr["modifica_mezzo"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_me").click(function(){
		arr["cancellazione_mezzo"] = 1;
		completaForm();
	});
	
	$(".remove_delete_me").click(function(){
		arr["cancellazione_mezzo"] = 0;
		completaForm();
		
	});
	
	
	$(".add_visual_di").click(function(){
		arr["visualizzazione_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_visual_di").click(function(){
		arr["visualizzazione_dipendente"] = 0;
		arr["aggiunta_dipendente"] = 0;
		arr["modifica_dipendente"] = 0;
		arr["cancellazione_dipendente"] = 0;
		completaForm();
		
	});
	
	$(".add_add_di").click(function(){
		arr["aggiunta_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_add_di").click(function(){
		arr["aggiunta_dipendente"] = 0;
		completaForm();
		
	});
	
	$(".add_modify_di").click(function(){
		arr["modifica_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_modify_di").click(function(){
		arr["modifica_dipendente"] = 0;
		completaForm();
		
	});
	
	
	$(".add_delete_di").click(function(){
		arr["cancellazione_dipendente"] = 1;
		completaForm();
	});
	
	$(".remove_delete_di").click(function(){
		arr["cancellazione_dipendente"] = 0;
		completaForm();
		
	});
	
	
	$(".add_manage_pr").click(function(){
		arr["modifica_privilegi"] = 1;
		completaForm();
	});
	
	$(".remove_manage_pr").click(function(){
		arr["modifica_privilegi"] = 0;
		completaForm();
		
	});
	
	
	$(".add_manage_rapp").click(function(){
		arr["rapportino_rapido"] = 1;
		arr["visualizzazione_resoconti_rapportini"] = 1;
		completaForm();
	});
	
	$(".remove_manage_rapp").click(function(){
		arr["visualizzazione_resoconti_rapportini"] = 0;
		completaForm();
		
	});
	
	$(".add_add_rapp").click(function(){
		arr["rapportino_rapido"] = 1;
		completaForm();
	});
	
	$(".remove_add_rapp").click(function(){
		arr["visualizzazione_resoconti_rapportini"] = 0;
		arr["rapportino_rapido"] = 0;
		completaForm();
		
	});

	
	
}


function addClasse(){
	
	$.ajax({
	     url: "script_php/postGroup.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'descrizione': $("#form_descrizione").val(),
		      'vCL': arr["visualizzazione_cliente"],
		      'aCL':arr["aggiunta_cliente"],
		      'mCL':arr["modifica_cliente"],
		      'cCL':arr["cancellazione_cliente"],
		      'vMA': arr["visualizzazione_materiale"],
		      'aMA':arr["aggiunta_materiale"],
		      'mMA':arr["modifica_materiale"],
		      'cMA':arr["cancellazione_materiale"],
		      'vME': arr["visualizzazione_mezzo"],
		      'aME':arr["aggiunta_mezzo"],
		      'mME':arr["modifica_mezzo"],
		      'cME':arr["cancellazione_mezzo"],
		      'vDI': arr["visualizzazione_dipendente"],
		      'aDI':arr["aggiunta_dipendente"],
		      'mDI':arr["modifica_dipendente"],
		      'cDI':arr["cancellazione_dipendente"],
		      'RR': arr["rapportino_rapido"],
		      'vRR':arr["visualizzazione_resconti_rapportini"],
		      'MP':arr["modifica_privilegi"],
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){
			   console.log(data);
			   Materialize.toast('Gruppo inserito', 2000,'',function(){window.location.replace("classi_privilegi.html")});
				return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});
}

