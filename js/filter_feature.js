$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
	else{
  $.ajax({
      url: "script_php/getGroupDetails.php",
      type:"POST",
      async:false,
      data:{
	      "id":getCookie("classe_privilegi"),
	      "db":getCookie("nomeDB")
      },
      success: function(data) {

        setCookie("vCL",data[0]["visualizzazione_cliente"],30);
        setCookie("aCL",data[0]["aggiunta_cliente"],30);
        setCookie("cCL",data[0]["cancellazione_cliente"],30);
        setCookie("mCL",data[0]["modifica_cliente"],30);

        setCookie("vDI",data[0]["visualizzazione_dipendente"],30);
        setCookie("aDI",data[0]["aggiunta_dipendente"],30);
        setCookie("cDI",data[0]["cancellazione_dipendente"],30);
        setCookie("mDI",data[0]["modifica_dipendente"],30);

        setCookie("vMA",data[0]["visualizzazione_materiale"],30);
        setCookie("aMA",data[0]["aggiunta_materiale"],30);
        setCookie("cMA",data[0]["cancellazione_materiale"],30);
        setCookie("mMA",data[0]["modifica_materiale"],30);


        setCookie("vME",data[0]["visualizzazione_mezzo"],30);
        setCookie("aME",data[0]["aggiunta_mezzo"],30);
        setCookie("cME",data[0]["cancellazione_mezzo"],30);
        setCookie("mME",data[0]["modifica_mezzo"],30);


		setCookie("MP",data[0]["modifica_privilegi"],30);
		setCookie("RR",data[0]["rapportino_rapido"],30);
        setCookie("vRR",data[0]["visualizzazione_resoconti_rapportini"],30);

        setCookie("IMP",data[0]["impostazioni_app"],30);
        setCookie("LOCK",data[0]["blocco_rapportini"],30);
        
        
        
        if(jQuery.browser.mobile){
			setCookie("vDI",0,30);
	        setCookie("aDI",0,30);
	        setCookie("cDI",0,30);
	        setCookie("mDI",0,30);
	        setCookie("MP",0,30);
	        setCookie("vRR",0,30);
	        $("#ResRapp").hide();
		}


        if(getCookie("vCL")==0 && getCookie("aCL")==0)
        	$("#CL").hide();
        else{
	        if(getCookie("vCL")==0)
	        	$("#vCL").hide();
	        if(getCookie("aCL")==0)
	        	$("#aCL").hide();
        }



        if(getCookie("vDI")==0 && getCookie("aDI")==0)
        	$("#DI").hide();
        else{
	        if(getCookie("vDI")==0)
	        	$("#vDI").hide();
	        if(getCookie("aDI")==0)
	        	$("#aDI").hide();
        }


		if(getCookie("vMA")==0 && getCookie("aMA")==0)
        	$("#MA").hide();
        else{
	        if(getCookie("vMA")==0)
	        	$("#vMA").hide();
	        if(getCookie("aMA")==0)
	        	$("#aMA").hide();
        }

        if(getCookie("vME")==0 && getCookie("aME")==0)
        	$("#ME").hide();
        else{
	        if(getCookie("vME")==0)
	        	$("#vME").hide();
	        if(getCookie("aME")==0)
	        	$("#aME").hide();
        }

        if(getCookie("RR")==0)
	        $("#RR").hide();

		if(getCookie("vRR")==0){
			$("#vRR").attr("href","dettaglio_rapportino_dipendente.html?id="+getCookie('id_dipendente'));
		}
		else{
			$("#vRR").attr("href","dettaglio_rapportino_amministratore.html?id=admin");//rapportini.html");
		}


		if(getCookie("MP")==0)
	        $("#MP").hide();



	    if(getCookie("IMP") == 0)
	    	$("#manage_gestionale").hide();

		
	    },
      error: function(xhr){
       alert("errore: "+xhr.status);
      }
    });

   }
});
