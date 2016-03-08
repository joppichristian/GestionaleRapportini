var json_clienti = new Array();
var json_materiali = new Array();
var json_mezzi = new Array();


var id_Cl,id_Me,id_Ma;
var index_Cl,index_Me,index_Ma;

var cliente_selezionato = -1;
var materiali_selezionati = new Array();
var mezzi_selezionati = new Array();
var rapida_cliente = 0;

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	$('select').material_select();
	$('#schermata_dati').hide();
	$("#rapida_cliente").hide();
	$('#schermata_materiali').hide();
	$('#schermata_mezzi').hide();
	$('#cliente_selezionato_new_page').hide();
	$("#elenco_utilizzi_materiali").hide();
	$("#elenco_utilizzi_mezzi").hide();
	$("#to_date").click(function(){
		if(cliente_selezionato != -1){
			$('#cliente_selezionato_new_page').show();
			$('#schermata_clienti').hide();
			$('#schermata_dati').show();
		}
		else
			Materialize.toast("Seleziona un cliente!",2000);
	});
	$("#back_clienti").click(function(){
		$('#cliente_selezionato_new_page').hide();
		$('#schermata_clienti').show();
		$('#schermata_dati').hide();
	});
	$('#complete').click(function(){
		if($('#pausa').val() <= 120 ){
			aggiungiRapportino();
		}
		else
		{
			Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
		}

	});
	$("#search_cliente").on('input',function(){
		populateListClient($("#search_cliente").val());
	});
	$("#search_materiale").on('input',function(){
		populateListMaterials($("#search_materiale").val());
	});
	$("#search_mezzo").on('input',function(){
		populateListMezzi($("#search_mezzo").val());
	});
	populateListClient("");
	populateListMaterials("");
	populateListMezzi("");
	populateListFascieOrarie();
	$(".mezzi").hide();
	$(".materiali").hide();
	$("#show_materiali").click(function(){
		$(".materiali").show();
		$(".mezzi").hide();
	});
	$("#show_mezzi").click(function(){
		$(".mezzi").show();
		$(".materiali").hide();
	});
	$("#conferma_materiali").click(function(){
		$(".materiali").hide();
		console.log(materiali_selezionati);
	});
	$("#conferma_mezzi").click(function(){
		$(".mezzi").hide();
		console.log(mezzi_selezionati);
	});
	
	$('#pausa').focusout(function(){
		if($('#pausa').val() < 0 || $('#pausa').val() > 120){
			Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
			$('#pausa').focus();
		}

	});
	$("#show_add_cliente").on("click",function(){
		if(rapida_cliente ==0){
			$("#rapida_cliente").show();
			rapida_cliente =1;
		}else{
			$("#rapida_cliente").hide();
			rapida_cliente =0;

		}

	});
	$("#addClient").on("click",function(){
		addCliente();

	});
})

