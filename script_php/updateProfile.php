<?php

	if($_SERVER["REQUEST_METHOD"] == "POST"){
				$username = $_POST['username'];
				//$old_password = $_POST['old_password'];
				$password = $_POST['password'];
				include 'connessione-db-generale.php';
				/*// Crea una chiave casuale
				$saltNew = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				// Crea una password usando la chiave appena creata.
				$passwordNew = hash('sha512', $password.$saltNew);
				// Crea una chiave casuale
				//$saltOld = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				// Crea una password usando la chiave appena creata.
				//$passwordOld = hash('sha512', $old_password.$saltOld);
				//$sqlUpdate = "UPDATE Azienda_utente SET password = '".$passwordNew. "', salt = '".$saltNew. "',username='".$username."'
				//							WHERE id_dipendente = ".$_POST['id']." and ID_azienda= ".$_POST['azienda'].";" ; //and password= '".$passwordOld."' ;" ;
				$sqlUpdate = "UPDATE Azienda_utente SET password = '".$passwordNew. "', salt = '".$saltNew. "'
											WHERE id_dipendente = ".$_POST['id']." and ID_azienda= ".$_POST['azienda']." ;" ;
				$mysqli_generale->query('SET CHARACTER SET utf8');*/
				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$salt= $random_salt ;
				// Crea una password usando la chiave appena creata.
				$password = hash('sha512', $password.$salt);

					$sqlUpdate = "UPDATE Azienda_utente SET password = '".$password. "', salt = '".$salt. "'
												WHERE ID_Utente = (SELECT id_utente FROM utente_azienda ua WHERE id_dipendente = ".$_POST['id']." and id_azienda= ".$_POST['azienda']." );" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli_generale,$sqlUpdate)){
					echo mysqli_error($mysqli_generale);
				}else{
					echo json_encode("success");
				}
	}else{
		echo "request error";
	}
?>
