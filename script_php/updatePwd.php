<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){

				$password = $_POST['password'];
				$db = $_POST['db'];
				include 'connessione-db-generale.php';
				

				
					$sqlUpdate = "UPDATE Azienda_utente SET password = '".$password. "'
												WHERE id_dipendente = ".$_POST['id']." and ID_azienda= ".$_POST['azienda']." ;" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');	  
					if (!mysqli_query($mysqli_generale,$sqlUpdate)){
						echo mysqli_error($mysqli_generale);
					}
					else{
						echo json_encode("success");
					}
				
				

	}else{
		echo "request error";
	}


?>