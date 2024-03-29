var det_json = new Array();
var lista_id_rap = new Array();
var mod_materiali_tot = new Array();
var mod_mezzi_tot = new Array();
var mod_materiali_single = new Array();
var mod_mezzi_single = new Array();

var det_index=0;
var det_id=0;
var id_utente="";
var id_rap="";
var d_i="";
var d_f="";
var rapportinoClick="";
var primoG = "";
var ultimoG = "";
var nome_sel="";
var euroMateriali=0;
var euroMezzi=0;
var nome_dipendente="";

$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	if(getCookie('vRR')==0)
		$("#vRR").hide();
    $("#id_insert_item").hide();
    $("#botton_insert_item").hide();
    $("#new_insert_item").hide();
    $("#elementi_materiali").hide();
		$("#elementi_mezzi").hide();

	id_utente = getUrlVars()["id"];
	var ii="";
	var ff="";
	if((getUrlVars()["f_ini"])==""){
		setDateDefault();
	}else{
		ii= getUrlVars()["f_ini"];
		$("#filter_start_giorno").val(ii);
		ff=getUrlVars()["f_end"];
		$("#filter_stop_giorno").val(ff);
	}
	nome_sel = getUrlVars()["nome"];

	primoG = getFirstData();
	ultimoG = getCurrentData();

	$("#sez_insermento_rapportino").hide();
	$("#download_file").hide();

	$("#lista_dettagli_rapportino").hide();
	$("#exit_lista_dettagli_rapportino").on("click",function(){
		exitButton();
	});

	var now = new Date();
	for(var i=2015;i<parseInt(now.getFullYear())+5;i++)
	{
		$("#filter_start_giorno_yy").append("<option value="+i+">"+i+"</option>");
		$("#filter_stop_giorno_yy").append("<option value="+i+">"+i+"</option>");
	}

	window.onload = function () {
	        buttonCercaAuto();
	}

	$('select').material_select();
	if(isNaN(id_utente)!=true){
		populateRapportino(id_utente);
	}

	$("#reset_filtro").on("click",function(){
		setDateDefault();
		$('select').material_select();
		lista_id_rap = new Array();
		settaOra(0);
		id_utente="admin";
		$("#filtro_selezionato").hide();
		if(isNaN(id_utente)!=true){
			populateRapportino(id_utente);
		}
    });

	$("#yes_delete").on("click",function(){
		deleteRapportino();
		$("#modal2").closeModal();
    });

	$("#no_delete").on("click",function(){
		$("#modal2").closeModal();
		onClickDetteglioList();
    });

		$("#cerca_filtro").on("change",function(){

			if($("#tipologia").val() == 'd'){
				document.location.href = "dettaglio_rapportino_amministratore.html?id="+id_utente+"&nome="+nome_dipendente+"&f_ini="+$("#filter_start_giorno").val()+"&f_end="+$("#filter_stop_giorno").val()+"&";
			}else{
				setLabelFilter();
			}

		});

    var stato_p_list=0;
    var stato_new_p_list=0;
    var stato_materiali=0;
		var stato_mezzi=0;

		$("#cerca_filtro").on("click",function(){
			if($("#tipologia").val() == 'd'){
					document.location.href = "dettaglio_rapportino_amministratore.html?id="+id_utente+"&nome="+nome_dipendente+"&f_ini="+$("#filter_start_giorno").val()+"&f_end="+$("#filter_stop_giorno").val()+"&";
					//dettaglio_rapportino_admin_cliente.html?id='+data[i]['id']+'&nome='+data[i]['nominativo']+'&f_ini='+$("#filter_start_giorno").val()+'&f_end='+$("#filter_stop_giorno").val()+'
			}else{
					buttonCerca();
			}
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
				populateListFascieOrarieAdd();
      }
    });

});
function buttonCercaAuto(){
	if(isNaN(id_utente)!=true){
		euroMateriali=0;
		euroMezzi=0;
		$("#filtro_selezionato").show();
		$("#ora_selezionato").empty();
		//alert("OOOOOOOOHHH");
		var inizio = $("#filter_start_giorno").val();
		var fine  = $("#filter_stop_giorno").val();
		var cliente_chip_ore = document.createElement('div');
		//cliente_chip_ore.className= "chip";
		cliente_chip_ore.innerHTML="dal <b>"+inizio+"</b> al <b>"+ fine+"</b>" ;
		$("#ora_selezionato").append(cliente_chip_ore);
		$("#ora_selezionato").show();
		var cliente_chip = document.createElement('div');
		//cliente_chip.className= "chip";
		cliente_chip.style= "margin-top:2%;";
		cliente_chip.id= "cclick";
		cliente_chip.innerHTML="Cliente: <b>"+nome_sel.replace(/%20/g, " ")+"</b>";
		$("#utente_selezionato").append(cliente_chip);
		lista_id_rap = new Array();
		settaOra(0);
		$("#lista_materiali_tot").empty();
		$("#lista_mezzi_tot").empty();
		populateRapportino(id_utente);
		$("#filtro_selezionato").show();
		$("#sez_insermento_rapportino").show();
		$("#download_file").show();
	}else{
		Materialize.toast('Prima seleziona un dipendente o un cliente!', 2000);
	}
}

