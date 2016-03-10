$(document).ready(function(){
	$("#edit_profile").click(function(){
		$("#modal_modifica").openModal();
		$("#username").val(getCookie("username"));
		$("#username").focus();
	});
	$("#yes_mod").click(function(){
		updateProfile();
	});

	
});


function updateProfile(){
	var username = $("#username").val();
	var old_pass = $("#old_pass").val();
	var new_pass = $("#new_pass").val();
	var new_pass_confirm = $("#new_pass_conf").val();
	if(new_pass != new_pass_confirm)
		Materialize.toast("Le due nuove password non corrispondono!",2000);
	else{
		var stringaR = "u="+getCookie("username")+"&p="+old_pass;
		var query = "script_php/login.php?"+stringaR ;
		$.ajax({
		      url: query,
		      async:false,
		      success: function(data) {
		        if(data==null){
			        Materialize.toast('Vecchia password errata!', 2000);
				   return false;
		        }else{
			        $.ajax({
				      url: "script_php/updateProfile.php", //Relative or absolute path to response.php file
				      type:"POST",
				      async:false,
				      data:{
					      'username': username,
					      'old_password':old_pass,
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
		    },
		      error: function(xhr){
		       alert("errore: "+xhr.status);
		      }
		    });
		
		
	}
}