function populateListClient(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getClients.php?q="+filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_clienti = data;
        var elementi = new Array();
         $("#elenco_clienti").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        if(data[i]['tipologia'] == 'p'){
		        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">account_circle</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="select_clients material-icons purple-text">call_received</i></a></div>	';
		    }else{
		        elementi[i].innerHTML = '<div ><i class="info small material-icons purple-text">business</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="select_clients material-icons purple-text">call_received</i></a></div>	';
	        }

	    	$("#elenco_clienti").append(elementi[i]);
	    	id_Cl = data[0]['id'];



	    	}
	    	$(".select_clients").click(function(){
		    	$("#cliente_selezionato").empty();
		    	$("#cliente_selezionato_new_page").empty();
		        index_Cl = $(".select_clients").index(this);
		        id_Cl = json_clienti[index_Cl]['id'];
		        cliente_selezionato = id_Cl;
		        var cliente_chip = document.createElement('div');
				cliente_chip.className= "chip";
				cliente_chip.innerHTML=json_clienti[index_Cl]['nominativo'];
				$("#cliente_selezionato").append(cliente_chip);
				var cliente_chip_2 = document.createElement('div');
				cliente_chip_2.className= "chip";
				cliente_chip_2.innerHTML=json_clienti[index_Cl]['nominativo'];
				$("#cliente_selezionato_new_page").append(cliente_chip_2);
	        });
		}
	});
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
	        elementi[i].className ="collection-item";

	        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">local_play</i>'+(data[i]['codice']+' - '+data[i]['descrizione']).substr(0,18)+'...<a href="#!" class="secondary-content"><i class="select_materials material-icons purple-text">add</i></a></div>	';


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
	        elementi[i].className ="collection-item";

	        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">directions_bus</i>'+data[i]['descrizione'].substr(0,18)+'...<a href="#!" class="secondary-content"><i class="select_mezzi material-icons purple-text">add</i></a></div>	';


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
function updateListUtilizzi(){
	$("#elenco_utilizzi_materiali").show();
	$("#elenco_utilizzi_mezzi").show();
	if(materiali_selezionati.length == 0)
		$("#elenco_utilizzi_materiali").hide();
	if(mezzi_selezionati.length == 0)
		$("#elenco_utilizzi_mezzi").hide();
	$("#elenco_utilizzi_materiali").empty();
	$("#elenco_utilizzi_mezzi").empty();
	var chip = new Array();
	for(var i=0; i < materiali_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=materiali_selezionati[i]['descrizione'] + '&nbsp; x' + materiali_selezionati[i]['quantita']+'<a href="#!" ><i class="remove_materiale material-icons purple-text">remove_circle</i></a>';
  		$("#elenco_utilizzi_materiali").append(chip[i]);

	}
	for(var i=0; i < mezzi_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mezzi_selezionati[i]['descrizione'] + '&nbsp; x' + mezzi_selezionati[i]['quantita']+'h <a href="#!" ><i class="remove_mezzo material-icons purple-text">remove_circle</i></a>';
  		$("#elenco_utilizzi_mezzi").append(chip[i]);

	}
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
function removeMezzo(i){
		 mezzi_selezionati.splice(i,1);
}
function aggiungiRapportino(){
	var tmp_ora = Math.round(($('#ora').val()[0])/60).toString();
	if(tmp_ora.length == 1)
		tmp_ora = '0'+tmp_ora;
	var tmp_min = Math.round(($('#ora').val()[0])%60).toString();
	if(tmp_min.length == 1)
		tmp_min = '0'+tmp_min;
	var inizio = tmp_ora+":"+tmp_min;
	var tmp_ora = Math.round(($('#ora').val()[$('#ora').val().length-1]+29)/60).toString()
	if(tmp_ora.length == 1)
		tmp_ora = '0'+tmp_ora;
	var tmp_min = Math.round(($('#ora').val()[$('#ora').val().length-1]+30)%60).toString();
	if(tmp_min.length == 1)
		tmp_min = '0'+tmp_min;
	var fine =tmp_ora +":"+ tmp_min;
	$.ajax({
      type:"POST",
      url: "script_php/postRapportinoRapido.php", //Relative or absolute path to response.php file
      async:false,
      data:{
	  	'ora_inizio': inizio,
	  	'ora_fine': fine,
	  	'pausa': $('#pausa').val(),
	  	'note':$('#note').val(),
	  	'dipendente':getCookie('id_dipendente'),
	  	'cliente':cliente_selezionato,
	  	'db':getCookie('nomeDB'),
	  	'materiali':materiali_selezionati,
	  	'mezzi':mezzi_selezionati
	  },
      success: function(data) {
	    console.log(data);
	  	Materialize.toast("Rapportino inserito",2000,"",function(){window.location.replace("dashboard.html");})
		}
	});

}
function addCliente(){
	if($("#nominativo").val() == ""){
			Materialize.toast('Nominativo o Ragione Sociale Obbligatoria', 2000);
			return false;
		}
		var nominativo = $("#nominativo").val();
				
		$.ajax({
	      url: "script_php/postClients.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'nominativo': nominativo,
		      'tipologia':'p',
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){		   
		   		Materialize.toast('Cliente inserito', 2000,'',function(){populateListClient("")});
		   		$("#rapida_cliente").hide();
		   		$.ajax({
			      dataType: "json",
			      url: "script_php/getClients.php?q="+nominativo+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
			      data:"",
			      success: function(data) {
				    
				    		$("#cliente_selezionato").empty();
					    	$("#cliente_selezionato_new_page").empty();
					        id_Cl = data[0]['id'];
					        cliente_selezionato = id_Cl;
					        var cliente_chip = document.createElement('div');
							cliente_chip.className= "chip";
							cliente_chip.innerHTML=data[0]['nominativo'];
							$("#cliente_selezionato").append(cliente_chip);
							var cliente_chip_2 = document.createElement('div');
							cliente_chip_2.className= "chip";
							cliente_chip_2.innerHTML=data[0]['nominativo'];
							$("#cliente_selezionato_new_page").append(cliente_chip_2);
				      
					}
				});

			   return false;
			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});		
		return false;
}
function populateListFascieOrarie(){
	var occupato = false;
	var start,stop;
	var tmp_ora,tmp_min,tmp;
	$.ajax({
	      url: "script_php/getFascieOrarie.php", //Relative or absolute path to response.php file
	      type:"POST",
	      async:false,
	      data:{
		      'dip': getCookie('id_dipendente'),
		      'db':getCookie('nomeDB')
		   },
		   success: function(data){	
			   console.log(data);
			   for(var i=0;i<1440;i+=30){
				   occupato = false;
				   tmp_ora = Math.round((i-1)/60).toString();
				   if(tmp_ora.length == 1)
				   		tmp_ora = '0'+tmp_ora;
				   	tmp_min = (i%60).toString();
				   if(tmp_min.length == 1)
				   		tmp_min = '0'+tmp_min;
				   tmp = tmp_ora+":"+tmp_min;
				   $("#ora").append("<option value="+i+">"+tmp+"</option>");
				   tmp_ora = Math.round((i+29)/60).toString();
				   if(tmp_ora.length == 1)
				   		tmp_ora = '0'+tmp_ora;
				   	tmp_min = ((i+30)%60).toString();
				   if(tmp_min.length == 1)
				   		tmp_min = '0'+tmp_min;
				   tmp = tmp_ora+":"+tmp_min;
				   $("#ora option[value="+i+"]").text($("#ora option[value="+i+"]").text()+" -- "+tmp);   				   
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
					   $("#ora option[value="+j+"]").prop("disabled",true);
					   $("#ora option[value="+j+"]").text($("#ora option[value="+j+"]").text() +"       " + data[i]['nominativo']);
				   }
				}
			   $('select').material_select("update");

			},
		   error: function (XMLHttpRequest, textStatus, errorThrown){
			   Materialize.toast('Errore di inserimento', 2000);
			    return false;

			}
		});		
}

