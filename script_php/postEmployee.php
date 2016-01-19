
	
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
				
			/*
				$db ="";
				
				$nome = "provanome";
				$cognome = "provacognome";
				$telefono = "12345";
				$cellulare = "123456";
				$iban = "AAA!23adasda";
				$note = "note a caso";
				$classe_pr = 1;
				$id_azienda = 1;*/
				include 'connessione-db.php';
		
				
				$sql = "INSERT INTO dipendenti (nome,cognome,telefono,cellulare,iban,note) VALUES ('".$nome."','".$cognome."','".$telefono."','".$cellulare."','".$iban."','".$note."');";
				$mysqli->query('SET CHARACTER SET utf8');
				
				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
					
				else{
					$insertId = $mysqli->insert_id;
					include 'connessione-db-generale.php';
					
					$sql = "INSERT INTO Azienda_utente (username,password,ID_Azienda,ID_dipendente,classe_privilegi) VALUES ('".$username."','".$password."',".$id_azienda.",".$insertId.",".$classe_pr.");" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli_generale,$sql)){
						echo mysqli_error($mysqli_generale);
					}
					else
						echo json_encode("success");
				}

			}else{
				echo "request error";
			}
			
?>
