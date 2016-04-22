$(document).ready(function(){
	$('#loading').hide();
	$("#edit_profile").click(function(){
		$("#modal_modifica").openModal();
		$("#username").val(getCookie("username"));
		$("#username").focus();
	});
	$("#edit_profile2").click(function(){
		$("#modal_modifica").openModal();
		$("#username").val(getCookie("username"));
		$("#username").focus();
	});
	$("#manage_gestionale").click(function(){
		$("#modal_impostazioni").openModal();
	});
	$("#manage_gestionale2").click(function(){
		$("#modal_impostazioni").openModal();
	});
	$("#yes_mod").click(function(){
		updateProfile();
	});

	$("#yes_imp").click(function(){
		updateLimitiOrari();
	});

	$("#btn_load").on("click",function(){
		$('#loading').hide();
		Loading();
	});

	$("#start_ora").val(getCookie("inizio").split(':')[0]);
	$("#start_min").val(getCookie("inizio").split(':')[1]);

	$("#fine_ora").val(getCookie("fine").split(':')[0]);
	$("#fine_min").val(getCookie("fine").split(':')[1]);
	
	var dbs  = getCookie("dbs").split('-');
	for(var i=0;i<dbs.length-1;i++){
		$("#aziende_associate").append('<li class="blue-grey darken-3"><a href="#!" value="'+dbs[i].split(':')[2]+':'+dbs[i].split(':')[3]+'" id="'+dbs[i].split(':')[0]+'"class="blue-grey-text text-lighten-5">'+dbs[i].split(':')[1]+'</a></li><li class="divider"></li>');
		
		$("#"+dbs[i].split(':')[0]).click(function(){
			setCookie("nomeDB",$(this).attr("id"),30);
			setCookie("id_azienda",$(this).attr("value").split(':')[0],30);
			setCookie("classe_privilegi",$(this).attr("value").split(':')[1],30);
			$("#text-db").empty();
			$("#text-db").append($(this).text()+ '<i class="material-icons right">arrow_drop_down</i>');
			window.location.reload();
		})
	}	
	if(getCookie("inizialized")==0){
		setCookie("nomeDB",dbs[0].split(':')[0],30);
		setCookie("inizialized",1,30);
		$("#text-db").append(dbs[0].split(':')[1]+ '<i class="material-icons right">arrow_drop_down</i>');
		
	}
	else{
		$("#text-db").append($("#"+getCookie("nomeDB")).text()+ '<i class="material-icons right">arrow_drop_down</i>');
	}
	
	
	
	$(".dropdown-button").dropdown();
	$('select').material_select();

});

function updateProfile(){
		var username = $("#username").val();

		//var old_pass = $("#old_pass").val();
		//var old_pass = SHA512(old_pass);

		var new_pass = $("#new_pass").val();
		var new_pass_confirm = $("#new_pass_conf").val();

		if(new_pass != new_pass_confirm)
			Materialize.toast("Le due nuove password non corrispondono!",2000);
		else{
				var new_pass = SHA512(new_pass);
				var new_pass_confirm = SHA512(new_pass_confirm);
			//	var stringaR = "u="+getCookie("username")+"&p="+old_pass;
				//var query = "script_php/login.php?"+stringaR ;
				$.ajax({
								url: "script_php/updateProfile.php", //Relative or absolute path to response.php file
								type:"POST",
								async:false,
								data:{
									'username': username,
									'password':new_pass,
									'id':getCookie("id_dipendente"),
									'azienda': getCookie("id_azienda")
							 	 },
							 	 success: function(data){
										Materialize.toast('Il tuo profilo è stato modificato', 2000,"",function(){setCookie("nomeDB","");
										window.location.replace("index.html");});
								 		return true;
									},
							 		error: function (XMLHttpRequest, textStatus, errorThrown){
								 		Materialize.toast('Errore di modificca', 2000);
										return false;
									}
			   });


	}
}

function updateLimitiOrari(){
		var inizio = $("#start_ora").val() + ":" + $("#start_min").val();
		var fine = $("#fine_ora").val() + ":" + $("#fine_min").val();

		var new_pass = $("#new_pass").val();
		var new_pass_confirm = $("#new_pass_conf").val();

		if(new_pass != new_pass_confirm)
			Materialize.toast("Le due nuove password non corrispondono!",2000);
		else{
				var new_pass = SHA512(new_pass);
				var new_pass_confirm = SHA512(new_pass_confirm);
			//	var stringaR = "u="+getCookie("username")+"&p="+old_pass;
				//var query = "script_php/login.php?"+stringaR ;
				$.ajax({
								url: "script_php/updateLimitiOrari.php", //Relative or absolute path to response.php file
								type:"POST",
								async:false,
								data:{
									'inizio': inizio,
									'fine':fine,
									'azienda': getCookie("id_azienda")
							 	 },
							 	 success: function(data){
										Materialize.toast('Le impostazioni sono state modificate', 2000,"",function(){setCookie("inizio",inizio);
										setCookie("fine",fine);});
								 		return true;
									},
							 		error: function (XMLHttpRequest, textStatus, errorThrown){
								 		Materialize.toast('Errore di modificca', 2000);
										return false;
									}
			   });


	}
}
function Loading(){
	$('#loading').show();
}
