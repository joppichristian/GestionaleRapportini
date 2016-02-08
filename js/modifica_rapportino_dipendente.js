var mod_json = new Array();
var mod_index=0;
var mod_id=0;
var mod_json_materiali = new Array();
var mod_json_mezzi = new Array();
var mod_materiali_selezionati = new Array();
var mod_mezzi_selezionati = new Array();
var mod_dipendenti_selezionati = new Array();

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");



    mod_populateListMaterials("");
    $("#mod_search_materiale").on('input',function(){
  		mod_populateListMaterials($("#mod_search_materiale").val());
  	});

		mod_populateListMezzi("");
		$("#mod_search_mezzo").on('input',function(){
			mod_populateListMezzi($("#mod_search_mezzo").val());
		});

	$('#yes_modifica').click(function(){
			if($('#mod_ora_inizio').val() != '' && $('#mod_ora_fine').val() != '' && $('#mod_pausa').val() >= 0 && $('#mod_pausa').val() <= 120 && $('#mod_giorno').val() != '' && $('#mod_giorno').val().length == 10){
				var spl = $('#mod_ora_inizio').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1]) || spl[0]== '' ||spl[1]== ''|| spl.length!=2)
				{
					Materialize.toast("Ora di inizio non valida...utilizza hh:mm!",2000);
					return false;
				}
				spl = $('#mod_ora_fine').val().split(':');
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




				modificaRapportino();
			}
			else
			{
				if($('#mod_pausa').val() >= 0 && $('#mod_pausa').val() <= 120)
					Materialize.toast("Inserisci un'ora di inizio e un'ora di fine valida!",2000);
				else
					Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
			}

		});
		$('#no_modifica').click(function(){
			$('#modal1').closeModal();
		});
		$('#mod_ora_inizio').on('input',function(){
			if(parseInt($('#mod_ora_inizio').val()) > 2  && $('#mod_ora_inizio').val().indexOf(':') < 0)
				$('#mod_ora_inizio').val($('#mod_ora_inizio').val()+':');
		});
		$('#mod_ora_fine').on('input',function(){
			if(parseInt($('#mod_ora_fine').val()) > 2  && $('#mod_ora_fine').val().indexOf(':') < 0)
				$('#mod_ora_fine').val($('#mod_ora_fine').val()+':');
		});
		$('#mod_ora_inizio').focusout(function(){
			if($('#mod_ora_inizio').val() != ''){
				var spl = $('#mod_ora_inizio').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1]) || spl[0]== '' ||spl[1]== '' || spl.length!=2)
				{
					Materialize.toast("Ora di inizio non valida...utilizza hh:mm!",2000);
					$('#mod_ora_inizio').focus();
				}
			}

		});
		$('#mod_giorno').focusout(function(){
			if($('#mod_giorno').val() != '' ){
				var spl = $('#mod_giorno').val().split('-');
				if(parseInt(spl[0]) < 1 || parseInt(spl[0]) > 31 || parseInt(spl[1]) < 1 || parseInt(spl[1]) > 12 || spl.length!=3)
				{
					Materialize.toast("Data non valida...utilizza dd-mm-yyyy!",2000);
					$('#mod_giorno').focus();
				}

			}
		});

		$('#mod_ora_fine').focusout(function(){
			if($('#mod_ora_fine').val() != ''){
				var spl = $('#mod_ora_fine').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || isNaN(spl[0]) || isNaN(spl[1])|| spl[0]== '' ||spl[1]== ''|| spl.length!=2)
				{
					Materialize.toast("Ora di fine non valida...utilizza hh:mm!",2000);
					$('#mod_ora_fine').focus();
				}

			}
		});
		$('#mod_pausa').focusout(function(){
			if($('#mod_pausa').val() < 0 || $('#mod_pausa').val() > 120 || isNaN($('#mod_pausa').val())){
				Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
				$('#mod_pausa').focus();
			}

		});


});

