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

    $("#mod_lista_sel_dip").hide();
    $("#mod_sezione_mat").hide();
		$("#mod_sezione_mezzi").hide();

    var id_mod_rap= localStorage.getItem("id_rapportino");
    alert("id_in modifica rapportino  "+id_mod_rap);
  	$("#mod_elenco_utilizzi_materiali").hide();
    var mod_stato_aggiungi_mat=0;

    $("#mod_aggiungi_mat").on("click",function(){
      if(mod_stato_aggiungi_mat==1){
        $("#mod_sezione_mat").hide();
        mod_stato_aggiungi_mat=0;
      }else{
        $("#mod_sezione_mat").show();
        mod_stato_aggiungi_mat=1;
      }
    });

		$("#mod_elenco_utilizzi_mezzi").hide();
    var mod_stato_aggiungi_mezzi=0;

    $("#mod_aggiungi_mezzi").on("click",function(){
      if(mod_stato_aggiungi_mezzi==1){
        $("#mod_sezione_mezzi").hide();
        mod_stato_aggiungi_mezzi=0;
      }else{
        $("#mod_sezione_mezzi").show();
        mod_stato_aggiungi_mezzi=1;
      }
    });

    $("#mod_sezione_dipendenti").hide();
    var mod_stato_aggiungi_dip=0;
    $("#mod_aggiungi_dip").on("click",function(){
      if(mod_stato_aggiungi_dip==1){
        $("#mod_sezione_dipendenti").hide();
        mod_stato_aggiungi_dip=0;
      }else{
        $("#mod_sezione_dipendenti").show();
        mod_stato_aggiungi_dip=1;
      }
    });

    mod_populateList("");
    $("#mod_search_dip").on('input',function() {
  		var mod_tmp = $("#mod_search_dip").val();
  		mod_populateList(mod_tmp);
  	});

    mod_populateListMaterials("");
    $("#mod_search_materiale").on('input',function(){
  		mod_populateListMaterials($("#mod_search_materiale").val());
  	});

		mod_populateListMezzi("");
		$("#mod_search_mezzo").on('input',function(){
			mod_populateListMezzi($("#mod_search_mezzo").val());
		});

		$('#mod_complete').click(function(){
			if($('#mod_ora_inizio').val() != '' && $('#mod_ora_fine').val() != '' && $('#mod_pausa').val() >= 0 && $('#mod_pausa').val() <= 120 ){
				var spl = $('#mod_ora_inizio').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || spl.length!=2)
				{
					Materialize.toast("Ora di inizio non valida...utilizza hh:mm!",2000);
					return false;
				}
				spl = $('#mod_ora_fine').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || spl.length!=2)
				{
					Materialize.toast("Ora di fine non valida...utilizza hh:mm!",2000);
					return false;
				}
				//controlloRapCliente();
			}
			else
			{
				if($('#mod_pausa').val() >= 0 && $('#mod_pausa').val() <= 120)
					Materialize.toast("Inserisci un'ora di inizio e un'ora di fine valida!",2000);
				else
					Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
			}

		});

});

function setVarRapp(id_rapp){
  alert("id_rapp : "+id_rapp);
  //document.getElementById("ore_tot").innerHTML = "ORE TOTALI: "+ore;
  //DEVO SETTARE I CAMPI PER LA MODIFICA SUCCESSIVA!

}

function mod_populateList(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    mod_json = data;
        console.log(data);
        var elementi = new Array();
         $("#mod_elenco_dip").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="#!" style="position: absolute; right: 16px;" class=""><i class="mod_explode material-icons orange-text">add</i></a></div>	';


	    	$("#mod_elenco_dip").append(elementi[i]);


	    }
	    mod_id = data[0]['id'];

		//mod_explodeDipendente(data[0]);
		$(".mod_explode").click(function(){
	        mod_index = $(".mod_explode").index(this);
	        mod_id = mod_json[mod_index]['id'];
          $("#mod_lista_sel_dip").show();
          mod_setDipendenti(mod_json[mod_index]);
	        //explodeDipendente(mod_json[index]);
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}

function mod_setDipendenti(dipendente){
//  alert("nome: "+dipendente['nome']);
  $("#mod_lista_sel_dip").append('<div class="chip">'+dipendente['nome']+ ' '+ dipendente['cognome']+'<i class="material-icons">close</i></div> ');

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
	        elementi[i].className ="collection-item";

	        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">local_play</i>'+(data[i]['codice']+' - '+data[i]['descrizione']).substr(0,24)+'<a href="#!" style="position: absolute; right: 16px;"><i class="mod_select_materials material-icons purple-text">add</i></a></div>	';


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
			        mod_materiali_selezionati.splice(duplicato,1);
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
		chip[i].innerHTML=mod_materiali_selezionati[i]['descrizione'] + '&nbsp; x' + mod_materiali_selezionati[i]['quantita']+'<a href="#!" ><i class="mod_remove_materiale material-icons purple-text">remove_circle</i></a>';
  		$("#mod_elenco_utilizzi_materiali").append(chip[i]);

	}
	for(var i=0; i < mod_mezzi_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_mezzi_selezionati[i]['descrizione'] + '&nbsp; x' + mod_mezzi_selezionati[i]['quantita']+'h <a href="#!" ><i class="mod_remove_mezzo material-icons purple-text">remove_circle</i></a>';
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
	        elementi[i].className ="collection-item";

	        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">directions_bus</i>'+data[i]['descrizione']+'<a style="position: absolute; right: 16px;" href="#!" ><i class="mod_select_mezzi material-icons purple-text">add</i></a></div>	';


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

 function mod_aggiungiRapportino(){
 	$.ajax({
       type:"POST",
       url: "script_php/postRapportinoRapido.php", //Relative or absolute path to response.php file
       async:false,
       data:{
 	  	'ora_inizio': $('#mod_ora_inizio').val(),
 	  	'ora_fine': $('#mod_ora_fine').val(),
 	  	'pausa': $('#mod_pausa').val(),
 	  	'note':$('#mod_note').val(),
 	  	'dipendente':getCookie('id_dipendente'),
 	  	'cliente':mod_cliente_selezionato,
 	  	'db':getCookie('nomeDB'),
 	  	'materiali':mod_materiali_selezionati,
 	  	'mezzi':mod_mezzi_selezionati
 	  },
       success: function(data) {
 	    console.log(data);
 	  	Materialize.toast("Rapportino inserito",2000,"",function(){window.location.replace("dashboard.html");})
 		}
 	});

 }
