var det_json = new Array();
var lista_id_rap = new Array();
var mod_materiali_tot = new Array();
var mod_mezzi_tot = new Array();
var det_index=0;
var det_id=0;
var id_utente="";
var id_rap="";

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
    $("#id_insert_item").hide();
    $("#botton_insert_item").hide();
    $("#new_insert_item").hide();
    $("#elementi_materiali").hide();
		$("#elementi_mezzi").hide();
	id_utente = getUrlVars()["id"];
	var nome_utente = getUrlVars()["nome"];
		//$("#nome_cliente").text(""+nome_utente);
	var primoG = getFirstData();
	var ultimoG = getCurrentData();
	$("#data_fine").val(ultimoG);
	$("#data_inizio").val(primoG);
	populateRapportino(id_utente);
		//filtro data parametri default

	$("#reset_filtro").on("click",function(){
		$("#data_inizio").val(primoG);
		$("#data_fine").val(ultimoG);
		lista_id_rap = new Array();
		settaOra(0);
		populateRapportino(id_utente);
    });

	$("#yes_delete").on("click",function(){
		deleteRapportino();
		$("#modal2").closeModal();
    });
	$("#no_delete").on("click",function(){
		$("#modal2").closeModal();
    });

    var stato_p_list=0;
    var stato_new_p_list=0;
    var stato_materiali=0;
		var stato_mezzi=0;

	$("#cerca_filtro").on("click",function(){
		lista_id_rap = new Array();
		settaOra(0);
		populateRapportino(id_utente);
    });

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
				mod_materiali_tot = new Array();
      }else{
        $("#elementi_materiali").show();
        stato_materiali=1;
				setteRiepilogoMateriali();
      }
    });

		$("#pulsante_mezzi").on("click",function(){
      if(stato_mezzi==1){
        $("#elementi_mezzi").hide();
        stato_mezzi=0;
				mod_mezzi_tot = new Array();
      }else{
        $("#elementi_mezzi").show();
        stato_mezzi=1;
				setteRiepilogoMezzi();
      }
    });
});


