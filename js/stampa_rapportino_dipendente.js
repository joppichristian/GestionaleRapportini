
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){

      function downloadFile(fileName, urlData) {

        var aLink = document.createElement('a');
        aLink.download = fileName;
        aLink.href = urlData;
        aLink.click();
      }

     /* var data = '"Column One";"Column Two";"Column Three"';*/
      

      var data = [['1st title', '2nd title', '3rd title', 'another title'], ['a a a', 'bb\nb', 'cc,c', 'dd"d'], ['www', 'xxx', 'yyy', 'zzz']];
      var csvContent = "data:text/csv;charset=utf-8,";
	  var toPrint=csvContent;
      for(var i=0;i<data.length;i++){
	      toPrint += data[i].join(';');
	      toPrint += '\n';
      }
      var encodedUri = encodeURI(csvContent);

	  downloadFile('2.csv', toPrint);
    });

});