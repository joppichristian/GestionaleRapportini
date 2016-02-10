
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){
      var id_utente = getUrlVars()["id"];
      window.location="script_php/scarica_rappDipendenti.php?id="+id_utente+"&db="+getCookie('nomeDB');

/*
      function downloadFile(fileName, urlData) {

        var aLink = document.createElement('a');
        aLink.download = fileName;
        aLink.href = urlData;
        aLink.click();
      }


      var data = [['1st title', '2nd title', '3rd title', 'another title'], ['a a a', 'bb\nb', 'cc,c', 'dd"d'], ['www', 'xxx', 'yyy', 'zzz']];
      var csvContent = "data:text/csv;charset=utf-8,";
	  var toPrint=csvContent;
      for(var i=0;i<data.length;i++){
	      toPrint += data[i].join(';');
	      toPrint += '\n';
      }
      var encodedUri = encodeURI(csvContent);
      var a = document.createElement('a');
      a.download     = 'data:attachment/csv,' + toPrint;

      //a.target   ='_blank';
      a.href = 'myFile.csv,' + encodeURIComponent(toPrint); ;
      a.click();
	  //downloadFile('2.csv', toPrint);
  });
*/


});
});
