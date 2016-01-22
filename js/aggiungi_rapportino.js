var json = new Array();
var index=0;
var id=0;
var json_materiali = new Array();
var json_mezzi = new Array();
var materiali_selezionati = new Array();
var mezzi_selezionati = new Array();
var dipendenti_selezionati = new Array();

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#lista_sel_dip").hide();
    $("#sezione_mat").hide();
		$("#sezione_mezzi").hide();


  	$("#elenco_utilizzi_materiali").hide();
    var stato_aggiungi_mat=0;

    $("#aggiungi_mat").on("click",function(){
      if(stato_aggiungi_mat==1){
        $("#sezione_mat").hide();
        stato_aggiungi_mat=0;
      }else{
        $("#sezione_mat").show();
        stato_aggiungi_mat=1;
      }
    });

		$("#elenco_utilizzi_mezzi").hide();
    var stato_aggiungi_mezzi=0;

    $("#aggiungi_mezzi").on("click",function(){
      if(stato_aggiungi_mezzi==1){
        $("#sezione_mezzi").hide();
        stato_aggiungi_mezzi=0;
      }else{
        $("#sezione_mezzi").show();
        stato_aggiungi_mezzi=1;
      }
    });

    $("#sezione_dipendenti").hide();
    var stato_aggiungi_dip=0;
    $("#aggiungi_dip").on("click",function(){
      if(stato_aggiungi_dip==1){
        $("#sezione_dipendenti").hide();
        stato_aggiungi_dip=0;
      }else{
        $("#sezione_dipendenti").show();
        stato_aggiungi_dip=1;
      }
    });

    populateList("");
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
			if($('#ora_inizio').val() != '' && $('#ora_fine').val() != '' && $('#pausa').val() >= 0 && $('#pausa').val() <= 120 ){
				var spl = $('#ora_inizio').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || spl.length!=2)
				{
					Materialize.toast("Ora di inizio non valida...utilizza hh:mm!",2000);
					return false;
				}
				spl = $('#ora_fine').val().split(':');
				if(parseInt(spl[0]) < 0 || parseInt(spl[0]) > 24 || parseInt(spl[1]) < 0 || parseInt(spl[1]) > 59 || spl.length!=2)
				{
					Materialize.toast("Ora di fine non valida...utilizza hh:mm!",2000);
					return false;
				}
				//controlloRapCliente();
			}
			else
			{
				if($('#pausa').val() >= 0 && $('#pausa').val() <= 120)
					Materialize.toast("Inserisci un'ora di inizio e un'ora di fine valida!",2000);
				else
					Materialize.toast("Inserisci una pausa valida tra 0 e 120 minuti",2000);
			}

		});

});


function populateList(filter){
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ filter+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco_dip").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="#!" style="position: absolute; right: 16px;" class=""><i class="explode material-icons orange-text">add</i></a></div>	';


	    	$("#elenco_dip").append(elementi[i]);


	    }
	    id = data[0]['id'];

		//explodeDipendente(data[0]);
		$(".explode").click(function(){
	        index = $(".explode").index(this);
	        id = json[index]['id'];
          $("#lista_sel_dip").show();
          setDipendenti(json[index]);
	        //explodeDipendente(json[index]);
        });
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}

function setDipendenti(dipendente){
//  alert("nome: "+dipendente['nome']);
  $("#lista_sel_dip").append('<div class="chip">'+dipendente['nome']+ ' '+ dipendente['cognome']+'<i class="material-icons">close</i></div> ');

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

	        elementi[i].innerHTML = '<div><i class="info small material-icons orange-text">local_play</i>'+(data[i]['codice']+' - '+data[i]['descrizione']).substr(0,24)+'<a href="#!" style="position: absolute; right: 16px;"><i class="select_materials material-icons orange-text">add</i></a></div>	';


	    	$("#elenco_materiali").append(elementi[i]);
			id_Ma = data[0]['id'];




	    }
	    $(".select_materials").click(function(){
      //alert("cliccato sul pulsante");
			if($('#quantita_materiale').val()!= ""){
            //alert("quantita materiale selzionato: "+$('#quantita_materiale').val());
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
		chip[i].innerHTML=materiali_selezionati[i]['descrizione'] + '&nbsp; x' + materiali_selezionati[i]['quantita']+'<a href="#!" ><i class="remove_materiale material-icons orange-text">remove_circle</i></a>';
  		$("#elenco_utilizzi_materiali").append(chip[i]);

	}
	for(var i=0; i < mezzi_selezionati.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mezzi_selezionati[i]['descrizione'] + '&nbsp; x' + mezzi_selezionati[i]['quantita']+'h <a href="#!" ><i class="remove_mezzo material-icons orange-text">remove_circle</i></a>';
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

function controlloRapCliente(){

}

 function aggiungiRapportino(){
 	$.ajax({
       type:"POST",
       url: "script_php/postRapportinoRapido.php", //Relative or absolute path to response.php file
       async:false,
       data:{
 	  	'ora_inizio': $('#ora_inizio').val(),
 	  	'ora_fine': $('#ora_fine').val(),
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
