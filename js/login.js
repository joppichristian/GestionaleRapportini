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
      Materialize.toast('Non hai compilato tutti i campi', 2000);
      //window.alert("Non hai compilato tutti i campi");
    }
}

function controlla_login(user,psw){

  var stringaR = "u="+user+"&p="+psw;
  var query = "http://www.trentinoannuncia.com/portale_artigiani/script_php/login.php?"+stringaR ;
  $.ajax({
      url: query,
      async:false,
      success: function(data) {
        //alert("la richiesta e andata a buon fine");
        json = data;
          console.log(data);
          var elementi = new Array();
          //var name="";
          //var psw="";
          var id_a="";
          var id_dip="";
          var admin="";
           $("#elenco").empty();
          var cont=0;
          for(var i = 0; i < data.length; i++) {
            id_a = data[i]['ID_azienda'];
            id_dip = data[i]['id_dipendente'];
            admin = data[i]['amministratore'];
            //var name = data[i]['username'];
            //var psw = data[i]['password'];
            //alert("id azienda: "+id_a);
            cont=cont+1;
          }
          if(cont == 1){
            //alert("registrazione avvenuta con successo!! id azienda: "+id_a);
            setCookie("username", user, 30);
            setCookie("password", psw, 30);
            setCookie("id_dipendente", id_dip, 30);
            setCookie("amministratore", admin, 30);
            accedi_db_dedicato(id_a);
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
function accedi_db_dedicato(u_azienda){
  var stringaR = "a="+u_azienda;
  var query = "http://www.trentinoannuncia.com/portale_artigiani/script_php/azienda_dedicata.php?"+stringaR ;
  //alert("la query :   "+query);

  $.ajax({
          url: query,
          async:false,
           success: function(data) {

             json = data;
               var r_sociale="";
               var nomedb="";
                $("#elenco").empty();
               var cont=0;
               //alert("successo!!!! DB ");
               for(var i = 0; i < data.length; i++) {
                 //alert("dentro il ciclo");
                 r_sociale = data[i]['ragione_sociale'];
                 nomedb = data[i]['nome_db'];
                 //alert("nome_db: "+nomedb);
                 cont=cont+1;
               }
               if(cont == 1){
                 setCookie("nomeDB", nomedb, 30);
                 //Materialize.toast('I am a toast!', 4000);
                 //document.cookie="username="+u+"; password="+p+";nomeDB="+nomedb;
                 callPage();
               }else{
                 alert("campo nel database non  trovato: "+ cont);
               }
               return false;
         },
           error: function(xhr){
            alert("errore: "+xhr.status);
            return false;
           }
         });
}

function callPage(){
     //setCookie("username", user, 30);
     Materialize.toast('Login avvenuto con successo!', 2000,'',function(){window.location.href = 'menu_page.html'});
     //location.href = "index.html";
   //alert("troviamo il db ora!! nome_db: ");
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    //alert("cookie: "+cname+"="+cvalue);
    document.cookie = cname+"="+cvalue+"; "+expires;
}
