
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				$db = $_POST['db'];
				$azienda = $_POST['azienda'];
				include 'connessione-db.php';
				
				$qry = "UPDATE dipendenti SET attivo = 0 WHERE ID = ".$id.";";
				$mysqli->query('SET CHARACTER SET utf8');
		    	if (!mysqli_query($mysqli,$qry)){
						echo mysqli_error($mysqli);
					}
				else{
					include 'connessione-db-generale.php';
					
					$sql = "UPDATE Azienda_utente SET attivo = 0 WHERE ID_Utente = (SELECT id_utente FROM utente_azienda ua WHERE id_dipendente = ".$id." and id_azienda= ".$azienda." );" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli_generale,$sql)){
						echo mysqli_error($mysqli_generale);
					}
					else
						echo json_encode("success");
				}
			}else{
				echo "Request Error";
			}
			
?>
