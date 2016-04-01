
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){
      var id_utente = getUrlVars()["id"];
			//var filtro_inizio= $("#data_inizio").val();
			//alert("stampa ora filtro "+filtro_inizio);
			//var filtro_fine= $("#data_fine").val();

			var filtro_inizio = $("#filter_start_giorno_dd").val()+"-"+$("#filter_start_giorno_mm").val()+"-"+$("#filter_start_giorno_yy").val();
			var filtro_fine  = $("#filter_stop_giorno_dd").val()+"-"+$("#filter_stop_giorno_mm").val()+"-"+$("#filter_stop_giorno_yy").val();
			//alert("filtro_inizio: "+filtro_inizio+" --- filtro_fine"+filtro_fine);
      window.location="script_php/scarica_rappDipendenti.php?id="+id_utente+"&inizio="+filtro_inizio+"&fine="+filtro_fine+"&db="+getCookie('nomeDB');

    });
		
});
