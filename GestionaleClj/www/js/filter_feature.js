var vCL,aCL,cCL,mCL,mCA,vMA,cMA,mMA,aMA,vME,cME,mME,aME,RR

$(document).ready(function(){
  $.ajax({
      url: "http://gestionaleclj.com/script_php/getGroupDetails.php",
      type:"POST",
      async:false,
      data:{
	      "id":getUrlVars()["classe_privilegi"],
	      "db":getUrlVars()["nomeDB"]
      },
      success: function(data) {
        
        vCL = data[0]["visualizzazione_cliente"];
        aCL = data[0]["aggiunta_cliente"];
        cCL = data[0]["cancellazione_cliente"];
        mCL = data[0]["modifica_cliente"];
        
        
        
        vMA = data[0]["visualizzazione_materiale"];
        aMA = data[0]["aggiunta_materiale"];
        cMA = data[0]["cancellazione_materiale"];
        mMA = data[0]["modifica_materiale"];
        
        
        vME = data[0]["visualizzazione_mezzo"];
        aME = data[0]["aggiunta_mezzo"];
        cME = data[0]["cancellazione_mezzo"];
        mME = data[0]["modifica_mezzo"];


		
		RR = data[0]["rapportino_rapido"];
        
        
        if(vCL==0 && aCL==0)
        	$("#CL").hide();
        else{
	        if(vCL==0)
	        	$("#vCL").hide();
	        if(aCL==0)
	        	$("#aCL").hide();
        }

		if(vMA==0 && aMA==0)
        	$("#MA").hide();
        else{
	        if(vMA==0)
	        	$("#vMA").hide();
	        if(aMA==0)
	        	$("#aMA").hide();
        }
        
        if(vME==0 && aME==0)
        	$("#ME").hide();
        else{
	        if(vME==0)
	        	$("#vME").hide();
	        if(aME==0)
	        	$("#aME").hide();
        }
        
        if(RR==0)
	        $("#RR").hide();
		
		
			
    },
      error: function(xhr){
       alert("errorezzz: "+xhr.status);
      }
    });
});
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}