var json_dipendenti = new Array();
var index=0;
var id=0;
var json_materiali = new Array();
var json_mezzi = new Array();
var materiali_selezionati = new Array();
var mezzi_selezionati = new Array();
var dipendenti_selezionati = new Array();
var index_fasce = 0;
var select_string="Seleziona tutto";
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#lista_sel_dip").hide();

		var now = new Date();
		console.log(now);
		for(var i=parseInt(now.getYear())+1899;i<parseInt(now.getYear())+1901;i++)
		{
			$("#nuovo_giorno_yy").append("<option value="+i+">"+i+"</option>");
		}

		$('select').material_select();
		if(now.getDate().toString().length ==1)
			$("#nuovo_giorno_dd").val("0"+(now.getDate()).toString());
		else
			$("#nuovo_giorno_dd").val(now.getDate());
		if(now.getMonth().toString().length ==1)
			$("#nuovo_giorno_mm").val("0"+(now.getMonth()+1).toString());
		else
			$("#nuovo_giorno_mm").val(now.getMonth()+1);
		$("#nuovo_giorno_yy").val(now.getFullYear());
		$('select').material_select("update");



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
				if($('#nuovo_pausa').val() >= 0 && $('#nuovo_pausa').val() <= 120 && !isNaN($('#nuovo_pausa').val()) && $('#nuovo_pausa').val() != "")
					aggiungiRapportino();
				else
					Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);


		});


		$('#nuovo_pausa').focusout(function(){
			if($('#nuovo_pausa').val() < 0 || $('#nuovo_pausa').val() > 120 || isNaN($('#nuovo_pausa').val())){
				Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
				$('#nuovo_pausa').focus();
			}

		});



		var now = new Date();
		for(var i=parseInt(now.getYear())+1899;i<parseInt(now.getYear())+1901;i++)
		{
			$("#nuovo_giorno_yy").append("<option value="+i+">"+i+"</option>");
		}

		$('select').material_select();

		populateListFascieOrarie();


		$("#nuovo_giorno_dd").on("change",function(){
			populateListFascieOrarie();
		});

		$("#nuovo_giorno_mm").on("change",function(){
			populateListFascieOrarie();
		});

		$("#nuovo_giorno_yy").on("change",function(){
			populateListFascieOrarie();
		});



});


