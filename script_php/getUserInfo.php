

<?php

   			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$dipendente = $_GET['id'];
				$azienda = $_GET['azienda'];
				include 'connessione-db-generale.php';



				$qry = "SELECT username,classe_privilegi FROM Azienda_utente au JOIN utente_azienda ua ON ua.id_utente = au.ID_Utente WHERE id_dipendente=".$dipendente." and ID_azienda=".$azienda.";";
				$mysqli_generale->query('SET CHARACTER SET utf8');
		    	$result = $mysqli_generale->query($qry);
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
