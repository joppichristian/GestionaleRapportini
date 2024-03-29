var json = new Array();
var index=0;
var id=0;
var rapp = new Array();

$(document).ready(function() {
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	
	
	if(getCookie("cME")==0)
		$("#cME").hide();
	else
		$("#cME").show();
	
	if(getCookie("aME")==0)
		$("#aME").hide();
	else
		$("#aME").show();
		
	if(getCookie("mME")==0)
		$("#mME").hide();
	else
		$("#mME").show();

	$("#info").show();
	$("#modifica_mezzo").hide();
	$("#search").on('input',function() {
		var tmp = $("#search").val();
		populateList(tmp);
	});
	$("#modify").click( function() {
		completaForm();	
	});
	$("#invia_dati").click( function() {
		modifyMezzo();	
	});
	$("#annulla_modify").click( function() {
		explodeMezzo(json[0]);	
	});
	$("#delete").click( function() {
		$("#modal_cancellazione").openModal();
	});
	$("#yes").click(function(){
		$("#modal_cancellazione").closeModal();
		deleteCheck();
	});
	$("#no").click(function(){
		$("#modal_cancellazione").closeModal();
	});	
	
	$("#no_del").click(function(){
		$("#modal_check").closeModal();
	});
	$("#yes_del").click(function(){
		$("#modal_check").closeModal();
		deleteMezzo();
		deleteUtilizzo();
	});

	populateList("");

});


function populateList(filter){

	$.ajax({
      dataType: "json",
      url: "script_php/getMezzi.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        
	        elementi[i].innerHTML = '<div class="explode"><i class="info small material-icons brown-text">directions_bus</i>'+data[i]['descrizione']+'<a href="#!" class="secondary-content"><i class="material-icons brown-text">call_received</i></a></div>	';
	    	
	    	
	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];

		explodeMezzo(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];      
	        explodeMezzo(json[index]);      
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}
function explodeMezzo(mezzo){
	$("#modifica_mezzo").hide();
	$("#info").show();
	$("#descrizione").empty();
	$("#prezzo").empty();
	$("#costo").empty();
	$("#note").empty();
	$("#logo_mezzo").empty();
	
	$("#logo_mezzo").append('<i id="logo_mezzo" class="large material-icons brown-text">directions_bus</i>');
	$("#descrizione").append('<div class="brown-text" style="margin-left:15%;">Descrizione </div><i class="info small material-icons brown-text">dehaze</i>'+mezzo['descrizione']);
   	if(mezzo['prezzo'] != null && mezzo['prezzo'] != "")
       $("#prezzo").append('<div class="brown-text" style="margin-left:15%;">Prezzo</div><i class="info small material-icons brown-text">attach_money</i>'+mezzo['prezzo']+ '&euro;');
    if(mezzo['costo'] != null && mezzo['costo'] != "") 
		$("#costo").append('<div class="brown-text" style="margin-left:15%;">Costo</div><i class="info small material-icons brown-text">attach_money</i>'+mezzo['costo']+ '&euro;');
    if(mezzo['note'] != null && mezzo['note'] != "")
       $("#note").append('<div class="brown-text" style="margin-left:15%;">Note</div><i class="info small material-icons brown-text">chat_bubble</i>'+mezzo['note']);
}

function deleteCheck(){
	if(getCookie("cME")==0)
		return;
	
	$.ajax({
		url: "script_php/check.php", //Relative or absolute path to response.php file
	      type:"POST",	
	      data:{
		      'slVLS': "utilizzo_risorse.id_materiale_mezzo",
		      'tb1': "mezzi",
		      'tb2':"utilizzo_risorse",
		      'fl1':"mezzi.id",
		      'fl2':"id_materiale_mezzo",
		      'WH':"mezzi.id = "+id +" and utilizzo_risorse.tipologia = 'me'",
		      'db':getCookie('nomeDB')
		   },
		  success: function(data) {
		    rapp = data;
		    if(data == null){
				deleteMezzo();
		    }
		    else{
			    $("#modal_check").openModal();
		    }
		  
		    
		  },
	      error: function(data){
		     console.log(data);
	      }
    });

}

function deleteUtilizzo(){
	for(var i=0;i<rapp.length;i++)
			$.ajax({
				url: "script_php/deleteUtilizzo.php", //Relative or absolute path to response.php file
				type:"POST",
						      data:{'id': rapp[i]['id'],'tipo':'me','db':getCookie('nomeDB')},
						      success: function(data) {
							  },
						      error: function(xhr){
							     console.log(xhr.status);
						      }
				    });
}


function deleteMezzo(){
if(getCookie("cME")==0)
		return;
					$.ajax({
				      url: "script_php/deleteMezzi.php", //Relative or absolute path to response.php file
				      type:"POST",
				      data:{'id': id,'db':getCookie('nomeDB')},
				      success: function(data) {
					      Materialize.toast('Mezzo eliminato', 2000);
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
	$("#modifica_mezzo").show();
	$("#info").hide();
	$("#form_descrizione").val(json[index]['descrizione']);
	$("#form_costo").val(json[index]['costo']);
	$("#form_costo").focus();
	$("#form_prezzo").val(json[index]['prezzo']);
	$("#form_prezzo").focus();
	$("#form_note").val(json[index]['note']);
	$("#form_note").focus();
	$("#form_descrizione").focus();
	}
function modifyMezzo(){
	var descrizione = $("#form_descrizione").val();
	var prezzo = $("#form_prezzo").val();
	var costo = $("#form_costo").val();
	var note = $("#form_note").val();

	$.ajax({
	     url: "script_php/updateMezzi.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'descrizione':descrizione,
		      'prezzo':prezzo,
		      'costo':costo,
		      'note':note,
		      'id':json[index]['id'],
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){
			   Materialize.toast('Mezzo modificato', 2000,'',function(){populateList("");});
			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
		   		Materialize.toast('Errore di modifica', 2000);
			    return false;

			}
		});		
}
