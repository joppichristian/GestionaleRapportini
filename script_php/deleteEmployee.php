
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				$db = $_POST['db'];
				include 'connessione-db.php';
				
				$qry = "DELETE FROM dipendenti WHERE ID = ".$id.";";
				$mysqli->query('SET CHARACTER SET utf8');
		    	if (!mysqli_query($mysqli,$qry)){
						echo mysqli_error($mysqli);
					}
				else{
					include 'connessione-db-generale.php';
					
					$sql = "DELETE FROM Azienda_utente WHERE id_dipendente = ".$id. ";" ;
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
