
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){
      var id_utente = getUrlVars()["id"];
			//id_clienteR
			//alert("id utente "+id_utente);
			var filtro_inizio= $("#data_inizio").val();
			//alert("stampa ora filtro "+filtro_inizio);
			var filtro_fine= $("#data_fine").val();
      window.location="script_php/scarica_rappClienti.php?id="+id_utente+"&inizio="+filtro_inizio+"&fine="+filtro_fine+"&db="+getCookie('nomeDB');

    });
});