function buttonCerca(){
	if(isNaN(id_utente)!=true){
		euroMateriali=0;
		euroMezzi=0;
		$("#filtro_selezionato").show();
		$("#ora_selezionato").empty();
		var inizio = $("#filter_start_giorno").val();
		var fine  = $("#filter_stop_giorno").val();
		var cliente_chip_ore = document.createElement('div');
		cliente_chip_ore.innerHTML="dal <b>"+inizio+"</b> al <b>"+ fine+"</b>" ;
		$("#ora_selezionato").append(cliente_chip_ore);
		$("#ora_selezionato").show();
		lista_id_rap = new Array();
		settaOra(0);
		$("#lista_materiali_tot").empty();
		$("#lista_mezzi_tot").empty();
		populateRapportino(id_utente);
		$("#filtro_selezionato").show();
		$("#sez_insermento_rapportino").show();
		$("#download_file").show();
	}else{
		Materialize.toast('Prima seleziona un dipendente o un cliente!', 2000);
	}
}

function setDateDefault(){
	d_i= primoG.split('-')[2]+"/"+primoG.split('-')[1]+"/"+primoG.split('-')[0];
	$("#filter_start_giorno").val(d_i);
	document.getElementById('lblInizio').innerHTML = takeNameDayFull(d_i);
	d_f= ultimoG.split('-')[2]+"/"+ultimoG.split('-')[1]+"/"+ultimoG.split('-')[0];
	$("#filter_stop_giorno").val(d_f);
	document.getElementById('lblFine').innerHTML = takeNameDayFull(d_f);
}

function setLabelFilter(){
	var inizio = $("#filter_start_giorno").val();
	var dataInizio = inizio.split('/');
	document.getElementById('lblInizio').innerHTML = takeNameDayFull(dataInizio[0]+"/"+dataInizio[1]+"/"+dataInizio[2]);
	var fine  = $("#filter_stop_giorno").val();
	var dataFine = fine.split('/');
	document.getElementById('lblFine').innerHTML = takeNameDayFull(dataFine[0]+"/"+dataFine[1]+"/"+dataFine[2]);
}

