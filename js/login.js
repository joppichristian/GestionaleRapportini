var json = new Array();

function check(form)
{
    if(form.user.value != "" || form.password.value != "" ){
      var username = form.user.value;
      var password = form.password.value;
      controlla_login(username, password);
    }else{
      Materialize.toast('Non hai compilato tutti i campi', 2000);
    }
}

function controlla_login(user,psw){
  //alert("fino a qui la psw :"+psw);
  //psw = SHA512(psw);

  //alert("psw: "+psw);
  var psw = SHA512(psw);
  var stringaR = "u="+user+"&p="+psw;
  var query = "script_php/login.php?"+stringaR ;
  $.ajax({
      url: query,
      async:false,
      success: function(data) {
          json = data;
          console.log(data);
          var elementi = new Array();
          var id_a="";
          var id_dip="";
          var admin="";
          var r_sociale="";
		      var nomedb="";
		      var username = "";
		  var inzio = "";
		  var fine = "";
		  var dbs = "";
		  
		  var scadenza;
		  var today = new Date();
		  var n_aziende_abilitate = 0;
		  var min = 0;
		      if((data != null)&&(data[0]!=null)){
			      n_aziende_abilitate = data.length;
            for(var i = 0; i < data.length; i++) {
	            scadenza = new Date(data[i]['scadenza']);
	            if(scadenza.getTime()-today.getTime() < 0)
	            {
		        	n_aziende_abilitate--;   
		        	min ++;
	            }else{
	                id_a = data[min]['ID_azienda'];
	                id_dip = data[i]['id_dipendente'];
	                admin = data[min]['classe_privilegi'];
	                r_sociale = data[i]['ragione_sociale'];
	                nomedb = data[min]['nome_db'];
	                username = data[i]['username'];
	                inizio = data[i]['inizio'];
	                fine = data[i]['fine'];
	                dbs += data[i]['nome_db']+"?"+r_sociale+"?"+data[i]['ID_azienda']+"?"+data[i]['classe_privilegi']+"?"+data[i]['inizio']+"?"+data[i]['fine']+"-----";
                }
            }
            if(n_aziende_abilitate <= 0)
            {
	            Materialize.toast('Abbonamento scaduto! Rinnova!', 4000);
	            return false;
            }
            if(n_aziende_abilitate != data.length)
            {
	            Materialize.toast('Attenzione! Alcune tue aziende hanno l\'abbonamento scaduto! Rinnova!', 4000);
            }
			
            setCookie("inizialized",0,30);
            setCookie("username", user, 30);
            setCookie("password", psw, 30);
            setCookie("id_dipendente", id_dip, 30);
            setCookie("classe_privilegi", admin, 30);
            setCookie("nomeDB", nomedb, 30);
            setCookie("ragione_sociale", r_sociale, 30);
            setCookie("id_azienda", id_a, 30);
            setCookie("inizio",inizio,30);
            setCookie("fine",fine,30);
            setCookie("dbs",dbs,30);
            Materialize.toast('Login avvenuto con successo!', 4000,'',function(){window.location.href = 'dashboard.html'});
          }else{
            Materialize.toast('Username e/o Password Errata', 4000);
            //alert("username e/o password errata!! i valori trovati sono: "+ cont);
          }
    },
      error: function(xhr){
       alert("errore: "+xhr.status);
      }
    });

}
