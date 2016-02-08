var json_clienti = new Array();
var index=0;
var id=0;
var json_materiali = new Array();
var json_mezzi = new Array();
var materiali_selezionati = new Array();
var mezzi_selezionati = new Array();
var clienti_selezionati = new Array();

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#lista_sel_dip").hide();


    populateListEmployee("");
    $("#search_dip").on('input',function() {
  		var tmp = $("#search_dip").val();
  		populateList(tmp);
  	});

    populateListMaterials("");
    $("#search_materiale").on('input',function(){
  		populateListMaterials($("#search_materiale").val());
  	});

		populateListMezzi("");
		$("#search_mezzo").on('input',function(){
			populateListMezzi($("#search_mezzo").val());
		});

		$('#complete').click(function(){
			if($('#nuovo_ora_inizio').val() != '' && $('#nuovo_ora_fine').val() != '' && $('#nuovo_pausa').val() >= 0 && $('#nuovo_pausa').val() <= 120 && $('#nuovo_giorno').val() != '' && $('#nuovo_giorno').val().length == 10){
				var spl = $('#nuovo_ora_inizio').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1]) || spl[0]== '' ||spl[1]== ''|| spl.length!=2)
				{
					Materialize.toast("Ora di inizio non valida...utilizza hh:mm!",2000);
					return false;
				}
				spl = $('#nuovo_ora_fine').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1]) || spl[0]== '' ||spl[1]== ''|| spl.length!=2)
				{
					Materialize.toast("Ora di fine non valida...utilizza hh:mm!",2000);
					return false;
				}

				spl = $('#mod_giorno').val().split('-');
				if(parseInt(spl[0]) < 1 || parseInt(spl[0]) > 31 || parseInt(spl[1]) < 1 || parseInt(spl[1]) > 12 || spl.length!=3)
				{
						Materialize.toast("Data non valida...utilizza dd-mm-yyyy!",2000);
						return false;
				}
				aggiungiRapportino();
			}
			else
			{
				if($('#nuovo_pausa').val() >= 0 && $('#nuovo_pausa').val() <= 120)
					Materialize.toast("Inserisci un'ora di inizio e un'ora di fine valida!",2000);
				else
					Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
			}

		});

		$('#nuovo_ora_inizio').on('input',function(){
			if(parseInt($('#nuovo_ora_inizio').val()) > 2  && $('#nuovo_ora_inizio').val().indexOf(':') < 0)
				$('#nuovo_ora_inizio').val($('#nuovo_ora_inizio').val()+':');
		});
		$('#nuovo_ora_fine').on('input',function(){
			if(parseInt($('#nuovo_ora_fine').val()) > 2  && $('#nuovo_ora_fine').val().indexOf(':') < 0)
				$('#nuovo_ora_fine').val($('#nuovo_ora_fine').val()+':');
		});
		$('#nuovo_ora_inizio').focusout(function(){
			if($('#nuovo_ora_inizio').val() != ''){
				var spl = $('#nuovo_ora_inizio').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1]) || spl[0]== '' ||spl[1]== '' || spl.length!=2)
				{
					Materialize.toast("Ora di inizio non valida...utilizza hh:mm!",2000);
					$('#nuovo_ora_inizio').focus();
				}
			}

		});
		$('#nuovo_giorno').focusout(function(){
			if($('#nuovo_giorno').val() != ''){
				var spl = $('#nuovo_giorno').val().split('-');
				if(parseInt(spl[0]) < 1 || parseInt(spl[0]) > 31 || parseInt(spl[1]) < 1 || parseInt(spl[1]) > 12 || spl.length!=3)
				{
					Materialize.toast("Data non valida...utilizza dd-mm-yyyy!",2000);
					$('#nuovo_giorno').focus();
				}

			}

		});

		$('#nuovo_ora_fine').focusout(function(){
			if($('#nuovo_ora_fine').val() != ''){
				var spl = $('#nuovo_ora_fine').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1])|| spl[0]== '' ||spl[1]== ''|| spl.length!=2)
				{
					Materialize.toast("Ora di fine non valida...utilizza hh:mm!",2000);
					$('#nuovo_ora_fine').focus();
				}

			}
		});
		$('#nuovo_pausa').focusout(function(){
			if($('#nuovo_pausa').val() < 0 || $('#nuovo_pausa').val() > 120 || isNaN($('#nuovo_pausa').val())){
				Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
				$('#nuovo_pausa').focus();
			}

		});


});