function createListMateriali(){
	$("#elementi_materiali").show();
	stato_materiali=1;
	setteRiepilogoMateriali();
}
function createListMezzi(){
	$("#elementi_mezzi").show();
	stato_mezzi=1;
	setteRiepilogoMezzi();
}
function exitButton(){
	$("#lista_dettagli_rapportino").hide();
	$('#dettaglio_contenitore').removeClass('noscroll');
}
function populateRapportino(filter){
	var q;
	if(filter != "")
		q = filter;
	else
		q = " ";
	$.ajax({
      dataType: "json",
      url: "script_php/getRapportinoCliente.php?q="+q+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
	  	//async:false,
      success: function(data) {

	    det_json = data;

        console.log(data);
        var elementi = new Array();
         $("#lista_rap").empty();
				 var conteggio=0;
				 if(data ==null){
					 //populateRapportinoVuoto(q);
					 $("#lista_singolo_rap").empty();
					elementi[i] = document.createElement('li');
					elementi[i].className ="grey lighten-3 collection-item avatar";
					var tot_ele = "Non ci sono rapportini";
					elementi[i].innerHTML = tot_ele;
					$("#lista_singolo_rap").append(elementi[i]);
				 }
				 else{
					 var oldDate="";
					 var cont_index=0;
					 var ore_totali_range=0;
					 var ele_rap="";
					 var old_ele_rap="";
					 var cont_ore=0;
					 var myDate="";
					 var elem_data = new Array();
					 for(var i = 0;i < data.length; i++) {

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
										elementi[i].innerHTML = '<i class="orange accent-4 material-icons circle">access_time</i><span class="title">Data : '+oldDate+ '</span><p>Ore Totali : 5</p><div align="right"><a style="right: 5%;" class="btn-floating orange"><i class="dettaglio_list material-icons">zoom_in</i></a></divZ';
										ele_rap = elementi[i];
										cont_ore= cont_ore+diff_lavoro;
										$("#lista_rap").append(ele_rap);
										//$("#lista_rap").append(elementi[i]);

									}else{
											var format_data = dataGiorniSfalsata(oldDate);
											var NameDate = takeNameDay(format_data);
											var NameOldDate= NameDate+" "+format_data;
											elementi[i] = document.createElement('li');
					        		elementi[i].className ="collection-item item_list_rap avatar dettaglio_list";
											elementi[i].style="min-height: 20px; padding-top:1px; padding-bottom:1px; padding-left:45px; cursor:pointer;"
											elementi[i].innerHTML = '<i class="orange accent-4 material-icons circle" style="line-height: 20px; width:20px; height:20px;">access_time</i><div align="right" style="position:absolute;right:1%;"><a style="line-height: 20px; width:20px; height:20px; right: 5%;" class="btn-floating orange"><i style=" line-height: 20px;width:20px; height:20px;"class=" material-icons">zoom_in</i></a></div><span style="font-weight: bold;" class="title">'+NameOldDate+ '</span><span class="title">&nbsp; &nbsp; Ore Totali : </span><span style="font-weight: bold;" class="title">'+cont_ore+'</span>';
											ele_rap = elementi[i];
											cont_ore = diff_lavoro;
											$("#lista_rap").append(ele_rap);
									}
								}

								if(i == ((elem_data.length)-1)){
									var format_data = dataGiorniSfalsata(myDate);
									var NameDate = takeNameDay(format_data);
									var NameOldDate= NameDate+" "+format_data;
									elementi[i] = document.createElement('li');
									elementi[i].className ="collection-item item_list_rap avatar dettaglio_list";
									elementi[i].style="min-height:0px; padding-top:1px; padding-bottom:1px; padding-left:45px;cursor:pointer;"
									elementi[i].innerHTML = '<i class="orange accent-4 material-icons circle" style="line-height: 20px;width:20px; height:20px;">access_time</i><div align="right" style="position:absolute;right:1%;"><a style="line-height: 20px; width:20px; height:20px; right: 5%;" class="btn-floating orange"><i style="line-height: 20px; width:20px; height:20px;"class=" material-icons">zoom_in</i></a></div><span style="font-weight: bold;" class="title">'+NameOldDate+ '</span><span class="title">&nbsp; &nbsp; Ore Totali : </span><span style="font-weight: bold;" class="title">'+cont_ore+'</span>';
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
						rapportinoClick = elem_data[det_index];
						onClickDetteglioList();
					});
			}
			createListMateriali();
			createListMezzi();
      },
      error: function(xhr){
	     console.log(xhr.status);
			 alert("Problemaaa");
        return false;
      }
    });

}
function onClickDetteglioList(){
	window.location.href = "#lista_dettagli_rapportino";
	$("#lista_dettagli_rapportino").show();
	$('#dettaglio_contenitore').addClass('noscroll');
	explodeRapportino(rapportinoClick);
}
function takeNameDay(day){
		var data_array = day.split('/');
		var dateDay = new Date(data_array[0], data_array[1] - 1, data_array[2]);
    var d = dateDay;
    var weekday = new Array(7);
    weekday[0] = "Dom";
    weekday[1] = "Lun";
    weekday[2] = "Mar";
    weekday[3] = "Mer";
    weekday[4] = "Gio";
    weekday[5] = "Ven";
    weekday[6] = "Sab";

    var n = weekday[d.getDay()];
    return n;

}