function populateListEmployee(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ filter+"&db="+getCookie('nomeDB')+"&all=0", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_dipendenti = data;
        var elementi = new Array();
         $("#elenco_dip").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item blue-grey lighten-5";
	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="#!" style="position: absolute; right: 16px;" class=""><i class="select_employee material-icons orange-text">add</i></a></div>	';


	    	$("#elenco_dip").append(elementi[i]);


	    }
	    id = data[0]['id'];
		$(".select_employee").click(function(){
				 $(".nuovo_ora .select-dropdown").val("");
				 index_Di = $(".select_employee").index(this);
				 id_Di = json_dipendenti[index_Di]['id'];
				 var duplicato = -1;
		        for(var i=0;i<dipendenti_selezionati.length;i++){
			        if(dipendenti_selezionati[i]['id'] == json_dipendenti[index_Di]['id']){
			        	duplicato = i;
			        }
		        }
		        if(duplicato < 0){
		            dipendenti_selezionati.push({'id':id_Di,'descrizione':json_dipendenti[index_Di]['nome']+ ' ' +json_dipendenti[index_Di]['cognome']});
		        updateListUtilizzi();
		        populateListFascieOrarie();
		        Materialize.toast("Dipendente aggiunto!",2000);

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
	if(dipendenti_selezionati.length == 0)
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
	for(var i=0; i < dipendenti_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=dipendenti_selezionati[i]['descrizione']+'<a href="#!" ><i class="remove_dipendente material-icons orange-text">remove_circle</i></a>';
  		$("#lista_sel_dip").append(chip[i]);

	}
	$(".remove_dipendente").click(function(){
		removeDipendente($(".remove_dipendente").index(this));
		updateListUtilizzi();
		populateListFascieOrarie();
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
 		 dipendenti_selezionati.splice(i,1);
 }

 function aggiungiRapportino(){
	 if(dipendenti_selezionati.length==0){
		Materialize.toast("Nessun dipendente aggiunto",2000);
		return false;

	 }
	 var ar_ore = new Array();

	ar_ore = $(".nuovo_ora .select-dropdown").val().split(' ').join('').split(',').join(' ').split('--').join(' ').split(' ');
	ar_ore.sort();

	var inizio = new Array();
	var fine = new Array();

	var tmp_last;

	inizio.push(ar_ore[0]);
	fine.push(ar_ore[1]);
	tmp_last = ar_ore[0];
	if(ar_ore.length > 2){
		for(var i =2;i<ar_ore.length;i+=2)
		{
			if((parseInt(tmp_last.split(':')[0])*60)+parseInt(tmp_last.split(':')[1])+30 != (parseInt(ar_ore[i].split(':')[0])*60)+parseInt(ar_ore[i].split(':')[1])){
				inizio.push(ar_ore[i]);
				fine.push(ar_ore[i+1]);
				tmp_last = ar_ore[i];
			}
			else{
				fine.pop();
				fine.push(ar_ore[i+1]);
				tmp_last = ar_ore[i];
			}
		}
	}

	 var result = true;
	 for(var j=0;j<dipendenti_selezionati.length;j++){


		for(var i=0;i<inizio.length;i++){
		if(i==0 && j==0 )
		{
			$.ajax({
		       type:"POST",
		       url: "script_php/postRapportinoCliente.php", //Relative or absolute path to response.php file
		       async:false,
		       data:{
			    'data': $("#nuovo_giorno_dd").val()+"-"+$("#nuovo_giorno_mm").val()+"-"+$("#nuovo_giorno_yy").val(),
		 	  	'ora_inizio': inizio[i],
		 	  	'ora_fine': fine[i],
		 	  	'pausa': $('#nuovo_pausa').val(),
		 	  	'note':$('#nuovo_descrizione').val(),
		 	  	'cliente':id_utente,
		 	  	'dipendente':dipendenti_selezionati[j]['id'],
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
			    'data': $("#nuovo_giorno_dd").val()+"-"+$("#nuovo_giorno_mm").val()+"-"+$("#nuovo_giorno_yy").val(),
		 	  	'ora_inizio': inizio[i],
		 	  	'ora_fine': fine[i],
		 	  	'pausa': 0,
		 	  	'note':$('#nuovo_descrizione').val(),
		 	  	'cliente':id_utente,
		 	  	'dipendente':dipendenti_selezionati[j]['id'],
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
	}
	if(result){
		Materialize.toast("Rapportino Inserito",2000,"",function(){$("#new_insert_item").hide();populateRapportino(id_utente);});
	}
	else{
		Materialize.toast("Errore: Rapportino NON Inserito",2000);
	}

 }

 function populateListFascieOrarie(){
	var ini = hourTomin(getCookie("inizio"));
	var fin = hourTomin(getCookie("fine"));
	var occupato = false;
	var start,stop;
	var tmp_ora,tmp_min,tmp;
	$("#nuovo_ora").empty();
	if(dipendenti_selezionati.length == 0)
	{
		$("#nuovo_ora").append("<option value=-1 disabled>Seleziona almeno un dipendente</option>");
		$("#nuovo_ora").prop("disabled",true);
		$('select').material_select("update");
	}
	else{
	$("#nuovo_ora").prop("disabled",false);
	 $("#nuovo_ora").append("<option value=-1 disabled>Seleziona gli orari del lavoro fatto</option>");
	 $("#nuovo_ora").append("<option value=-2 id='all_select'>"+select_string+"</option>");

	 for(index_fasce=0;index_fasce<dipendenti_selezionati.length;index_fasce++)
			$.ajax({
			      url: "script_php/getFascieOrarieMoreDays.php", //Relative or absolute path to response.php file
			      type:"POST",
			      async:false,
			      data:{
				      'dip': dipendenti_selezionati[index_fasce]['id'],
					  'data_dd':$("#nuovo_giorno_dd").val(),
					  'data_mm':$("#nuovo_giorno_mm").val(),
					  'data_yy':$("#nuovo_giorno_yy").val(),
				      'db':getCookie('nomeDB')
				   },
				   success: function(data){
					   console.log(data);
					   if(index_fasce==0){
						   for(var i=ini;i<fin;i+=30){
							   occupato = false;
							   tmp_ora = Math.round((i-1)/60).toString();
							   if(tmp_ora.length == 1)
							   		tmp_ora = '0'+tmp_ora;
							   	tmp_min = (i%60).toString();
							   if(tmp_min.length == 1)
							   		tmp_min = '0'+tmp_min;
							   tmp = tmp_ora+":"+tmp_min;
							   $("#nuovo_ora").append("<option value="+i+">"+tmp+"</option>");
							   tmp_ora = Math.round((i+29)/60).toString();
							   if(tmp_ora.length == 1)
							   		tmp_ora = '0'+tmp_ora;
							   	tmp_min = ((i+30)%60).toString();
							   if(tmp_min.length == 1)
							   		tmp_min = '0'+tmp_min;
							   tmp = tmp_ora+":"+tmp_min;
							   $("#nuovo_ora option[value="+i+"]").text($("#nuovo_ora option[value="+i+"]").text()+" -- "+tmp);
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
								   $("#nuovo_ora option[value="+j+"]").prop("disabled",true);
								   $("#nuovo_ora option[value="+j+"]").text($("#nuovo_ora option[value="+j+"]").text() +"\t" + data[i]['nominativo']);
							   }
							}
						   $('select').material_select("update");
					   }else{
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
								   if($("#nuovo_ora option[value="+j+"]").prop("disabled")){
									   $("#nuovo_ora option[value="+j+"]").prop("disabled",true);
									   $("#nuovo_ora option[value="+j+"]").text($("#nuovo_ora option[value="+j+"]").text() +", " + data[i]['nominativo']);
								   }else{
								   		$("#nuovo_ora option[value="+j+"]").prop("disabled",true);
								   		$("#nuovo_ora option[value="+j+"]").text($("#nuovo_ora option[value="+j+"]").text()+" " + data[i]['nominativo']);

								   }

							   }
							}
							$('select').material_select("update");


					   }

					},
				   error: function (XMLHttpRequest, textStatus, errorThrown){
					   Materialize.toast('Errore di inserimento', 2000);
					    return false;

					}
				});


			}
			$(".nuovo_ora .dropdown-content li:nth-child(2) span").on("click",function(){

								if($("#nuovo_ora #all_select").text()=="Seleziona tutto"){
									select_string = "Deseleziona tutto";
									populateListFascieOrarie();
									$(".nuovo_ora .dropdown-content li span").each(function(i){
										if(i>1)
											this.click();
									});
								}
								else{
									$("#nuovo_ora #all_select").text("Seleziona tutto");
									select_string = "Seleziona tutto";

									populateListFascieOrarie();
								}

							});
}
