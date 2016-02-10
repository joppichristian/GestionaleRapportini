<?php
  $db = $_GET['db'];
  $id_utente = $_GET['id'];

  include 'connessione-db.php';

  $nome_dipendente="";
  $cognome_dipendente="";
  $id_cliente="";
  $inizio="";
  $fine="";
  $pausa="";
  $note="";
  $arrayRap="";
  $listaRap="";

  header("Content-Type: text/csv");
  header("Content-Disposition: attachment; filename=rapportinoDipendente.csv");
  // Disable caching
  header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
  header("Pragma: no-cache"); // HTTP 1.0
  header("Expires: 0"); // Proxies


    function outputCSV($data) {
      $output = fopen("php://output", "w");
      foreach ($data as $row) {
          fputcsv($output, $row, ';', ' '); //fputcsv($output, $row); // here you can change delimiter/enclosure
      }
      fclose($output);
    }


    function calcoloDiffOre($ora_i, $ora_f){

      $t1 = StrToTime ( $ora_f);
      $t2 = StrToTime ( $ora_i);
      $diff = $t1 - $t2;
      $hours = $diff / ( 60 * 60 );
      return $hours;
    }

    function estrapolaData($data){
      $data_exp = split (" ", $data);
      $arrData = split ("-", $data_exp[0]);
      $anno= $arrData[0];
      $mese= $arrData[1];
      $giorno= $arrData[2];
      $newData= $giorno."-".$mese."-".$anno;
      return $newData;
    }

    function estrapolaOra($ora){
      $ora_exp = split (" ", $ora);
      return $ora_exp[1];
    }

    $qry = "SELECT d.nome as nome, d.cognome as cognome, r.inizio as inizio, r.fine as fine, r.pausa as pausa, r.note as note, c.nominativo as nominativo FROM dipendenti AS d, rapportini AS r, clienti AS c WHERE r.id_dipendente='".$id_utente."' AND c.id=r.id_cliente AND d.id='".$id_utente."' ORDER BY inizio ASC;";
    $mysqli->query('SET CHARACTER SET utf8');
    $result = $mysqli->query($qry);
    $arrayRap[0]= "";
    $arrayRap[1]= "";
    $arrayRap[2]= "";

    $cont=3;
    while($row = $result->fetch_array()) {
          $nome_dipendente = $row['nome'];
          $cognome_dipendente = $row['cognome'];
          //$nomeCliente = nomeCliente($row['id_cliente']);
          $oreTot=calcoloDiffOre($row['inizio'],$row['fine']);
          $data_giorno=estrapolaData($row['inizio']);
          $inizio=estrapolaOra($row['inizio']);
          $fine=estrapolaOra($row['fine']);

          $arrayRap[$cont]=array($row['nominativo'],$data_giorno,$oreTot,$inizio,$fine,$row['pausa'],$row['note']);
          //$listaRap = $listaRap.",".$arrayRap[$cont];
          $cont=$cont+1;
    }
    $arrayRap[0]= array("Dipendente: ", $nome_dipendente, $cognome_dipendente);
    $arrayRap[1]= array("");
    $arrayRap[2]= array("CLIENTE", "GIORNO","ORE TOT","ORA INIZIO","ORA FINE","PAUSA","NOTE");

    if($result!=null){
        $result->close();
    }




    outputCSV($arrayRap

    /*array(
      array("Dipendente: ", $nome_dipendente, $cognome_dipendente),
      array(""),
      array("CLIENTE", "ORE TOT ", "DATA/ORA INIZIO", "DATA/ORA FINE","PAUSA","NOTE"),
      $arrayRap[0]
    )*/
  );

?>