function populateListEmployee(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getClients.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_clienti = data;
        var elementi = new Array();
         $("#elenco_dip").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item blue-grey lighten-5";
	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_walk</i>'+data[i]['nominativo']+ '<a href="#!" style="position: absolute; right: 16px;" class=""><i class="select_employee material-icons orange-text">add</i></a></div>	';


	    	$("#elenco_dip").append(elementi[i]);


	    }
	    id = data[0]['id'];
		$(".select_employee").click(function(){
				 index_Di = $(".select_employee").index(this);
				 id_Di = json_clienti[index_Di]['id'];
				 var duplicato = -1;
		        for(var i=0;i<clienti_selezionati.length;i++){
			        if(clienti_selezionati[i]['id'] == json_clienti[index_Di]['id']){
			        	duplicato = i;
			        }
		        }
		        if(duplicato < 0){
		            clienti_selezionati.push({'id':id_Di,'descrizione':json_clienti[index_Di]['nominativo']});
		        updateListUtilizzi();
		        Materialize.toast("Cliente aggiunto!",2000);

		    }
		});
      },
      error: function(xhr){
	     (xhr.status);
        return false;
      }
    });

    //return false;

}


function populateListMaterials(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getMaterials.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_materiali = data;
        var elementi = new Array();
         $("#elenco_materiali").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item blue-grey lighten-5";

	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">local_play</i>'+(data[i]['codice']+' - '+data[i]['descrizione']).substr(0,24)+'<a href="#!" style="position: absolute; right: 16px;"><i class="select_materials material-icons orange-text">add</i></a></div>	';


	    	$("#elenco_materiali").append(elementi[i]);
			id_Ma = data[0]['id'];




	    }
	    $(".select_materials").click(function(){
			if($('#quantita_materiale').val()!= ""){
		        index_Ma = $(".select_materials").index(this);
		        id_Ma = json_materiali[index_Ma]['id'];
		        var duplicato = -1;
		        var quantita_duplicato = -1;
		        for(var i=0;i<materiali_selezionati.length;i++){
			        if(materiali_selezionati[i]['id'] == json_materiali[index_Ma]['id']){
			        	duplicato = i;
			        	quantita_duplicato = materiali_selezionati[i]['quantita'];
			        }
		        }

		        if(duplicato > -1){
			        materiali_selezionati.splice(duplicato,1);
		        	materiali_selezionati.push({'id':id_Ma,'descrizione':json_materiali[index_Ma]['descrizione'],'quantita':quantita_duplicato+parseFloat($('#quantita_materiale').val())});
		        }else
		            materiali_selezionati.push({'id':id_Ma,'descrizione':json_materiali[index_Ma]['descrizione'],'quantita':parseFloat($('#quantita_materiale').val())});
		        updateListUtilizzi();
		        Materialize.toast("Materiale aggiunto!",2000);

		    }else{
			    Materialize.toast("Inserire una quantita valida!",2000);
			    $('#quantita_materiale').focus();
		    }

	        });
	  }
	});
}

function updateListUtilizzi(){
	$("#elenco_utilizzi_materiali").show();
	$("#elenco_utilizzi_mezzi").show();
	$("#lista_sel_dip").show();

	if(materiali_selezionati.length == 0)
		$("#elenco_utilizzi_materiali").hide();
	if(mezzi_selezionati.length == 0)
		$("#elenco_utilizzi_mezzi").hide();
	if(clienti_selezionati.length == 0)
		$("#lista_sel_dip").hide();
	$("#elenco_utilizzi_materiali").empty();
	$("#elenco_utilizzi_mezzi").empty();
	$("#lista_sel_dip").empty();
	var chip = new Array();
	for(var i=0; i < materiali_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=materiali_selezionati[i]['descrizione'] + '&nbsp; x' + materiali_selezionati[i]['quantita']+'<a href="#!" ><i class="remove_materiale material-icons orange-text">remove_circle</i></a>';
  		$("#elenco_utilizzi_materiali").append(chip[i]);

	}
	for(var i=0; i < mezzi_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mezzi_selezionati[i]['descrizione'] + '&nbsp; x' + mezzi_selezionati[i]['quantita']+'h <a href="#!" ><i class="remove_mezzo material-icons orange-text">remove_circle</i></a>';
  		$("#elenco_utilizzi_mezzi").append(chip[i]);

	}
	for(var i=0; i < clienti_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=clienti_selezionati[i]['descrizione']+'<a href="#!" ><i class="remove_dipendente material-icons orange-text">remove_circle</i></a>';
  		$("#lista_sel_dip").append(chip[i]);

	}
	$(".remove_dipendente").click(function(){
		removeDipendente($(".remove_dipendente").index(this));
		updateListUtilizzi();
	});
	$(".remove_materiale").click(function(){
		removeMateriale($(".remove_materiale").index(this));
		updateListUtilizzi();
	});
	$(".remove_mezzo").click(function(){
		removeMezzo($(".remove_mezzo").index(this));
		updateListUtilizzi();
	});
}

