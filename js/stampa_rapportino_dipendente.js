
$(document).ready(function(){
	if(getCookie('nomeDB')=="")
		window.location.replace("index.html");

    $("#download_file").on("click",function(){

      function downloadFile(fileName, urlData) {

        var aLink = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click");
        aLink.download = fileName;
        aLink.href = urlData;
        aLink.dispatchEvent(evt);
      }

      var data = '"Column One","Column Two","Column Three"';
      downloadFile('2.csv', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(data));
/*
      var data = [['1st title', '2nd title', '3rd title', 'another title'], ['a a a', 'bb\nb', 'cc,c', 'dd"d'], ['www', 'xxx', 'yyy', 'zzz']];
      var csvContent = "data:text/csv;charset=utf-8,";

      data.forEach(function(infoArray, index){
        dataString = infoArray.join(",");
        csvContent += index < data.length ? dataString+ "\n" : dataString;
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      link.click();

    });*/

});