function takeNameDayFull(day){
		var data_array = day.split('/');
		var dateDay = new Date(data_array[0], data_array[1] - 1, data_array[2]);
    var d = dateDay;
    var weekday = new Array(7);
    weekday[0] = "Domenica";
    weekday[1] = "Lunedi";
    weekday[2] = "Martedi";
    weekday[3] = "Mercoledi";
    weekday[4] = "Giovedi";
    weekday[5] = "Venerdi";
    weekday[6] = "Sabato";

    var n = weekday[d.getDay()];
    return n;

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
	var min = in_ora.toFixed(2);//roundToTwo(in_ora);
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
	var myDate = ""+data_i[0]+"/"+data_i[1]+"/"+data_i[2];
	return myDate;
}
function dataGiorniSfalsata(data){
	var dataTot= data;
	var dataS = dataTot.split(' ');
	var dataD =dataS[0];
	var data_i = dataD.split('-');
	var myDate = ""+data_i[2]+"/"+data_i[1]+"/"+data_i[0];
	return myDate;
}

function populateRapportinoVuoto(filter){
//alert("id utente: "+filter);
	var q;
	if(filter != "")
		q = filter;
	else
		q = " ";
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
         if(data != null){
        for(var i = 0; i < data.length; i++) {

					$("#nome_cliente").text(""+data[i]['nome']+ " " +data[i]['cognome'] );

	    	}
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
	creazioneListaRapportino(id_cli, id_dip, giorni);

}

function creazioneListaRapportino(cliente, dipendente, giorno){
	$.ajax({
			dataType: "json",
			url: "script_php/getSingoloRapportino.php?c="+cliente+"&d="+dipendente+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
			data:"",
			//async:false,
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
								var nomeD = datiDipendente(data[i]['id_dipendente']);
								var NameGiorni = takeNameDayFull(giorni);
								var NameGiorni= NameGiorni+" "+giorni;
								var inizio_ore ='<div class="orange col s12" style="padding:2%;"><font color="white">Data:  </font>'+NameGiorni+'</div>';
								var ele_dip = '<i class="orange accent-4 material-icons circle">access_time</i><div class="row"><div class=" col s12" style="padding:2%;"><font color="orange">Dipendente:  </font>'+nomeD+'</div>';
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
								var diff_lavoro = (diff)-(pa);
								diff_lavoro =diff_lavoro.toFixed(2);
								var ele_ore = '<div class=" col s6" style="padding:2%;"><font color="orange">ORE TOTALI:  </font><b>'+diff_lavoro+'</b></div>';
								var note = data[i]['note'];
								var ele_desc = '<div class="col s12" style="padding:2%;"><font color="orange">Descrizione:  </font>'+note+'</div>';

								mod_materiali_single = new Array();
								load_SingleMaterials(data[i]['id']);
								var arrayMa = mod_updateListUtilizziMaSingle();
								var ma=  '<div class="col s12" style="padding:2%;"><font color="orange">Materiali:  </font>'+arrayMa+'</div>';
								mod_materiali_single = new Array();

								load_SingleMezzi(data[i]['id']);
								var arrayMe = mod_updateListUtilizziMeSingle();
								var me=  '<div class="col s12" style="padding:2%;"><font color="orange">Mezzi:  </font>'+arrayMe+'</div>';

								if(getCookie("LOCK") ==1){
									if(data[i]['bloccato']==0)
										var ele = '</div><a class="btn-floating orange"><i id="'+i+'" class="edit_rap large material-icons">mode_edit</i></a><a style="margin-left:2%;" class="btn-floating orange"><i id="'+i+'" class="delete_rap large material-icons">delete</i></a><a style="margin-left:2%;" class="btn-floating orange"><i id="'+i+'" class="lock_rapp large material-icons">lock_open</i></a>';
									else
										var ele = '</div><a style="margin-left:2%;" class="btn-floating orange"><i id="'+i+'" class="unlock_rapp large material-icons">lock_outline</i></a>';
								}
								else{
									if(data[i]['bloccato']==0)
										var ele = '</div><a class="btn-floating orange"><i id="'+i+'" class="edit_rap large material-icons">mode_edit</i></a><a style="margin-left:2%;" class="btn-floating orange"><i id="'+i+'" class="delete_rap large material-icons">delete</i></a>';
									else
										var ele = '';
								}
								var tot_ele = inizio_ore+ele_dip+ele_ini+ele_fine+ele_pausa+ele_ore+ele_desc+ma+me+ele;
								elementi[i].innerHTML = tot_ele;
								$("#lista_singolo_rap").append(elementi[i]);
							}

						}
					}

					$(".edit_rap").click(function(){
						$('#dettaglio_contenitore').removeClass('noscroll');
						exitButton();
						det_index = $(this).attr('id');
						id_rap= data[det_index]['id'];
						$('#modal1').openModal();
						setVarRapp(det_index);
					});

					$(".delete_rap").click(function(){
						$('#dettaglio_contenitore').removeClass('noscroll');
						exitButton();
						det_index = $(this).attr('id');
						id_rap= data[det_index]['id'];
						$('#modal2').openModal();
					});

					$(".lock_rapp").click(function(){
						det_index = $(this).attr('id');
						id_rap= data[det_index]['id'];
						lock_rapportino(id_rap);
						explodeRapportino(rapportinoClick);
					});


					$(".unlock_rapp").click(function(){
						det_index = $(this).attr('id');
						id_rap= data[det_index]['id'];
						unlock_rapportino(id_rap);
						explodeRapportino(rapportinoClick);
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
	var numOre = hDiff.toFixed(2);//Math.round10(hDiff, -2);//Math.round(hDiff);
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
function datiDipendente(id){
	var nome="";
	//alert("script_php/getDipendente.php?id="+id+"&db="+getCookie('nomeDB'));
		$.ajax({
	      dataType: "json",
	      url: "script_php/getDipendente.php?id="+id+"&db="+getCookie('nomeDB'),//Relative or absolute path to response.php file
	      data:"",
				async:false,
	      success: function(data) {

				//alert("chiamata avvenuta con successo");
	        console.log(data);
	        var elementi = new Array();
	        // $("#elenco").empty();

	        for(var i = 0; i < data.length; i++) {
						nome = ""+data[i]['nome'] +" "+ data[i]['cognome'];
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

	var inizio = $("#filter_start_giorno").val();
	var dataInizio = inizio.split('/');
	var fine  = $("#filter_stop_giorno").val();
	var dataFine = fine.split('/');

	var giorno="";
	var giornoFine="";
	if(dataInizio[2].length==1){
		giorno="0"+dataInizio[2];
	}else{
		giorno=dataInizio[2];
	}
	inizio= dataInizio[0]+"-"+dataInizio[1]+"-"+giorno;
	if(dataFine[2].length==1){
		giornoFine="0"+dataFine[2];
	}else{
		giornoFine=dataFine[2];
	}

	fine= dataFine[0]+"-"+dataFine[1]+"-"+giornoFine;
	//alert("d1 : "+d1+ "  data inizio : "+inizio+ " data fine : "+fine);
	if((d1 >= inizio)&&(d1 <= fine)){
		return true;
	}else{
		return false;
	}
}

function setteRiepilogoMateriali(){
	euroMateriali=0;
	if(lista_id_rap.length==0){
		$("#lista_materiali_tot").empty();
	}else{
		for(var i = 0; i < lista_id_rap.length; i++) {
			load_AllMaterials(lista_id_rap[i]);
		}
		mod_updateListUtilizziMaterialiTot();
	}
}

function load_AllMaterials(id_rapportino){
	//mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	var inizio = $("#filter_start_giorno").val();
	var dataInizio = inizio.split('/');
	var fine  = $("#filter_stop_giorno").val();
	var dataFine = fine.split('/');
	var filtro_inizio = dataInizio[2]+"-"+dataInizio[1]+"-"+dataInizio[0];
	var filtro_fine  = dataFine[2]+"-"+dataFine[1]+"-"+dataFine[0];

	$.ajax({
      dataType: "json",
      url: "script_php/getMaterialsRapportinoAdminCliente.php?id="+ id_utente+"&inizio="+filtro_inizio+"&fine="+filtro_fine+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
				 mod_materiali_tot = new Array();
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_materiali_tot.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'inizio':data[i]['inizio'],'quantita':parseFloat(data[i]['quantita']),'prezzo':parseFloat(data[i]['prezzo'])});
					//alert("inizio"+'inizio':data[i]['inizio']);
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
	var materiali = new Array();
	//alert("mod_materiali_tot.length "+mod_materiali_tot.length);

	for(var i=0; i < mod_materiali_tot.length ;i++){
		/*chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_materiali_tot[i]['inizio'] + '&nbsp; ' + mod_materiali_tot[i]['descrizione'] + '&nbsp; x' + mod_materiali_tot[i]['quantita']+'<a href="#!" ></a>';
  	$("#lista_materiali_tot").append(chip[i]);
		*/
		materiali[i] = document.createElement('li');
		materiali[i].className ="collection-item avatar item_list_rap dettaglio_list";
		materiali[i].style="min-height: 0px; padding-top:1px; padding-bottom:1px; padding-left:45px; "

		var data_mat= dataGiorni(mod_materiali_tot[i]['inizio']);
		var name_day_mat=takeNameDay(data_mat);
		data_mat= name_day_mat+" "+data_mat;
		var singolo_art = mod_materiali_tot[i]['quantita']*mod_materiali_tot[i]['prezzo'];
		euroMateriali= euroMateriali+(singolo_art);
		materiali[i].innerHTML='<b><i class="orange accent-4 material-icons circle" style="line-height: 20px;width:20px; height:20px;">access_time</i>'+data_mat+ '&nbsp; ' + mod_materiali_tot[i]['descrizione'] + '&nbsp; x' + mod_materiali_tot[i]['quantita']+ '&nbsp; - EURO ' +singolo_art+'</b>';
		$("#lista_materiali_tot").append(materiali[i]);

	}
	document.getElementById("mat_tot").innerHTML = "RIEPILOGO MATERIALI: EURO "+euroMateriali;
}

function setteRiepilogoMezzi(){
	euroMezzi=0;
	if(lista_id_rap.length==0){
		$("#lista_mezzi_tot").empty();
	}else{
			for(var i = 0; i < lista_id_rap.length; i++) {
				load_AllMezzi(lista_id_rap[i]);
			}
				mod_updateListUtilizziMezziTot();
	}
}

function load_AllMezzi(id_rapportino){
	//mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	var inizio = $("#filter_start_giorno").val();
	var dataInizio = inizio.split('/');
	var fine  = $("#filter_stop_giorno").val();
	var dataFine = fine.split('/');
	var filtro_inizio = dataInizio[2]+"-"+dataInizio[1]+"-"+dataInizio[0];
	var filtro_fine  = dataFine[2]+"-"+dataFine[1]+"-"+dataFine[0];

	$.ajax({
      dataType: "json",
      url: "script_php/getMezziRapportinoAdminCliente.php?id="+id_utente+"&inizio="+filtro_inizio+"&fine="+filtro_fine+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
				 mod_mezzi_tot = new Array();
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_mezzi_tot.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'inizio':data[i]['inizio'],'quantita':parseFloat(data[i]['quantita']),'prezzo':parseFloat(data[i]['prezzo'])});

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
	var mezzi = new Array();

	for(var i=0; i < mod_mezzi_tot.length ;i++){
		/*chip[i] = document.createElement('div');
		chip[i].className= "chip";
		chip[i].innerHTML=mod_mezzi_tot[i]['descrizione'] + '&nbsp; x' + mod_mezzi_tot[i]['quantita']+'<a href="#!" ></a>';
		$("#lista_mezzi_tot").append(chip[i]);*/

		mezzi[i] = document.createElement('li');
		mezzi[i].className ="collection-item avatar item_list_rap dettaglio_list";
		mezzi[i].style="min-height: 20px; padding-top:1px; padding-bottom:1px; padding-left:45px; "

		var data_mez= dataGiorni(mod_mezzi_tot[i]['inizio']);
		var name_day_mez=takeNameDay(data_mez);
		data_mez= name_day_mez+" "+data_mez;
		var singolo_art = mod_mezzi_tot[i]['quantita']*mod_mezzi_tot[i]['prezzo'];
		euroMezzi= euroMezzi+(singolo_art);
		mezzi[i].innerHTML='<b><i class="orange accent-4 material-icons circle" style="line-height: 20px;width:20px; height:20px;">access_time</i>'+data_mez+ '&nbsp; ' + mod_mezzi_tot[i]['descrizione'] + '&nbsp; x' + mod_mezzi_tot[i]['quantita']+ '&nbsp; - EURO ' +singolo_art+'</b>';
		$("#lista_mezzi_tot").append(mezzi[i]);

	}
	document.getElementById("mez_tot").innerHTML = "RIEPILOGO MEZZI: EURO "+euroMezzi;
}

function load_SingleMezzi(id_rapportino){
	//mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	mod_mezzi_single = new Array();
	$.ajax({
      dataType: "json",
      url: "script_php/getMezziRapportino.php?id="+ id_rapportino+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_mezzi_single.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'quantita':parseFloat(data[i]['quantita'])});

	   	 }
	   },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}

function load_SingleMaterials(id_rapportino){
	//mod_materiali_selezionati.splice(0,mod_materiali_selezionati.length);
	mod_materiali_single = new Array();
	$.ajax({
      dataType: "json",
      url: "script_php/getMaterialsRapportino.php?id="+ id_rapportino+"&db="+getCookie('nomeDB'), //Relative or absolute path to response.php file
      data:"",
      async:false,
      success: function(data) {
	   	 if(data != null){
		   	 for(var i=0;i<data.length;i++)
		   	 	mod_materiali_single.push({'id':data[i]['id'],'descrizione':data[i]['descrizione'],'quantita':parseFloat(data[i]['quantita'])});

	   	 }
	   },
      error: function(xhr){
	     console.log(xhr.status);
        return false;
      }
    });

}


function mod_updateListUtilizziMeSingle(){
	var chip_mezzi = new Array();
	var l_me="";
	for(var i=0; i < mod_mezzi_single.length ;i++){
		chip_mezzi[i]='<div class="chip">'+mod_mezzi_single[i]['descrizione'] + '&nbsp; x' + mod_mezzi_single[i]['quantita']+'<a href="#!" ></a></div>';
  		//$("#lista_mezzi_tot").append(chip[i]);
		l_me= l_me + chip_mezzi[i];
	}
	return l_me;
}

function mod_updateListUtilizziMaSingle(){
	var chip_materiali = new Array();
	var l_ma="";
	for(var i=0; i < mod_materiali_single.length ;i++){
		chip_materiali[i]='<div class="chip">'+mod_materiali_single[i]['descrizione'] + '&nbsp; x' + mod_materiali_single[i]['quantita']+'<a href="#!" ></a></div>';
		l_ma= l_ma + chip_materiali[i];
	}
	return l_ma;
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


function lock_rapportino(id){
	$.ajax({
		url: "script_php/confirmRapp.php", //Relative or absolute path to response.php file
		type:"POST",
				      data:{
					      'id': id_rap,
					      'lock':1,
					      'db':getCookie('nomeDB')
					      },
				      success: function(data) {
					      console.log(data);
					      Materialize.toast('Rapportino bloccato', 2000,"",function(){});
					      //populateRapportino(id_utente);
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });
}


function unlock_rapportino(id){
	$.ajax({
		url: "script_php/confirmRapp.php", //Relative or absolute path to response.php file
		type:"POST",
				      data:{
					      'id': id_rap,
					      'lock':0,
					      'db':getCookie('nomeDB')
					      },
				      success: function(data) {
					      console.log(data);
					      Materialize.toast('Rapportino sbloccato', 2000,"",function(){});
					      //populateRapportino(id_utente);
					  },
				      error: function(xhr){
					     console.log(xhr.status);
				      }
				    });
}