function populateRapportino(filter){
	var q;
	if(filter != "")
		q = filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "script_php/getRapportinoDipendente.php?q="+q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
	  async:false,
      success: function(data) {

	    det_json = data;

        console.log(data);
        var elementi = new Array();
         $("#lista_rap").empty();
				 var conteggio=0;
				 if(data ==null){
					 populateRapportinoVuoto(q);
				 }
				 var oldDate="";
				 var cont_index=0;
				 var ore_totali_range=0;
				 var ele_rap="";
				 var old_ele_rap="";
				 var cont_ore=0;
				 var myDate="";
				 var elem_data = new Array();
				 for(var i = 0; i < data.length; i++) {

						conteggio = conteggio +1;
						$("#nome_cliente").text(""+data[i]['nome']+" "+data[i]['cognome']);

						var dataTot= data[i]['inizio'];
						var dataS = dataTot.split(' ');
						var dataD =dataS[0];
						var data_i = dataD.split('-');
						myDate = ""+data_i[2]+"-"+data_i[1]+"-"+data_i[0];

						var dataDb = returnRangeDate(dataD);
						if(dataDb == true){
							elem_data.push(data[i]);
							lista_id_rap.push(data[i]['id']);
						}
					}
					for(var i = 0; i < elem_data.length; i++) {
							dataTot= elem_data[i]['inizio'];
							var f = elem_data[i]['fine'];
							var o =differenzaOre(dataTot, f);
							var p_min =elem_data[i]['pausa'];
							var p = pausaCent(p_min);
							var diff_lavoro = o-p;

							ore_totali_range = ore_totali_range + diff_lavoro;
							settaOra(ore_totali_range);


							var dataTot= elem_data[i]['inizio'];
							var dataS = dataTot.split(' ');
							var dataD =dataS[0];
							var data_i = dataD.split('-');
							myDate = ""+data_i[2]+"-"+data_i[1]+"-"+data_i[0];

							var ore_singolo_gg=0;

							if(i==0){
								cont_ore= cont_ore+diff_lavoro;
							}else{
								if(myDate==oldDate){
									elementi[i] = document.createElement('li');
				        	elementi[i].className ="collection-item avatar no_see";
									elementi[i].innerHTML = '<i class="orange accent-4 material-icons circle">access_time</i><span class="title">Data : '+oldDate+ '</span><p>Ore Totali : 5</p><div align="right"><a style="right: 5%;" class="btn-floating orange"><i class=" dettaglio_list large mdi-navigation-menu"></i></a></divZ';
									ele_rap = elementi[i];
									cont_ore= cont_ore+diff_lavoro;
									$("#lista_rap").append(ele_rap);
									//$("#lista_rap").append(elementi[i]);

								}else{
										elementi[i] = document.createElement('li');
				        		elementi[i].className ="collection-item avatar";
										elementi[i].innerHTML = '<i class="orange accent-4 material-icons circle">access_time</i><span class="title">Data : '+oldDate+ '</span><p>Ore Totali : '+cont_ore+'</p><div align="right"><a style="right: 5%;" class="btn-floating orange"><i class=" dettaglio_list large mdi-navigation-menu"></i></a></div>';
										ele_rap = elementi[i];
										cont_ore = diff_lavoro;
										$("#lista_rap").append(ele_rap);
								}
							}

							if(i == (elem_data.length)-1){
								elementi[i] = document.createElement('li');
								elementi[i].className ="collection-item avatar";
								elementi[i].innerHTML = '<i class="orange accent-4 material-icons circle">access_time</i><span class="title">Data : '+myDate+ '</span><p>Ore Totali :'+cont_ore+'</p><div align="right"><a style="right: 5%;" class="btn-floating orange"><i class=" dettaglio_list large mdi-navigation-menu"></i></a></div>';
								ele_rap = elementi[i];
							}
							$("#lista_rap").append(ele_rap);

							cont_index = cont_index+1;
							oldDate=myDate;



					}

				//$("#ore_tot").innerHTML = "RIEPILOGO ORE: "+ore_totali_range;
				if(elem_data.length != 0){
					det_id = elem_data[0]['id'];
					explodeRapportino(elem_data[0]);
				}else{
					$("#lista_singolo_rap").empty();
					elementi[i] = document.createElement('li');
					elementi[i].className ="grey lighten-3 collection-item avatar";
					var tot_ele = "Non ci sono rapportini";
					elementi[i].innerHTML = tot_ele;
					$("#lista_singolo_rap").append(elementi[i]);
				}
				$(".dettaglio_list").click(function(){
					det_index = $(".dettaglio_list").index(this);
					explodeRapportino(elem_data[det_index]);
				});

      },
      error: function(xhr){
	     console.log(xhr.status);
			 alert("Problemaaa");
        return false;
      }
    });

}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


