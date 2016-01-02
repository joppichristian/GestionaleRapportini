
	
<?php

			
			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$db = $_POST['db'];
				
				$nome = str_replace("'", "\'",$_POST['nome']);
				$cognome = str_replace("'", "\'",$_POST['cognome']);
				$telefono = str_replace("'", "\'",$_POST['telefono']);
				$cellulare = str_replace("'", "\'",$_POST['cellulare']);
				$iban = str_replace("'", "\'",$_POST['iban']);
				$note = str_replace("'", "\'",$_POST['note']);
								
				include 'connessione-db.php';
		
				
				$sql = "INSERT INTO dipendenti (nome,cognome,telefono,cellulare,iban,note) VALUES ('".$nome."','".$cognome."','".$telefono."','".$cellulare."','".$iban."','".$note."');";
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				echo json_encode("success");

			}else{
				echo "request error";
			}
			
?>
