<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
				$nome = str_replace("'", "\'",$_POST['nome']);
				$cognome = str_replace("'", "\'",$_POST['cognome']);
				$telefono = str_replace("'", "\'",$_POST['telefono']);
				$cellulare = str_replace("'", "\'",$_POST['cellulare']);
				$iban = str_replace("'", "\'",$_POST['iban']);
				$note = str_replace("'", "\'",$_POST['note']);
				
				
				$db = $_POST['db'];
				include 'connessione-db.php';
				

				
				$sqlUpdate = "UPDATE dipendenti SET nome = '".$nome. "' , 
												cognome = '".$cognome. "' , 
												telefono = '".$telefono."' , 
												cellulare = '".$cellulare."' , 
												iban = '".$iban."' , 
												note = '".$note."'
												WHERE id = '".$_POST['id']."' ;" ;
												//WHERE id = 3 ;" ;
												  
				if (!mysqli_query($mysqli,$sqlUpdate)){
					echo mysqli_error($mysqli);
				}
				echo json_encode("success");
				

	}else{
		echo "request error";
	}


?>