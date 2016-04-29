
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){
			var fg= $("#filter_start_giorno").val();
			var sg = $("#filter_stop_giorno").val();

			var filtro_inizio = fg.split('/')[2]+"-"+fg.split('/')[1]+"-"+fg.split('/')[0];
			var filtro_fine  = sg.split('/')[2]+"-"+sg.split('/')[1]+"-"+sg.split('/')[0];
			//alert("filtro_inizio: "+filtro_inizio+" --- filtro_fine"+filtro_fine);
      window.location="script_php/scarica_rappDipendenti.php?id="+id_utente+"&inizio="+filtro_inizio+"&fine="+filtro_fine+"&db="+getCookie('nomeDB');

    });

});
