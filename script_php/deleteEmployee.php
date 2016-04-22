
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				$db = $_POST['db'];
				$azienda = $_POST['azienda'];
				include 'connessione-db.php';
				
				$qry = "DELETE FROM dipendenti WHERE ID = ".$id.";";
				$mysqli->query('SET CHARACTER SET utf8');
		    	if (!mysqli_query($mysqli,$qry)){
						echo mysqli_error($mysqli);
					}
				else{
					include 'connessione-db-generale.php';
					
					$sql = "DELETE FROM Azienda_utente WHERE ID_Utente = (SELECT id_utente FROM utente_azienda ua WHERE id_dipendente = ".$_POST['id']." and id_azienda= ".$_POST['azienda']." );" ;
					
					$mysqli_generale->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli_generale,$sql)){
						echo mysqli_error($mysqli_generale);
					}
					else{
						$sql = "DELETE FROM utente_azienda WHERE id_dipendente = ".$_POST['id']." and id_azienda= ".$_POST['azienda'].";" ;
						
						$mysqli_generale->query('SET CHARACTER SET utf8');
	
						if (!mysqli_query($mysqli_generale,$sql)){
							echo mysqli_error($mysqli_generale);
						}
						else
							echo json_encode("success");
					}
				}
			}else{
				echo "Request Error";
			}
			
?>
