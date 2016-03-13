<?php

	if($_SERVER["REQUEST_METHOD"] == "POST"){

				$password = $_POST['password'];
				$db = $_POST['db'];
				include 'connessione-db-generale.php';

				// Crea una chiave casuale
				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$salt= $random_salt ;
				// Crea una password usando la chiave appena creata.
				$password = hash('sha512', $password.$salt);

					$sqlUpdate = "UPDATE Azienda_utente SET password = '".$password. "', salt = '".$salt. "'
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
