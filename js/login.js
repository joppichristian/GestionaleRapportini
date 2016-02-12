var json = new Array();

function check(form)
{
    if(form.user.value != "" || form.password.value != ""){
      var username = form.user.value;
      var password = form.password.value;
      controlla_login(username, password);
    }else{
      Materialize.toast('Non hai compilato tutti i campi', 2000);
    }
}

function controlla_login(user,psw){

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
		  if(data != null){
          for(var i = 0; i < data.length; i++) {
            id_a = data[i]['ID_azienda'];
            id_dip = data[i]['id_dipendente'];
            admin = data[i]['classe_privilegi'];
            r_sociale = data[i]['ragione_sociale'];
            nomedb = data[i]['nome_db'];
            username = data[i]['username'];
          }
            //alert("registrazione avvenuta con successo!! id azienda: "+id_a);
            setCookie("username", user, 30);
            setCookie("password", psw, 30);
            setCookie("id_dipendente", id_dip, 30);
            setCookie("classe_privilegi", admin, 30);
            setCookie("nomeDB", nomedb, 30);
            setCookie("ragione_sociale", r_sociale, 30);
            setCookie("id_azienda", id_a, 30);
			setCookie("username", username, 30);
            Materialize.toast('Login avvenuto con successo!', 2000,'',function(){window.location.href = 'dashboard.html'});
          }else{
            Materialize.toast('Username e/o Password Errata', 2000);
            //alert("username e/o password errata!! i valori trovati sono: "+ cont);
          }

    },
      error: function(xhr){
       alert("errore: "+xhr.status);
      }
    });

}