function removeMateriale(i){

		 materiali_selezionati.splice(i,1);
}

function populateListMezzi(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getMezzi.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_mezzi = data;
        var elementi = new Array();
         $("#elenco_mezzi").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item blue-grey lighten-5";

	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_bus</i>'+data[i]['descrizione']+'<a style="position: absolute; right: 16px;" href="#!" ><i class="select_mezzi material-icons orange-text">add</i></a></div>	';


	    	$("#elenco_mezzi").append(elementi[i]);
			id_Me = data[0]['id'];




	    }
	    $(".select_mezzi").click(function(){
		    if($('#quantita_mezzo').val()!= ""){
		        index_Me = $(".select_mezzi").index(this);
		        id_Me = json_mezzi[index_Me]['id'];
		        var duplicato = -1;
		        var quantita_duplicato = -1;
		        for(var i=0;i<mezzi_selezionati.length;i++){
			        if(mezzi_selezionati[i]['id'] == json_mezzi[index_Me]['id']){
			        	duplicato = i;
			        	quantita_duplicato = mezzi_selezionati[i]['quantita'];
			        }
		        }

		        if(duplicato > -1){
			        mezzi_selezionati.splice(duplicato,1);
		        	mezzi_selezionati.push({'id':id_Me,'descrizione':json_mezzi[index_Me]['descrizione'],'quantita':quantita_duplicato+parseFloat($('#quantita_mezzo').val())});
		        }else
		            mezzi_selezionati.push({'id':id_Me,'descrizione':json_mezzi[index_Me]['descrizione'],'quantita':parseFloat($('#quantita_mezzo').val())});
		        updateListUtilizzi();
		        Materialize.toast("Mezzo aggiunto!",2000);
		    }else{
			    Materialize.toast("Inserire una quantita valida!",2000);
			    $('#quantita_mezzo').focus();
		    }
	    });

	   }
    });
 }

 function removeMezzo(i){
 		 mezzi_selezionati.splice(i,1);
 }
function removeDipendente(i){
 		 clienti_selezionati.splice(i,1);
 }

 function aggiungiRapportino(){
	 if(clienti_selezionati.length==0){
		Materialize.toast("Nessun cliente aggiunto",2000);
		return false;

	 }
	 var result = true;
	for(var i=0;i<clienti_selezionati.length;i++){
		if(i==0)
		{
			$.ajax({
		       type:"POST",
		       url: "script_php/postRapportinoCliente.php", //Relative or absolute path to response.php file
		       async:false,
		       data:{
			    'data': $('#nuovo_giorno').val(),
		 	  	'ora_inizio': $('#nuovo_ora_inizio').val(),
		 	  	'ora_fine': $('#nuovo_ora_fine').val(),
		 	  	'pausa': $('#nuovo_pausa').val(),
		 	  	'note':$('#nuovo_descrizione').val(),
		 	  	'cliente':clienti_selezionati[i]['id'],
		 	  	'dipendente':id_utente,
		 	  	'db':getCookie('nomeDB'),
		 	  	'materiali':materiali_selezionati,
		 	  	'mezzi':mezzi_selezionati
		 	  },
		       success: function(data) {
		 		},
		 		error:function(data){
			 		result = false;
		 		}
		 	});

		}
		else{
			$.ajax({
		       type:"POST",
		       url: "script_php/postRapportinoCliente.php", //Relative or absolute path to response.php file
		       async:false,
		       data:{
			    'data': $('#nuovo_giorno').val(),
		 	  	'ora_inizio': $('#nuovo_ora_inizio').val(),
		 	  	'ora_fine': $('#nuovo_ora_fine').val(),
		 	  	'pausa': $('#nuovo_pausa').val(),
		 	  	'note':$('#nuovo_descrizione').val(),
		 	  	'cliente':clienti_selezionati[i]['id'],
		 	  	'dipendente':id_utente,
		 	  	'db':getCookie('nomeDB'),
		 	  	'materiali':null,
		 	  	'mezzi':null
		 	  },
		       success: function(data) {
		 		},
		 		error:function(data){
			 		result = false;
		 		}
		 	});

		}
	}
	if(result){
		Materialize.toast("Rapportino Inserito",2000,"",function(){$("#new_insert_item").hide();populateRapportino(id_utente);});
	}
	else{
		Materialize.toast("Errore: Rapportino NON Inserito",2000);
	}

 }
