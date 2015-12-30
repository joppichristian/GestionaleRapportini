var json = new Array();

function check(form)/*function to check userid & password*/
{
    //form.user.value == "u" && form.password.value == "p"
    if(form.user.value != "" || form.password.value != ""){
      //window.alert("Testo del messaggio")

      var username = form.user.value;
      var password = form.password.value;
      controlla_login(username, password);
    }else{
      window.alert("Non hai compilato tutti i campi");
    }
}

function controlla_login(user,psw){

  var stringaR = "u="+user+"&p="+psw;
  var query = "http://www.trentinoannuncia.com/portale_artigiani/script_php/login.php?"+stringaR ;
  //alert("la quesry :   "+query);
  $.ajax({
			 	   data:{format: "json"},
			 	   dataType: "jsonp",
			 	   url: query,
			 	   async:false,
           error: function(xhr, textStatus, errorThrown){
             alert('request failed');
           }
  });
	//alert("query categoria =" + query);
			 	// This function is called once the call is satisfied
	json_user= function (data) {


			 		if(data!=null && data.items!=null) {
            alert("registrazione avvenuta con successo!!");
            var name="";
            var psw="";
            var id_a="";
            $.each(data.items, function(i,item){
               name=item.username;
               psw=item.password;

               id_a=item.ID_azienda;

				 		});
            accedi_db_dedicato(id_a);

          }else{
            alert("username e/o password errata!!");
          }
  }
}
function accedi_db_dedicato(u_azienda){
  var stringaR = "a="+u_azienda;
  var query = "http://www.trentinoannuncia.com/portale_artigiani/script_php/azienda_dedicata.php?"+stringaR ;
  alert("la query :   "+query);
  $.ajax({
			 	   data:{format: "json"},
			 	   dataType: "jsonp",
			 	   url: query,
			 	   async:false,
           error: function(xhr, textStatus, errorThrown){
             alert('request failed');
           }
  });
	//alert("query categoria =" + query);
			 	// This function is called once the call is satisfied
	json_azienda= function (data) {
          alert("successo!!!! DB ");
			 		if(data!=null && data.items!=null) {

            var r_sociale="";
            var nomedb="";
            $.each(data.items, function(i,item){
               r_sociale=item.ragione_sociale;
               nomedb=item.nome_db;
               alert("il nome del db dedicato e :"+nomedb);
				 		});

          }else{
            alert("username e/o password errata!!");
          }
  }
}
