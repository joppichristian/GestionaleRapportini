$(document).ready(function(){
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
		addCliente();
	});
});


function addCliente(){
		if($("#nominativo").val() == "")
			return false;
		var nominativo = $("#nominativo").val();
		var indirizzo = $("#indirizzo").val();
		var citta = $("#citta").val();
		var cap = $("#cap").val();
		var provincia = $("#prov").val();
		var telefono = $("#telephone").val();
		var cellulare = $("#mobile").val();
		var codice_fiscale = $("#code").val();
		var p_iva = $("#iva").val();
		var email = $("#email").val();
		var sito = $("#site").val();
		var note = $("#note").val();
		var tipologia = $("#tipologia").val();
		$.ajax({
	      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/postClients.php", //Relative or absolute path to response.php file
	      type:"POST",
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
		      'tipologia':tipologia
		   },
		   success: function(data){
			   alert("success");
			   Materialize.toast('Cliente inserito', 4000);
			   window.location.replace("http://stackoverflow.com");
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			    alert(textStatus);
			    window.location.replace("http://stackoverflow.com");
			    return false;

			}
		});		
}