function setVarRapp(index_rapp){
  var data = (det_json[index_rapp]['inizio']).split(' ')[0];
  data = data.split("-").reverse().join("-");
  var inizio = (det_json[index_rapp]['inizio']).split(' ')[1].substr(0, 5);
  var fine = (det_json[index_rapp]['fine']).split(' ')[1].substr(0, 5);
  var descr = det_json[index_rapp]['note'];
  var pausa = det_json[index_rapp]['pausa'];
  var dipendente_nome = datiCliente(det_json[index_rapp]['id_cliente']);
  mod_setDipendenti(dipendente_nome);
  $("#mod_giorno").val(data);
  $("#mod_ora_inizio").val(inizio);
  $("#mod_ora_fine").val(fine);
  $("#mod_descrizione").val(descr);
  $("#mod_pausa").val(pausa);

  $("#mod_ora_inizio").focus();
  $("#mod_ora_fine").focus();
  $("#mod_descrizione").focus();
  $("#mod_pausa").focus();
  $("#mod_giorno").focus();
  mod_id = det_json[index_rapp]['id'];
  load_Materials(det_json[index_rapp]['id']);
  load_Mezzi(det_json[index_rapp]['id']);
  mod_updateListUtilizzi();
}

function load_Materials(id_rapportino){
	mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	$.ajax({
      dataType: "json",
      url: "script_php/getMaterialsRapportino.php?id="+ id_rapportino+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_materiali_selezionati.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'quantita':parseFloat(data[i]['quantita'])});


	   	 }
	   },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}
function load_Mezzi(id_rapportino){
	mod_mezzi_selezionati.splice(0,mod_mezzi_selezionati.length);
	$.ajax({
      dataType: "json",
      url: "script_php/getMezziRapportino.php?id="+ id_rapportino+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_mezzi_selezionati.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'quantita':parseFloat(data[i]['quantita'])});


	   	 }

	   },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}

function mod_setDipendenti(dipendente){
	$("#mod_lista_sel_dip").empty();
  $("#mod_lista_sel_dip").append('<div class="chip section">'+dipendente+'</div> ');

}

function mod_populateListMaterials(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getMaterials.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    mod_json_materiali = data;
        var elementi = new Array();
         $("#mod_elenco_materiali").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item blue-grey lighten-5";

	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">local_play</i>'+(data[i]['codice']+' - '+data[i]['descrizione']).substr(0,24)+'<a href="#!" style="position: absolute; right: 16px;"><i class="mod_select_materials material-icons orange-text">add</i></a></div>	';


	    	$("#mod_elenco_materiali").append(elementi[i]);
			  mod_id_Ma = data[0]['id'];




	    }
	    $(".mod_select_materials").click(function(){
      //alert("cliccato sul pulsante");
			if($('#mod_quantita_materiale').val()!= ""){
            //alert("quantita materiale selzionato: "+$('#quantita_materiale').val());
		        mod_index_Ma = $(".mod_select_materials").index(this);
		        mod_id_Ma = mod_json_materiali[mod_index_Ma]['id'];
		        var mod_duplicato = -1;
		        var mod_quantita_duplicato = -1;
		        for(var i=0;i<mod_materiali_selezionati.length;i++){
			        if(mod_materiali_selezionati[i]['id'] == mod_json_materiali[mod_index_Ma]['id']){
			        	mod_duplicato = i;
			        	mod_quantita_duplicato = mod_materiali_selezionati[i]['quantita'];
			        }
		        }

		        if(mod_duplicato > -1){
			        mod_materiali_selezionati.splice(mod_duplicato,1);
		        	mod_materiali_selezionati.push({'id':mod_id_Ma,'descrizione':mod_json_materiali[mod_index_Ma]['descrizione'],'quantita':mod_quantita_duplicato+parseFloat($('#mod_quantita_materiale').val())});
		        }else
		            mod_materiali_selezionati.push({'id':mod_id_Ma,'descrizione':mod_json_materiali[mod_index_Ma]['descrizione'],'quantita':parseFloat($('#mod_quantita_materiale').val())});
		        mod_updateListUtilizzi();
		        Materialize.toast("Materiale aggiunto!",2000);

		    }else{
			    Materialize.toast("Inserire una quantita valida!",2000);
			    $('#quantita_materiale').focus();
		    }

	        });
	  }
	});
}

