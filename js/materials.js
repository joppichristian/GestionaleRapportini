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
		explodeMateriale(json[0]);	
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

		explodeMateriale(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];      
	        explodeMateriale(json[index]);      
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}
function explodeMateriale(materiale){
	$("#modifica_materiale").hide();
	$("#info").show();
	$("#codice").empty();
	$("#descrizione").empty();
	$("#prezzo").empty();
	$("#costo").empty();
	$("#note").empty();
	$("#logo_materiale").empty();
	
	$("#logo_materiale").append('<i id="logo_materiale" class="large material-icons red-text">local_play</i>');
	$("#descrizione").append('<div class="red-text" style="margin-left:15%;">Descrizione </div><i class="info small material-icons red-text">dehaze</i>'+materiale['descrizione']);
    if(materiale['codice'] != null && materiale['codice'] != "")
       $("#codice").append('<div class="red-text" style="margin-left:15%;">Codice</div><i class="info small material-icons red-text">code</i>'+materiale['codice']);
	if(materiale['prezzo'] != null && materiale['prezzo'] != "")
       $("#prezzo").append('<div class="red-text" style="margin-left:15%;">Prezzo</div><i class="info small material-icons red-text">attach_money</i>'+materiale['prezzo']+ '&euro;');
    if(materiale['costo'] != null && materiale['costo'] != "") 
		$("#costo").append('<div class="red-text" style="margin-left:15%;">Costo</div><i class="info small material-icons red-text">attach_money</i>'+materiale['costo']+ '&euro;');
    if(materiale['note'] != null && materiale['note'] != "")
       $("#note").append('<div class="red-text" style="margin-left:15%;">Note</div><i class="info small material-icons red-text">chat_bubble</i>'+materiale['note']);
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
				      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/deleteMaterial.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id},
				      success: function(data) {
					      Materialize.toast('Materiale eliminato', 2000);
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
	if(json[index]['tipologia'] == 'p')
		$("#div_iva").hide();
	else
		$("#div_iva").show();
	$("#modifica_materiale").show();
	$("#info").hide();
	$("#form_codice").val(json[index]['codice']);
	$("#form_descrizione").val(json[index]['descrizione']);
	$("#form_descrizione").focus();
	$("#form_costo").val(json[index]['costo']);
	$("#form_costo").focus();
	$("#form_prezzo").val(json[index]['prezzo']);
	$("#form_prezzo").focus();
	$("#form_note").val(json[index]['note']);
	$("#form_note").focus();
	$("#form_codice").focus();
	
	}
function modifyMateriale(){
	var codice = $("#form_codice").val();
	var descrizione = $("#form_descrizione").val();
	var prezzo = $("#form_prezzo").val();
	var costo = $("#form_costo").val();
	var note = $("#form_note").val();

	$.ajax({
	     url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/updateMaterials.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'codice':codice,
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note,
		      'id':json[index]['id']
		   },
		   success: function(data){
			   Materialize.toast('Materiale modificato', 2000,'',function(){populateList("");});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});		
}
