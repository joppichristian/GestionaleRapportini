var mod_json = new Array();
var mod_index=0;
var mod_id=0;
var mod_json_materiali = new Array();
var mod_json_mezzi = new Array();
var mod_materiali_selezionati = new Array();
var mod_mezzi_selezionati = new Array();
var mod_dipendenti_selezionati = new Array();
var mod_dipendente = 0;
var inizio,fine,cliente;
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

			if($('#mod_pausa').val() >= 0 && $('#mod_pausa').val() <= 120 && !isNaN($('#mod_pausa').val()) && $('#mod_pausa').val() != "")
				modificaRapportino();
			else
				Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);

		});
		$('#no_modifica').click(function(){
			$('#modal1').closeModal();
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
  data = data.split("-").reverse();
  var inizio = (det_json[index_rapp]['inizio']).split(' ')[1].substr(0, 5);
  var fine = (det_json[index_rapp]['fine']).split(' ')[1].substr(0, 5);
  var descr = det_json[index_rapp]['note'];
  var pausa = det_json[index_rapp]['pausa'];
  mod_dipendente = det_json[index_rapp]['id_dipendente'];
  var dipendente_nome = datiDipendente(mod_dipendente);
  mod_setDipendenti(dipendente_nome);
  var setGm = data[2]+"/"+data[1]+"/"+data[0];
  $("#mod_giorno").val(setGm);
  $("#mod_descrizione").val(descr);
  $("#mod_pausa").val(pausa);
  $('select').material_select();
  populateListFascieOrarieModifica(inizio,fine);
  $("#mod_descrizione").focus();
  $("#mod_pausa").focus();
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
	  var ar_ore = new Array();

	ar_ore = $(".mod_ora .select-dropdown").val().split(' ').join('').split(',').join(' ').split('--').join(' ').split(' ');
	ar_ore.sort();

	var start = new Array();
	var stop = new Array();

	var tmp_last;
	var indice_mod = 0;
	var result = true;
	start.push(ar_ore[0]);
	stop.push(ar_ore[1]);
	tmp_last = ar_ore[0];
	if(ar_ore.length > 2){
		for(var i =2;i<ar_ore.length;i+=2)
		{
			if(hourTomin(tmp_last)+30 != hourTomin(ar_ore[i])){
				start.push(ar_ore[i]);
				stop.push(ar_ore[i+1]);
				tmp_last = ar_ore[i];
			}
			else{
				stop.pop();
				stop.push(ar_ore[i+1]);
				tmp_last = ar_ore[i];
			}
		}
	}
	var data_mod = $("#mod_giorno").val();
	var data_m = changeFormatData(data_mod);
	for(var i=0;i<start.length;i++){
		if(i==indice_mod){
      
			$.ajax({
		       type:"POST",
		       url: "script_php/updateRapportino.php", //Relative or absolute path to response.php file
		       async:false,
		       data:{
			    'data':data_m,
		 	  	'ora_inizio': start[i],
		 	  	'ora_fine': stop[i],
		 	  	'pausa': $('#mod_pausa').val(),
		 	  	'note':$('#mod_descrizione').val(),
		 	  	'db':getCookie('nomeDB'),
		 	  	'id':mod_id,
		 	  	'materiali':mod_materiali_selezionati,
		 	  	'mezzi':mod_mezzi_selezionati
		 	  },
		       success: function(data) {
		 	    console.log(data);

		 		},
		 		error:function(data){
			 		result = false;
		 		}
		 	});
		}
		else{
      var data_mod = $("#mod_giorno").val();
			var data_m = changeFormatData(data_mod);
			$.ajax({
		       type:"POST",
		       url: "script_php/postRapportino.php", //Relative or absolute path to response.php file
		       async:false,
		       data:{
			    'data': data_m,
			    'ora_inizio': start[i],
		 	  	'ora_fine': stop[i],
		 	  	'pausa':0,
		 	  	'note':$('#mod_descrizione').val(),
		 	  	'dipendente':mod_dipendente,
		 	  	'cliente':id_utente,
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
	if(result && start.length > 1) {
		Materialize.toast("Rapportino modificato! Attenzione: sono stati creati nuovi rapportini per ogni fascia oraria aggiunta!",2000,"",function(){$("#modal1").closeModal();populateRapportino(id_utente);})
	}
	else
	{
		Materialize.toast("Rapportino modificato!",2000,"",function(){$("#modal1").closeModal();populateRapportino(id_utente);})
	}



 }

 function populateListFascieOrarieModifica(inizio,fine){
	var occupato = false;
	var start,stop;
	var tmp_ora,tmp_min,tmp;
	var toModify = new Array();
	var ini = hourTomin(getCookie("inizio"));
	var fin = hourTomin(getCookie("fine"));
	$("#mod_ora").empty();
	 $("#mod_ora").append("<option value=-1 disabled>Seleziona gli orari del lavoro fatto</option>");
   var gg= $("#mod_giorno").val();
  $.ajax({
	      url: "script_php/getFascieOrarieMoreDays.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'dip': mod_dipendente,
          'data_dd':gg.split('/')[2],
          'data_mm':gg.split('/')[1],
          'data_yy':gg.split('/')[0],
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){
			   console.log(data);
			   for(var i=ini;i<fin;i+=30){
				   occupato = false;
				   tmp_ora = Math.round((i-1)/60).toString();
				   if(tmp_ora.length == 1)
				   		tmp_ora = '0'+tmp_ora;
				   	tmp_min = (i%60).toString();
				   if(tmp_min.length == 1)
				   		tmp_min = '0'+tmp_min;
				   tmp = tmp_ora+":"+tmp_min;
				   $("#mod_ora").append("<option value="+i+">"+tmp+"</option>");
				   tmp_ora = Math.round((i+29)/60).toString();
				   if(tmp_ora.length == 1)
				   		tmp_ora = '0'+tmp_ora;
				   	tmp_min = ((i+30)%60).toString();
				   if(tmp_min.length == 1)
				   		tmp_min = '0'+tmp_min;
				   tmp = tmp_ora+":"+tmp_min;
				   $("#mod_ora option[value="+i+"]").text($("#mod_ora option[value="+i+"]").text()+" -- "+tmp);
			   }
			   for(var i=0;data != null && i<data.length;i++)
			   {

				   tmp = data[i]['inizio'].split(' ')[1];
				   tmp_ora = tmp.split(':')[0];
				   tmp_min = tmp.split(':')[1];
				   tmp = parseInt(tmp_ora)*60+parseInt(tmp_min);
				   start = tmp;
				   tmp = data[i]['fine'].split(' ')[1];
				   tmp_ora = tmp.split(':')[0];
				   tmp_min = tmp.split(':')[1];
				   tmp = parseInt(tmp_ora)*60+parseInt(tmp_min);
				   stop = tmp
				   for(var j = start ; j <= stop-30 ; j+=30){
					   if(j < hourTomin(inizio) || j >= hourTomin(fine)){
						   $("#mod_ora option[value="+j+"]").prop("disabled",true);
						   $("#mod_ora option[value="+j+"]").text($("#mod_ora option[value="+j+"]").text() +"       " + data[i]['nominativo']);
					   }
					   else{
						  toModify.push((j+60-hourTomin(getCookie("inizio")))/30);
					   }
				   }
				}
			  $('select').material_select();
			   for(var k = 0;k< toModify.length;k++)
			   {
				   $(".mod_ora .dropdown-content li:nth-child("+toModify[k]+") span").click();

			   }


			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});
}
function hourTomin(stringa){
	return parseInt(stringa.split(":")[0])*60 + parseInt(stringa.split(":")[1]);
}
function setLabelFilterModifica(){
	var data_mod = $("#mod_giorno").val();
	document.getElementById('lblGiornoModifica').innerHTML = takeNameDayFull(data_mod);
}

function changeFormatData(mdata){
	var d = mdata.split('/')[2];
	var m = mdata.split('/')[1];
	var y = mdata.split('/')[0];
	return ""+d+"-"+m+"-"+y;
//cambiare data da 2016/01/01
// in 01-01-2016
}