function pausaCent(minuti){
	var in_ora= minuti/60;
	var min = roundToTwo(in_ora);
	return min;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function settaOra(ore){
	document.getElementById("ore_tot").innerHTML = "RIEPILOGO ORE: "+ore;
	//alert("ore totali "+ore);
}

function dataGiorni(data){
	var dataTot= data;
	var dataS = dataTot.split(' ');
	var dataD =dataS[0];
	var data_i = dataD.split('-');
	var myDate = ""+data_i[2]+"-"+data_i[1]+"-"+data_i[0];
	return myDate;
}

function populateRapportinoVuoto(filter){
//alert("id utente: "+filter);
	var q;
	if(filter != "")
		q = filter;
	else
		q = " ";
		alert("allorha"+q);
	$.ajax({
      dataType: "json",
      url: "script_php/getRapportinoClienteVuoto.php?q="+q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
			async:false,
      success: function(data) {

	    det_json = data;
			//alert("chiamata avvenuta con successo");
        console.log(data);
        var elementi = new Array();
         $("#elenco").empty();
        for(var i = 0; i < data.length; i++) {

					$("#nome_cliente").text(""+data[i]['nominativo']);

	    	}
      },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

    //return false;

}

function explodeRapportino(rapportino){

	var id_cli = rapportino['id_cliente'];
	var id_dip = rapportino['id_dipendente'];
	var data_i= rapportino['inizio'];
	var giorni = dataGiorni(data_i);
	creazioneListaRapportino(id_dip, id_cli, giorni);

}

function creazioneListaRapportino(dipendente, cliente, giorno){
	$.ajax({
			dataType: "json",
			url: "script_php/getSingoloRapportinoDipendente.php?d="+dipendente+"&c="+cliente+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
			data:"",
			async:false,
			success: function(data) {
				det_json = data;
					console.log(data);
					var elementi = new Array();
					 $("#lista_singolo_rap").empty();
					 var conteggio=0;
					 if(data ==null){
						 alert("data e null!!");
						 //populateRapportinoVuoto(q);
					 }else{
						 //alert("prima del ciclo");
						 for(var i = 0; i < data.length; i++) {
							var data_i= data[i]['inizio'];
						 	var giorni = dataGiorni(data_i);
							//alert("giorno: "+giorno+ " giorni: "+giorni);
							if(giorno == giorni){

								elementi[i] = document.createElement('li');
								elementi[i].className ="grey lighten-3 collection-item avatar";
								var nomeD = datiCliente(data[i]['id_cliente']);
								var inizio_ore ='<div class="orange col s12" style="padding:2%;"><font color="white">Data:  </font>'+giorni+'</div>';
								var ele_dip = '<i class="orange accent-4 material-icons circle">access_time</i><div class="row"><div class=" col s12" style="padding:2%;"><font color="orange">Cliente:  </font>'+nomeD+'</div>';
								var inizio = data[i]['inizio'];
								var orai = formatotempo(inizio);
								var ele_ini = '<div class="col s6" style="padding:2%;"><font color="orange">Ora inizio:  </font>'+orai+'</div>';
								var fine = data[i]['fine'];
								var oraf = formatotempo(fine);
								var ele_fine = '<div class="col s6" style="padding:2%;"><font color="orange">Ora inizio:  </font>'+oraf+'</div>';
								var pausa = data[i]['pausa'];
								var ele_pausa ='<div class=" col s6" style="padding:2%;"><font color="orange">Pausa:  </font>'+pausa+' minuti</div>';
								var diff =differenzaOre(inizio, fine);
								var pa = pausaCent(pausa);
								var diff_lavoro = diff-pa;
								var ele_ore = '<div class=" col s6" style="padding:2%;"><font color="orange">ORE TOTALI:  </font><b>'+diff_lavoro+'</b></div>';
								var note = data[i]['note'];
								var ele_desc = '<div class="col s12" style="padding:2%;"><font color="orange">Descrizione:  </font>'+note+'</div>';
								var ele = '</div><a class="btn-floating orange"><i id="'+i+'" class="edit_rap large material-icons">mode_edit</i></a><a style="margin-left:2%;" class="btn-floating orange"><i id="'+i+'" class="delete_rap large material-icons">delete</i></a>';

								var tot_ele = inizio_ore+ele_dip+ele_ini+ele_fine+ele_pausa+ele_ore+ele_desc+ele;
								elementi[i].innerHTML = tot_ele;
								$("#lista_singolo_rap").append(elementi[i]);
							}

						}
					}

					$(".edit_rap").click(function(){
						det_index = $(this).attr('id');
						id_rap= data[det_index]['id'];
						$('#modal1').openModal();
						setVarRapp(det_index);
					});

					$(".delete_rap").click(function(){
						det_index = $(this).attr('id');
						id_rap= data[det_index]['id'];
						$('#modal2').openModal();
					});

			},
			error: function(xhr){
			 console.log(xhr.status);
				return false;
			}
		});
}

function differenzaOre(inizio, fine){

	var a=inizio.split(" ");
	var d=a[0].split("-");
	var t=a[1].split(":");
	var timeStart = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]).getTime();

	//var timeStart = new Date(inizio).getTime();
	var a=fine.split(" ");
	var d=a[0].split("-");
	var t=a[1].split(":");
	var timeEnd = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]).getTime();
	//var timestamp = new Date(dateStringISO).getTime();
	//var timeEnd = new Date(fine).getTime();
	//alert("timeStart "+timeStart+"  timeEnd "+timeEnd);
	var hourDiff = timeEnd - timeStart; //in ms
	var secDiff = hourDiff / 1000; //in s
	var minDiff = hourDiff / 60 / 1000; //in minutes
	var hDiff = hourDiff / 3600 / 1000; //in hours
	var numOre = Math.round(hDiff);
	//alert("inizio "+inizio+"  fine "+fine+"   numero ore "+numOre );

	return numOre;
}

