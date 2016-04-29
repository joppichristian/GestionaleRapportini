$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	if(getCookie('vRR')==0)
		window.location.replace("dashboard.html");

	if($("#tipologia").val() == 'd')
		  populateListDipendenti("");
	else
			populateListClient("");


	$("#filtro_selezionato").hide();
	$("#ora_selezionato").hide();

	$('select').material_select();
	//$("#div_iva").hide();
	$("#search").on("input" , function() {
	        var tmp = $("#search").val();
	        if($("#tipologia").val() == 'd')
	        	populateListDipendenti(tmp);
	        else
				populateListClient(tmp);
	});
	$("#tipologia").on("change",function(){
		if($(this).val() == 'd')
		{
	    	populateListDipendenti("");
		}
		else if ($(this).val() == 'c')
		{
			populateListClient("");
		}
	}) ;


});



function populateListDipendenti(filter){

	var q=filter;
	$.ajax({
      dataType: "json",
      url: "script_php/getEmployee.php?q="+ q+"&db="+getCookie('nomeDB')+"&all=1", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        elementi[i].innerHTML = '<div class="explode"><i class="info small material-icons orange-text">directions_walk</i>'+data[i]['nome']+ ' ' +data[i]['cognome']+ '<a href="#!"class="secondary-content"><i class=" material-icons orange-text">call_received</i></a></div>	';
					//dettaglio_rapportino_dipendente.html?id='+data[i]['id']+'

	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];

			$(".explode").click(function(){
				$("#utente_selezionato").show();
					$("#utente_selezionato").empty();
					$("#ora_selezionato").empty();
					var index_Cl = $(".explode").index(this);
					var d_Cl = json[index_Cl]['id'];
					id_utente=d_Cl;

					var inizio = $("#filter_start_giorno_dd").val()+"-"+$("#filter_start_giorno_mm").val()+"-"+$("#filter_start_giorno_yy").val();
					var fine  = $("#filter_stop_giorno_dd").val()+"-"+$("#filter_stop_giorno_mm").val()+"-"+$("#filter_stop_giorno_yy").val();
					var cliente_chip_ore = document.createElement('div');
					//cliente_chip_ore.className= "chip";
					cliente_chip_ore.innerHTML="dal <b>"+inizio+"</b> al <b>"+ fine+"</b>" ;
					$("#ora_selezionato").append(cliente_chip_ore);
					$("#ora_selezionato").hide();
					/*var spazio = document.createElement('br');
					$("#utente_selezionato").append(spazio);*/

					var cliente_chip = document.createElement('div');
					//cliente_chip.className= "chip";
					cliente_chip.style= "margin-top:2%;";
					cliente_chip.innerHTML="Dipendente: <b>"+json[index_Cl]['nome']+" "+json[index_Cl]['cognome']+"</b>";
					nome_dipendente=json[index_Cl]['nome']+" "+json[index_Cl]['cognome'];
					$("#utente_selezionato").append(cliente_chip);
					//$("#utente_selezionato").show();
					$("#filtro_selezionato").show();

				});

      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}


function populateListClient(filter){

	var q=filter;
	$.ajax({
      dataType: "json",
      url: "script_php/getClients.php?q="+ q+"&db="+getCookie('nomeDB')+"&all=1", //Relative or absolute path to response.php file
      data:"",
      success: function(data) {
	    json = data;
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

	        elementi[i] = document.createElement('li');
	        elementi[i].className ="collection-item";
	        if(data[i]['tipologia'] == 'p'){

		        elementi[i].innerHTML = '<div class="explode"><i class="info small material-icons orange-text">account_circle</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="material-icons orange-text">call_received</i></a></div>	';
						//dettaglio_rapportino_admin_cliente.html?id='+data[i]['id']+'&nome='+data[i]['nominativo']+'&f_ini='+$("#filter_start_giorno").val()+'&f_end='+$("#filter_stop_giorno").val()+'
		    	}else{
		        elementi[i].innerHTML = '<div class="explode"><i class="info small material-icons orange-text">business</i>'+data[i]['nominativo']+'<a href="#!" class="secondary-content"><i class="material-icons orange-text">call_received</i></a></div>	';
	        }

	    	$("#elenco").append(elementi[i]);


	    }
	    id = data[0]['id'];
			$(".explode").click(function(){
				$("#utente_selezionato").show();
					$("#utente_selezionato").empty();
					$("#ora_selezionato").empty();
					var index_Cl = $(".explode").index(this);
					var d_Cl = json[index_Cl]['id'];
					id_utente=d_Cl;

					var inizio = $("#filter_start_giorno_dd").val()+"-"+$("#filter_start_giorno_mm").val()+"-"+$("#filter_start_giorno_yy").val();
					var fine  = $("#filter_stop_giorno_dd").val()+"-"+$("#filter_stop_giorno_mm").val()+"-"+$("#filter_stop_giorno_yy").val();
					var cliente_chip_ore = document.createElement('div');
					//cliente_chip_ore.className= "chip";
					cliente_chip_ore.innerHTML="dal <b>"+inizio+"</b> al <b>"+ fine+"</b>" ;
					$("#ora_selezionato").append(cliente_chip_ore);
					$("#ora_selezionato").hide();
					/*var spazio = document.createElement('br');
					$("#utente_selezionato").append(spazio);*/

					var cliente_chip = document.createElement('div');
					//cliente_chip.className= "chip";
					cliente_chip.style= "margin-top:2%;";
					cliente_chip.id= "cclick";
					cliente_chip.innerHTML="Cliente: <b>"+json[index_Cl]['nominativo']+"</b>";
					nominativo_cliente= json[index_Cl]['nominativo'];
					$("#utente_selezionato").append(cliente_chip);
					//$("#utente_selezionato").show();
					$("#filtro_selezionato").show();

				});

      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}
