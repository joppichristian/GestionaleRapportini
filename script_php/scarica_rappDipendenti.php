<?php
  $db = $_GET['db'];
  $id_utente = $_GET['id'];
  $filtro_inizio = $_GET['inizio'];
  $filtro_fine = $_GET['fine'];

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
      return number_format((float)$hours, 2, '.', '');
      //return ;
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

    function ruotaData($data){
      $arrData = split ("-", $data);
      $giorno= $arrData[0];
      $mese= $arrData[1];
      $anno= $arrData[2];
      $newData= $anno."-".$mese."-".$giorno;
      return $newData;
    }

    function confrontoData($data){
      $i = ruotaData($_GET['inizio']);
      $f = ruotaData($_GET['fine']);
      //echo "data filtro: ".$_GET['inizio']." ruota filtro : ".$i;
      $data_exp = split (" ", $data);
      $d = $data_exp[0];
      $risultato =false;
      if(($d>=$i)&&($d<=$f)){
        $risultato =true;
      }else{
        $risultato =false;
      }
      return $risultato;
    }

    $qry = "SELECT r.id as id, d.nome as nome, d.cognome as cognome, r.inizio as inizio, r.fine as fine, r.pausa as pausa, r.note as note, c.nominativo as nominativo FROM dipendenti AS d, rapportini AS r, clienti AS c WHERE r.id_dipendente='".$id_utente."' AND c.id=r.id_cliente AND d.id='".$id_utente."' ORDER BY inizio ASC;";
    $mysqli->query('SET CHARACTER SET utf8');
    $result = $mysqli->query($qry);
    $arrayRap[0]= "";
    $arrayRap[1]= "";
    $arrayRap[2]= "";
    $oreSommaTot =0;
    $pausaSommaTot=0;
    $lavoroSommaTot =0;
    $cont=3;
    while($row = $result->fetch_array()) {
          $nome_dipendente = $row['nome'];
          $cognome_dipendente = $row['cognome'];
          $i_f=confrontoData($row['inizio']);
          header("Content-Disposition: attachment; filename=rapportino_dipendente_".$nome_dipendente."_".$cognome_dipendente.".csv");
          if($i_f){
            //$nomeCliente = nomeCliente($row['id_cliente']);
            //echo ("Sono dentro: ".$i_f.">=".$filtro_inizio.")&&(".$i_f."<=".$filtro_fine);
            $oreTot=calcoloDiffOre($row['inizio'],$row['fine']);

            if($row['pausa']!=0){
              $min_around =$row['pausa']/60;
              $min= number_format((float)$min_around, 2, '.', '');
              $pausaSommaTot=$pausaSommaTot+$min;
              $lavoroSommaTot= $lavoroSommaTot+($oreTot-$min);
            }else{
              $lavoroSommaTot= $lavoroSommaTot+$oreTot;
            }
            $oreSommaTot= $oreSommaTot+$oreTot;
            $data_giorno=estrapolaData($row['inizio']);
            $inizio=estrapolaOra($row['inizio']);
            $fine=estrapolaOra($row['fine']);

            $arrayRap[$cont]=array($row['nominativo'],$data_giorno,$oreTot,$inizio,$fine,$row['pausa'],$row['note']);
            $cont=$cont+1;
          }
          //$listaRap = $listaRap.",".$arrayRap[$cont];

    }
    $arrayRap[0]= array("Dipendente: ", $nome_dipendente, $cognome_dipendente);
    $arrayRap[1]= array("");
    $arrayRap[2]= array("CLIENTE", "GIORNO","ORE TOT","ORA INIZIO","ORA FINE","PAUSA (in minuti)","NOTE");

    if($result!=null){
        $result->close();
    }
    $inizio=$cont+1;

    $arrayRap[$inizio]= array("");
    $inizio=$inizio+1;
    $arrayRap[$inizio]= array("SOMMA (in ore)","",$oreSommaTot,"","",$pausaSommaTot,"");
    $inizio=$inizio+1;
    $arrayRap[$inizio]= array("TOTALE ","ORE LAVORATE",$lavoroSommaTot,"","","","");
    $inizio=$inizio+1;
    $arrayRap[$inizio]= array("");
    $inizio=$inizio+1;
    $arrayRap[$inizio]= array("");
    $inizio=$inizio+1;
    $arrayRap[$inizio]= array("MATERIALI");
    $inizio=$inizio+1;
    $arrayRap[$inizio]= array("GIORNO", "CODICE","DESCRIZIONE","QUANTITA");
    $inizio=$inizio+1;

    $cont_materiali=$inizio+1;

    //AGGIUNTA MATERIALI TABELLA
    $qry = "SELECT r.id as id, r.inizio as inizio, m.codice as codice, m.descrizione as descrizione, m.prezzo as prezzo, m.note as note, u.quantita as quantita FROM rapportini AS r, utilizzo_risorse AS u, materiali AS m WHERE r.id_dipendente='".$id_utente."' AND u.tipologia='ma' AND r.id=u.id_rapportino AND m.id=u.id_materiale_mezzo ORDER BY r.inizio ASC;";
    //$mysqli->query('SET CHARACTER SET utf8');
    $result = $mysqli->query($qry);
    $lista_mat="";
    while($row = $result->fetch_array()) {
      //  $lista_mat=$rowMa['codice']."--".$rowMa['codice']."--quantità: ".$rowMa['quantita'];
        $data_giorno_ma=estrapolaData($row['inizio']);
        $i_f=confrontoData($row['inizio']);
        if($i_f){
          $arrayRap[$cont_materiali]=array($data_giorno_ma,$row['codice'],$row['descrizione'],$row['quantita']);
          $cont_materiali=$cont_materiali+1;
        }

    }

    if($result!=null){
        $result->close();
    }
    //FINE AGGIUNTA MATERIALI TABELLA

    $cont_materiali=$cont_materiali+1;
    $arrayRap[$cont_materiali]= array("");
    $cont_materiali=$cont_materiali+1;
    $arrayRap[$inizio]= array("");
    $cont_materiali=$cont_materiali+1;
    $arrayRap[$cont_materiali]= array("MEZZI");
    $cont_materiali=$cont_materiali+1;
    $arrayRap[$cont_materiali]= array("GIORNO", "DESCRIZIONE","ORE UTILIZZO");

    $cont_mezzi=$cont_materiali+1;

    //AGGIUNTA MEZZI TABELLA
    $qry = "SELECT r.id as id, r.inizio as inizio, m.descrizione as descrizione, u.quantita as quantita FROM rapportini AS r, utilizzo_risorse AS u, mezzi AS m WHERE r.id_dipendente='".$id_utente."' AND u.tipologia='me' AND r.id=u.id_rapportino AND m.id=u.id_materiale_mezzo ORDER BY r.inizio ASC;";
    $result = $mysqli->query($qry);
    $lista_mez="";
    while($row = $result->fetch_array()) {
       $data_giorno_me=estrapolaData($row['inizio']);
       $i_f=confrontoData($row['inizio']);
       if($i_f){
         $arrayRap[$cont_mezzi]=array($data_giorno_me,$row['descrizione'],$row['quantita']);
         $cont_mezzi=$cont_mezzi+1;
       }

    }
    //FINE AGGIUNTA MEZZI TABELLA
    if($result!=null){
        $result->close();
    }


    outputCSV($arrayRap);


?>
