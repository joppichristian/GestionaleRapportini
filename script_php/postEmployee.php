

<?php



			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$db = $_POST['db'];

				$nome = str_replace("'", "\'",$_POST['nome']);
				$cognome = str_replace("'", "\'",$_POST['cognome']);
				$telefono = str_replace("'", "\'",$_POST['telefono']);
				$cellulare = str_replace("'", "\'",$_POST['cellulare']);
				$iban = str_replace("'", "\'",$_POST['iban']);
				$note = str_replace("'", "\'",$_POST['note']);
				$codicefiscale = str_replace("'", "\'",$_POST['codicefiscale']);
				$classe_pr = $_POST['classe_pr'];
				$username = $_POST['username'];
				$password = $_POST['password'];
				$id_azienda = $_POST['azienda'];
				$password = $_POST['password'];
				// Crea una chiave casuale
				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				// Crea una password usando la chiave appena creata.
				$password = hash('sha512', $password.$random_salt);

				include 'connessione-db.php';

				$sql = "INSERT INTO dipendenti (nome,cognome,telefono,cellulare,iban,note,codicefiscale) VALUES ('".$nome."','".$cognome."','".$telefono."','".$cellulare."','".$iban."','".$note."','".$codicefiscale."');";
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
				}else{
					$insertId = $mysqli->insert_id;
					include 'connessione-db-generale.php';

					$salt = $random_salt;
					$sql = "INSERT INTO Azienda_utente (salt,username,password) VALUES ('".$salt."','".$username."','".$password."');" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli_generale,$sql)){
						echo mysqli_error($mysqli_generale);
					}
					else{
						$insertIdUser = $mysqli_generale->insert_id;
						$sql = "INSERT INTO utente_azienda (id_azienda,id_utente,classe_privilegi,id_dipendente) VALUES (".$id_azienda.",".$insertIdUser.",".$classe_pr.",".$insertId.");" ;
						$mysqli_generale->query('SET CHARACTER SET utf8');
						
						if (!mysqli_query($mysqli_generale,$sql)){
							echo mysqli_error($mysqli_generale);
						}
						else
							echo json_encode("success");
						}
				}

			}else{
				echo "request error";
			}

?>
