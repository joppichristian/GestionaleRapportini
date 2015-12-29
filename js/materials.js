var json = new Array();
var index=0;
var id=0;

$(document).ready(function() {
	$("#info").show();
	$("#modifica_materiale").hide();
	$("#start_search").click( function() {
		var tmp = $("#search").val();
		tmp = "descrizione like '%"+tmp+"%' or codice like '%"+tmp+"%'";
		populateList(tmp);
	});
	$("#modify").click( function() {
		completaForm();	
	});
	$("#invia_dati").click( function() {
		modifyMateriale();	
	});
	$("#annulla_modify").click( function() {
		explodeClient(json[0]);	
	});
	$("#delete").click( function() {
		deleteMateriale();
	});
	populateList("");

});


function populateList(filter){

	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getMaterials.php?q= "+ q, //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        
		    elementi[i].innerHTML = '<div><i class="info small material-icons red-text">local_play</i>'+data[i]['codice']+' - '+data[i]['descrizione']+'<a href="#!" class="secondary-content"><i class="explode material-icons red-text">call_received</i></a></div>	';
	        

	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];

		explodeMaterial(data[0]);
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
function explodeMaterial(materiale){
	$("#modifica_materiale").hide();
	$("#info").show();
	$("#codice").empty();
	$("#descrizione").empty();
	$("#prezzo").empty();
	$("#costo").empty();
	$("#note").empty();
	$("#logo_materiale").empty();
	
	$("#logo_materiale").append('<i id="logo_materiale" class="large material-icons red-text">local_play</i>');
	$("#descrizione").append('<i class="info small material-icons red-text">dehaze</i>'+materiale['descrizione']);
    if(materiale['codice'] != null && materiale['codice'] != "")
       $("#codice").append('<i class="info small material-icons red-text">code</i>'+materiale['codice']);
	if(materiale['prezzo'] != null && materiale['prezzo'] != "")
       $("#prezzo").append('<i class="info small material-icons red-text">attach_money</i>'+materiale['prezzo']+ '&euro;');
    if(materiale['costo'] != null && materiale['costo'] != "") 
		$("#costo").append('<i class="info small material-icons red-text">attach_money</i>'+materiale['costo']+ '&euro;');
      if(materiale['note'] != null && materiale['note'] != "")
       $("#note").append('<i class="info small material-icons red-text">chat_bubble</i>'+materiale['note']);

}

function deleteMateriale(){
	$.confirm({
				title: 'Elimino Materiale',
				confirmButton: 'Elimina',
				cancelButton: 'Annulla',
				content: 'Sei sicuro di voler eliminare il Materiale?',
				theme: 'supervan',
				confirmButtonClass: 'btn-info',
				animation:'RotateY',
				animationSpeed: 1000,
				confirm: function () {
					$.ajax({
				      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/deleteClient.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id},
				      success: function(data) {
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
	$("#modifica_materiale").show();
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
function modifyMateriale(){
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
	     url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/updateClients.php", //Relative or absolute path to response.php file
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
		      'id':json[index]['id']
		   },
		   success: function(data){
			   alert("success");
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			    alert(textStatus);
			    window.location.replace("http://stackoverflow.com");
			    return false;

			}
		});		
}
