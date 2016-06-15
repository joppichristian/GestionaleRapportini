
$(document).ready(function(){
	$(".dati").hide();
	$("#btn").click(function(){
		$.ajax({
	      dataType: "json",
	      url: "script_php/loginAdmin.php",
	      method: "GET",
	      data:{
		      'username': $("#username").val(),
		      'password': $("#password").val()
	      },
	      success: function(data) {
		      console.log(data);
		      $(".login_form").hide();
		      $(".dati").show();
		      for(var i=0;data!=null && i<data.length;i++){
			      if(parseInt(data[i]["utenze_registrate"]) >= parseInt(data[i]["limite_utenze"]))
			      	$("tbody").append("<tr class='"+data[i]['id_azienda']+" red-text'  ><td>"+data[i]["ragione_sociale"]+"</td><td>"+data[i]["nome_db"]+"</td><td>"+data[i]["limite_utenze"]+"</td><td>"+data[i]["utenze_registrate"]+"</td><td>"+data[i]["scadenza"].split('-').reverse().join("-")+"</td></tr>");
			      else
			      	$("tbody").append("<tr class="+data[i]['id_azienda']+"><td>"+data[i]["ragione_sociale"]+"</td><td>"+data[i]["nome_db"]+"</td><td>"+data[i]["limite_utenze"]+"</td><td>"+data[i]["utenze_registrate"]+"</td><td>"+data[i]["scadenza"].split('-').reverse().join("-")+"</td></tr>");
		      }
		   },
	      error: function(xhr){
		  	console.log(xhr.responseText);
	      }
	    });

	});
});
