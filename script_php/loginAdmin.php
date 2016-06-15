<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "GET"){

				$mysqli_generale = new mysqli("localhost", $_GET["username"],$_GET["password"], "gestionale_amministrazione");
				
				if ($mysqli_generale->connect_errno) {
					echo "Failed to connect to DataBase...";
					exit();
				}
				
				$qry = "SELECT UA.id_azienda, ragione_sociale, nome_db, limite_utenze, scadenza, count(UA.id_utente) as utenze_registrate
						FROM Azienda_cliente AC 
						LEFT JOIN utente_azienda UA ON AC.ID_azienda = UA.id_azienda 
						LEFT JOIN Azienda_utente AU ON UA.id_utente = AU.ID_utente
						GROUP BY UA.id_azienda;";
						
				$mysqli_generale->query('SET CHARACTER SET utf8');
		    	$result = $mysqli_generale->query($qry);
				if (!$result) {
				    die(mysql_error($mysqli_generale));
				}		    	
				while($row = $result->fetch_assoc()) {
					$rows[] = $row;
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