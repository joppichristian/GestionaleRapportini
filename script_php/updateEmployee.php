<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
				$nome = str_replace("'", "\'",$_POST['nome']);
				$cognome = str_replace("'", "\'",$_POST['cognome']);
				$telefono = str_replace("'", "\'",$_POST['telefono']);
				$cellulare = str_replace("'", "\'",$_POST['cellulare']);
				$iban = str_replace("'", "\'",$_POST['iban']);
				$note = str_replace("'", "\'",$_POST['note']);
				$username = str_replace("'", "\'",$_POST['username']);
				$classe= $_POST['classe'];
				$db = $_POST['db'];
				include 'connessione-db.php';
				

				
				$sqlUpdate = "UPDATE dipendenti SET nome = '".$nome. "' , 
												cognome = '".$cognome. "' , 
												telefono = '".$telefono."' , 
												cellulare = '".$cellulare."' , 
												iban = '".$iban."' , 
												note = '".$note."'
												WHERE id = '".$_POST['id']."' ;" ;
												  
				if (!mysqli_query($mysqli,$sqlUpdate)){
					echo mysqli_error($mysqli);
				}
				else{
					include 'connessione-db-generale.php';
				

				
					$sqlUpdate = "UPDATE Azienda_utente SET username = '".$username. "' , 
													classe_privilegi = ".$classe. " 
													WHERE id_dipendente = ".$_POST['id']." and ID_azienda= ".$_POST['azienda']." ;" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');	  
					if (!mysqli_query($mysqli_generale,$sqlUpdate)){
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