function mod_updateListUtilizzi(){
	$("#mod_elenco_utilizzi_materiali").empty();
	$("#mod_elenco_utilizzi_mezzi").empty();
	$("#mod_elenco_utilizzi_materiali").show();
	$("#mod_elenco_utilizzi_mezzi").show();
	if(mod_materiali_selezionati.length == 0)
		$("#mod_elenco_utilizzi_materiali").hide();
	if(mod_mezzi_selezionati.length == 0)
		$("#mod_elenco_utilizzi_mezzi").hide();
	$("#mod_elenco_utilizzi_materiali").empty();
	$("#mod_elenco_utilizzi_mezzi").empty();
	var chip = new Array();
	for(var i=0; i < mod_materiali_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_materiali_selezionati[i]['descrizione'] + '&nbsp; x' + mod_materiali_selezionati[i]['quantita']+'<a href="#!" ><i class="mod_remove_materiale material-icons orange-text">remove_circle</i></a>';
  		$("#mod_elenco_utilizzi_materiali").append(chip[i]);

	}
	for(var i=0; i < mod_mezzi_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_mezzi_selezionati[i]['descrizione'] + '&nbsp; x' + mod_mezzi_selezionati[i]['quantita']+'h <a href="#!" ><i class="mod_remove_mezzo material-icons orange-text">remove_circle</i></a>';
  		$("#mod_elenco_utilizzi_mezzi").append(chip[i]);

	}
	$(".mod_remove_materiale").click(function(){
		mod_removeMateriale($(".mod_remove_materiale").index(this));
		mod_updateListUtilizzi();
	});
	$(".mod_remove_mezzo").click(function(){
		mod_removeMezzo($(".mod_remove_mezzo").index(this));
		mod_updateListUtilizzi();
	});
}

function mod_removeMateriale(i){

		 mod_materiali_selezionati.splice(i,1);
}

function mod_populateListMezzi(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getMezzi.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    mod_json_mezzi = data;
        var elementi = new Array();
         $("#mod_elenco_mezzi").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item blue-grey lighten-5";

	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_bus</i>'+data[i]['descrizione']+'<a style="position: absolute; right: 16px;" href="#!" ><i class="mod_select_mezzi material-icons orange-text">add</i></a></div>	';


	    	$("#mod_elenco_mezzi").append(elementi[i]);
			mod_id_Me = data[0]['id'];




	    }
	    $(".mod_select_mezzi").click(function(){
		    if($('#mod_quantita_mezzo').val()!= ""){
		        mod_index_Me = $(".mod_select_mezzi").index(this);
		        mod_id_Me = mod_json_mezzi[mod_index_Me]['id'];
		        var duplicato = -1;
		        var quantita_duplicato = -1;
		        for(var i=0;i<mod_mezzi_selezionati.length;i++){
			        if(mod_mezzi_selezionati[i]['id'] == mod_json_mezzi[mod_index_Me]['id']){
			        	duplicato = i;
			        	quantita_duplicato = mod_mezzi_selezionati[i]['quantita'];
			        }
		        }

		        if(duplicato > -1){
			        mod_mezzi_selezionati.splice(duplicato,1);
		        	mod_mezzi_selezionati.push({'id':mod_id_Me,'descrizione':mod_json_mezzi[mod_index_Me]['descrizione'],'quantita':mod_quantita_duplicato+parseFloat($('#mod_quantita_mezzo').val())});
		        }else
		            mod_mezzi_selezionati.push({'id':mod_id_Me,'descrizione':mod_json_mezzi[mod_index_Me]['descrizione'],'quantita':parseFloat($('#mod_quantita_mezzo').val())});
		        mod_updateListUtilizzi();
		        Materialize.toast("Mezzo aggiunto!",2000);
		    }else{
			    Materialize.toast("Inserire una quantita valida!",2000);
			    $('#mod_quantita_mezzo').focus();
		    }
	    });

	   }
    });
 }

 function mod_removeMezzo(i){
 		 mod_mezzi_selezionati.splice(i,1);
 }

function mod_controlloRapCliente(){

}

 function modificaRapportino(){
 	$.ajax({
       type:"POST",
       url: "script_php/updateRapportino.php", //Relative or absolute path to response.php file
       async:false,
       data:{
	    'data':$('#mod_giorno').val(),
 	  	'ora_inizio': $('#mod_ora_inizio').val(),
 	  	'ora_fine': $('#mod_ora_fine').val(),
 	  	'pausa': $('#mod_pausa').val(),
 	  	'note':$('#mod_descrizione').val(),
 	  	'db':getCookie('nomeDB'),
 	  	'id':mod_id,
 	  	'materiali':mod_materiali_selezionati,
 	  	'mezzi':mod_mezzi_selezionati
 	  },
       success: function(data) {
 	    console.log(data);
 	  	Materialize.toast("Rapportino modificato",2000,"",function(){$("#modal1").closeModal();populateRapportino(id_utente);})
 		}
 	});

 }
