
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){
      var id_utente = getUrlVars()["id"];
			//id_clienteR
			//alert("id utente "+id_utente);
			
			var filtro_inizio = $("#filter_start_giorno_dd").val()+"-"+$("#filter_start_giorno_mm").val()+"-"+$("#filter_start_giorno_yy").val();
			var filtro_fine  = $("#filter_stop_giorno_dd").val()+"-"+$("#filter_stop_giorno_mm").val()+"-"+$("#filter_stop_giorno_yy").val();

      window.location="script_php/scarica_rappClienti.php?id="+id_utente+"&inizio="+filtro_inizio+"&fine="+filtro_fine+"&db="+getCookie('nomeDB');

    });
});
