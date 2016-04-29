

<?php
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

			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$id = $_GET['id'];
				$db = $_GET['db'];
				include 'connessione-db.php';

				$qry = "SELECT r.id as id, r.inizio as inizio, m.descrizione as descrizione,m.prezzo as prezzo, u.quantita as quantita FROM rapportini AS r, utilizzo_risorse AS u, mezzi AS m WHERE r.id_dipendente='".$id."' AND u.tipologia='me' AND r.id=u.id_rapportino AND m.id=u.id_materiale_mezzo ORDER BY r.inizio ASC;";
				$mysqli->query('SET CHARACTER SET utf8');
		    	$result = $mysqli->query($qry);
		    	while($row = $result->fetch_assoc()) {
						$i_f=confrontoData($row['inizio']);
		        if($i_f){
							$rows[] = $row;
						}

			    }

				header('Content-Type: application/json');
		    	echo json_encode($rows);

		    	if($result!=null){
					$result->close();
				}
			}else{
				echo "Request Error";
			}

?>
