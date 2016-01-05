var json_clienti = new Array();
var json_materiali = new Array();
var json_mezzi = new Array();


var id_Cl,id_Me,id_Ma;
var index_Cl,index_Me,index_Ma;

var cliente_selezionato;
var materiali_selezionati = new Array();
var mezzi_selezionati = new Array();

$(document).ready(function(){
	populateListClient("");
	populateListMaterials("");
	populateListMezzi("");	
	$(".mezzi").hide();
	$(".materiali").hide();
	$("#time_now_inizio").click(function(){
		now = new Date();
		$("#ora_inizio").val(now.getHours()+':'+now.getMinutes());
		$("#ora_inizio").focus();
	});
	$("#time_now_fine").click(function(){
		now = new Date();
		$("#ora_fine").val(now.getHours()+':'+now.getMinutes());
		$("#ora_fine").focus();

	});
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

})

function populateListClient(filter){
	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getClients.php?q="+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
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
		        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">business</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="select_clients material-icons purple-text">call_received</i></a></div>	';
	        }

	    	$("#elenco_clienti").append(elementi[i]);
	    	id_Cl = data[0]['id'];
	    	
			

	    	}
	    	$(".select_clients").click(function(){
		    	$("#cliente_selezionato").empty();
		        index_Cl = $(".select_clients").index(this);
		        id_Cl = json_clienti[index_Cl]['id']; 
		        cliente_selezionato = id_Cl; 
		        var cliente_chip = document.createElement('div');
				cliente_chip.className= "chip";
				cliente_chip.innerHTML=json_clienti[index_Cl]['nominativo'];
				$("#cliente_selezionato").append(cliente_chip);
	        });
		}
	});
}
function populateListMaterials(filter){
	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getMaterials.php?q= "+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_materiali = data;
        var elementi = new Array();
         $("#elenco_materiali").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        
	        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">local_play</i>'+data[i]['codice']+' - '+data[i]['descrizione']+'<a href="#!" class="secondary-content"><i class="select_materials material-icons purple-text">add</i></a></div>	';
	    	
	    	
	    	$("#elenco_materiali").append(elementi[i]);
			id_Ma = data[0]['id'];

			


	    }
	    $(".select_materials").click(function(){
				
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
		        	materiali_selezionati.push({'id':id_Ma,'descrizione':json_materiali[index_Ma]['descrizione'],'quantita':quantita_duplicato+1});
		        }else
		            materiali_selezionati.push({'id':id_Ma,'descrizione':json_materiali[index_Ma]['descrizione'],'quantita':1});
		        updateListUtilizzi();      
	        });
	  }
	});
}
function populateListMezzi(filter){
	var q;
	if(filter != "")
		q = "WHERE " + filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getMezzi.php?q= "+ q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json_mezzi = data;
        var elementi = new Array();
         $("#elenco_mezzi").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        
	        elementi[i].innerHTML = '<div><i class="info small material-icons purple-text">directions_bus</i>'+data[i]['descrizione']+'<a href="#!" class="secondary-content"><i class="select_mezzi material-icons purple-text">add</i></a></div>	';
	    	
	    	
	    	$("#elenco_mezzi").append(elementi[i]);
			id_Me = data[0]['id'];
	    	
			


	    }
	    $(".select_mezzi").click(function(){
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
		        	mezzi_selezionati.push({'id':id_Me,'descrizione':json_mezzi[index_Me]['descrizione'],'quantita':quantita_duplicato+0.50});
		        }else
		            mezzi_selezionati.push({'id':id_Me,'descrizione':json_mezzi[index_Me]['descrizione'],'quantita':0.50});
		        updateListUtilizzi();                    
	        });
	   }
    });
 }
function updateListUtilizzi(){
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
	materiali_selezionati[i]['quantita'] = materiali_selezionati[i]['quantita']-1;
	if(materiali_selezionati[i]['quantita'] < 1){
		 materiali_selezionati.splice(i,1);
	}
}
function removeMezzo(i){
	mezzi_selezionati[i]['quantita'] = mezzi_selezionati[i]['quantita']-0.5;
	if(mezzi_selezionati[i]['quantita'] < 0.5){
		 mezzi_selezionati.splice(i,1);
	}
}

