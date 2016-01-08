$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
    $("#id_insert_item").hide();
    $("#botton_insert_item").hide();
    $("#new_insert_item").hide();
    $("#elementi_materiali").hide();
		var id_utente = getUrlVars()["id"];
		var nome_utente = getUrlVars()["nome"];
		//$("#nome_cliente").text(""+nome_utente);
		populateRapportino(id_utente);

		//filtro data parametri default
		var primoG = getFirstData();
		var ultimoG = getCurrentData()
		//alert(" primoG: " +primoG + "  ultimoG: "+ultimoG );


    var stato_p_list=0;
    var stato_new_p_list=0;
    var stato_materiali=0;

    $("#pulsante_list").on("click",function(){
      if(stato_p_list==1){
        $("#id_insert_item").hide();
        $("#botton_insert_item").hide();
        stato_p_list=0;
      }else{
        $("#id_insert_item").show();
        $("#botton_insert_item").show();
        stato_p_list=1;
      }
    });

    $("#add_list").on("click",function(){
      if(stato_new_p_list==1){
        $("#new_insert_item").hide();
        stato_new_p_list=0;
      }else{
        $("#new_insert_item").show();
        stato_new_p_list=1;
      }
    });

    $("#pulsante_materiali").on("click",function(){
      if(stato_materiali==1){
        $("#elementi_materiali").hide();
        stato_materiali=0;
      }else{
        $("#elementi_materiali").show();
        stato_materiali=1;
      }
    });

});

function populateRapportino(filter){
//alert("id utente: "+filter);
	var q;
	if(filter != "")
		q = filter;
	else
		q = " ";
		//alert("url : "+"http://www.trentinoannuncia.com/portale_artigiani/script_php/getRapportinoCliente.php?q= "+ q+"&db="+getCookie('nomeDB') );

	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getRapportinoCliente.php?q="+q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
			async:false,
      success: function(data) {

	    json = data;
			//alert("chiamata avvenuta con successo");

        console.log(data);
        var elementi = new Array();
         $("#lista_rap").empty();
				 var conteggio=0;
				 if(data ==null){
					 populateRapportinoVuoto(q);
				 }
        for(var i = 0; i < data.length; i++) {

					conteggio = conteggio +1;
					$("#nome_cliente").text(""+data[i]['nominativo']);
					var dataTot= data[i]['inizio'];
					var dataS = dataTot.split(' ');
					var dataD =dataS[0];
					var data_i = dataD.split('-');
					var myDate = ""+data_i[2]+"-"+data_i[1]+"-"+data_i[0];

					var dataDb = returnRangeDate(dataD);
					if(dataDb == true){
						//alert("rapportino contenuto nel range");
						//GENERO ELEMENTO!!
						elementi[i] = document.createElement('li');
		        elementi[i].className ="collection-item avatar";
						elementi[i].innerHTML = '<i class="green accent-4 material-icons circle">access_time</i><span class="title">Data : '+myDate+ '</span><p>Ore Totali : 5</p><a id="pulsante_list" style="position: absolute; top: 16px; right: 5%;" class="btn-floating red"><i class="large mdi-navigation-menu"></i></a>';
						$("#lista_rap").append(elementi[i]);
					}


					//alert("ora inizio"+data[i]['inizio']);

					//alert("differenza giorni : "+diff);

				}
      },
      error: function(xhr){
	     console.log(xhr.status);
			 alert("Problemaaa");
        return false;
      }
    });

    //return false;

}


function populateRapportinoVuoto(filter){
//alert("id utente: "+filter);
	var q;
	if(filter != "")
		q = filter;
	else
		q = " ";
		//alert("url : "+"http://www.trentinoannuncia.com/portale_artigiani/script_php/getRapportinoCliente.php?q= "+ q+"&db="+getCookie('nomeDB') );
alert("allorha"+q);
	$.ajax({
      dataType: "json",
      url: "http://www.trentinoannuncia.com/portale_artigiani/script_php/getRapportinoClienteVuoto.php?q="+q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
			async:false,
      success: function(data) {

	    json = data;
			//alert("chiamata avvenuta con successo");
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

					$("#nome_cliente").text(""+data[i]['nominativo']);
					//alert("ora inizio"+data[i]['inizio']);
					//$("#ora_inizio").value(""+data[i]['inizio']);
					//$("#ora_fine").value(""+data[i]['fine']);
					//$("#nome_cliente").text(""+data[i]['nominativo']);


					//settare campo e scaricare dati dalla tabella rapportino!!!
				//	$('#nome_cliente').text(""+data[i]['nominativo']);
					//alert("il nome del cliente : "+data[i]['nominativo']);
	    	}
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}



function getFirstData(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
		}

	if(mm<10) {
    	mm='0'+mm
	}

	today = '01'+'/'+mm+'/'+yyyy;
	return today;
}

function getCurrentData(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
		}

	if(mm<10) {
    	mm='0'+mm
	}

	today = dd+'/'+mm+'/'+yyyy;
	return today;
}

function GetNumberDay(inizio, fine){
	data_i = inizio.split('/');
	data_f = fine.split('/');
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var firstDate = new Date(data_i[2],data_i[1],data_i[0]);
	var secondDate = new Date(data_f[2],data_f[1],data_f[0]);

	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	return diffDays;
}

function returnRangeDate(d1){
	//data = data.split('-');
	inizio = document.getElementById("data_inizio").value;
	var dataInizio = inizio.split('-');
	fine  = document.getElementById("data_fine").value;
	var dataFine = fine.split('-');

	if(dataInizio[0]<10){
		giorno="0"+dataInizio[0];
	}
	inizio= dataInizio[2]+"-"+dataInizio[1]+"-"+giorno;

		if(dataFine[0]<10){
			giorno="0"+dataFine[0];
		}
	fine= dataFine[2]+"-"+dataFine[1]+"-"+giorno;

	if((d1 > inizio)&&(d1 < fine)){
		return true;
	}else{
		return false;
	}


}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