function formatotempo(tempo){
	data = tempo.split(' ');
	ora = data[1];
	var a_tempo= ora.split(':');
	var minuti =a_tempo[1];
	var ore =a_tempo[0]
	var fine_ora= ore+":"+minuti;
	return fine_ora;
}
function datiCliente(id){
	var nome="";
	//alert("script_php/getDipendente.php?id="+id+"&db="+getCookie('nomeDB'));
		$.ajax({
	      dataType: "json",
	      url: "script_php/getClienteRapp.php?id="+id+"&db="+getCookie('nomeDB'),//Relative or absolute path to response.php file
	      data:"",
				async:false,
	      success: function(data) {

				//alert("chiamata avvenuta con successo");
	        console.log(data);
	        var elementi = new Array();
	        // $("#elenco").empty();

	        for(var i = 0; i < data.length; i++) {
						nome = ""+data[i]['nominativo'] ;
						//alert("nome e cognome: "+nome);
						//return nome;

		    	}

	      },
	      error: function(xhr){
		     console.log(xhr.status);
	        return false;
	      }
	    });
			return nome;

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

	today = '01'+'-'+mm+'-'+yyyy;
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

	today = dd+'-'+mm+'-'+yyyy;
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

	var inizio = $("#data_inizio").val();
	var dataInizio = inizio.split('-');
	var fine  = $("#data_fine").val();
	var dataFine = fine.split('-');

	var giorno="";
	if(dataInizio[0].length==1){
		giorno="0"+dataInizio[0];
	}else{
		giorno=dataInizio[0];
	}
	inizio= dataInizio[2]+"-"+dataInizio[1]+"-"+giorno;
	//alert("dataFine[0].length  "+dataFine[0].length);
		if(dataFine[0].length==1){

			giorno="0"+dataFine[0];
		}else{
			giorno=dataFine[0];
		}

	fine= dataFine[2]+"-"+dataFine[1]+"-"+giorno;
	//alert("d1 : "+d1+ "  data inizio : "+inizio+ " data fine : "+fine);
	if((d1 >= inizio)&&(d1 <= fine)){
		return true;
	}else{
		return false;
	}
}

function setteRiepilogoMateriali(){
		//lista_id_rap
		for(var i = 0; i < lista_id_rap.length; i++) {
			load_AllMaterials(lista_id_rap[i]);
		}
		mod_updateListUtilizziMaterialiTot();
}

function load_AllMaterials(id_rapportino){
	//mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	$.ajax({
      dataType: "json",
      url: "script_php/getMaterialsRapportino.php?id="+ id_rapportino+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_materiali_tot.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'quantita':parseFloat(data[i]['quantita'])});

	   	 }
	   },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}
function mod_updateListUtilizziMaterialiTot(){
	$("#lista_materiali_tot").empty();
	$("#lista_materiali_tot").show();

	if(mod_materiali_tot.length == 0)
		$("#lista_materiali_tot").hide();

	$("#lista_materiali_tot").empty();
	var chip = new Array();

	for(var i=0; i < mod_materiali_tot.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_materiali_tot[i]['descrizione'] + '&nbsp; x' + mod_materiali_tot[i]['quantita']+'<a href="#!" ></a>';
  		$("#lista_materiali_tot").append(chip[i]);

	}

}

function setteRiepilogoMezzi(){
		//lista_id_rap
		for(var i = 0; i < lista_id_rap.length; i++) {
			load_AllMezzi(lista_id_rap[i]);
		}
		mod_updateListUtilizziMezziTot();
}

function load_AllMezzi(id_rapportino){
	//mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	$.ajax({
      dataType: "json",
      url: "script_php/getMezziRapportino.php?id="+ id_rapportino+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_mezzi_tot.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'quantita':parseFloat(data[i]['quantita'])});

	   	 }
	   },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}
function mod_updateListUtilizziMezziTot(){
	$("#lista_mezzi_tot").empty();
	$("#lista_mezzi_tot").show();

	if(mod_mezzi_tot.length == 0)
		$("#lista_mezzi_tot").hide();

	$("#lista_mezzi_tot").empty();
	var chip = new Array();

	for(var i=0; i < mod_mezzi_tot.length ;i++){
		chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_mezzi_tot[i]['descrizione'] + '&nbsp; x' + mod_mezzi_tot[i]['quantita']+'<a href="#!" ></a>';
  		$("#lista_mezzi_tot").append(chip[i]);

	}

}


function deleteRapportino(){
	$.ajax({
		url: "script_php/deleteRapportino.php", //Relative or absolute path to response.php file
		type:"POST",
				      data:{'id': id_rap,'db':getCookie('nomeDB')},
				      success: function(data) {
					      console.log(data);
					      Materialize.toast('Rapportino eliminato', 2000);
					      populateRapportino(id_utente);
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
