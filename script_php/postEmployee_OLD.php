

<?php



			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$db = $_POST['db'];

				$nome = str_replace("'", "\'",$_POST['nome']);
				$cognome = str_replace("'", "\'",$_POST['cognome']);
				$telefono = str_replace("'", "\'",$_POST['telefono']);
				$cellulare = str_replace("'", "\'",$_POST['cellulare']);
				$iban = str_replace("'", "\'",$_POST['iban']);
				$note = str_replace("'", "\'",$_POST['note']);
				$classe_pr = $_POST['classe_pr'];
				$username = $_POST['username'];
				$password = $_POST['password'];
				$id_azienda = $_POST['azienda'];

				include 'connessione-db.php';
				/*
				$telefono = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				*/$cellulare = $_POST['password'];
				/*$password = hash('sha512', $cellulare.$random_salt);
				$cellulare = $password;*/
				$sql = "INSERT INTO dipendenti (nome,cognome,telefono,cellulare,iban,note) VALUES ('".$nome."','".$cognome."','".$telefono."','".$cellulare."','".$iban."','".$note."');";
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
				}else{
					$insertId = $mysqli->insert_id;
					include 'connessione-db-generale.php';
					// Crea una chiave casuale
					$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
					// Crea una password usando la chiave appena creata.
					$password = hash('sha512', $password.$random_salt);
					//echo "username: ".$username."' password:'".$password;
					$sql = "INSERT INTO Azienda_utente (username,password, salt, ID_azienda,Id_dipendente,classe_privilegi) VALUES ('".$username."','".$password."', '".$random_salt."', '".$id_azienda.",".$insertId.",".$classe_pr.");" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli_generale,$sql)){
						echo mysqli_error($mysqli_generale);
					}
					else{
						echo json_encode("success");
					}
				}

			}else{
				echo "request error";
			}

?>
