
	
<?php

			include 'connessione-db.php';
			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				$nominativo = str_replace("'", "\'",$_POST['nominativo']);
				$indirizzo = str_replace("'", "\'",$_POST['indirizzo']);
				$citta = str_replace("'", "\'",$_POST['citta']);
				$cap = str_replace("'", "\'",$_POST['cap']);
				$provincia = str_replace("'", "\'",$_POST['provincia']);
				$telefono = str_replace("'", "\'",$_POST['telefono']);
				$cellulare = str_replace("'", "\'",$_POST['cellulare']);
				$cf = str_replace("'", "\'",$_POST['cf']);
				$piva = str_replace("'", "\'",$_POST['piva']);
				$email = str_replace("'", "\'",$_POST['email']);
				$site = str_replace("'", "\'",$_POST['site']);
				$note = str_replace("'", "\'",$_POST['note']);
				$tipologia = $_POST['tipologia'];
				
		/*
				$nominativo = "Pippo 123";
				$indirizzo = "";
				$citta = "";
				$cap = "";
				$provincia = "";
				$telefono = "";
				$cellulare = "";
				$cf = "";
				$piva = "";
				$email = "";
				$site = "";
				$note = "";
				$tipologia = "a";
				*/	
				
				$sql = "INSERT INTO clienti (nominativo,indirizzo,citta,cap,provincia,telefono,cellulare,codice_fiscale,partita_iva,email,sito,note,tipologia)
				VALUES ('".$nominativo."','".$indirizzo."','".$citta."','".$cap."','".$provincia."','".$telefono."','".$cellulare."','".$cf."','".$piva."','".$email."','".$site."','".$note."','".$tipologia."');";
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				$response_array['status'] = 'success';  
		    	header('Content-type: application/json');
				echo json_encode($response_array);

			}else{
				echo "request error";
			}
			
?>