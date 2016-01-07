$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");
    $("#id_insert_item").hide();
    $("#botton_insert_item").hide();
    $("#new_insert_item").hide();
    $("#elementi_materiali").hide();


    var stato_p_list=0;
    var stato_new_p_list=0;
    var stato_materiali=0;

    $("#pulsante_list").on("click",function(){
      if(stato_p_list==1){
        $("#id_insert_item").hide();
        $("#botton_insert_item").hide();
        stato_p_list=0;
      }else{
        $("#id_insert_item").show();
        $("#botton_insert_item").show();
        stato_p_list=1;
      }
    });

    $("#add_list").on("click",function(){
      if(stato_new_p_list==1){
        $("#new_insert_item").hide();
        stato_new_p_list=0;
      }else{
        $("#new_insert_item").show();
        stato_new_p_list=1;
      }
    });

    $("#pulsante_materiali").on("click",function(){
      if(stato_materiali==1){
        $("#elementi_materiali").hide();
        stato_materiali=0;
      }else{
        $("#elementi_materiali").show();
        stato_materiali=1;
      }
    });

});
