<?php
	include "connessione-db.php";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
				$codice = str_replace("'", "\'",$_POST['codice']);
				$descrizione = str_replace("'", "\'",$_POST['descrizione']);
				$prezzo = str_replace("'", "\'",$_POST['prezzo']);
				$costo = str_replace("'", "\'",$_POST['costo']);
				$note = str_replace("'", "\'",$_POST['note']);
				$db = $_POST['db'];
				include 'connessione-db.php';	
			
				
				$sqlUpdate = "UPDATE materiali SET descrizione = '".$descrizione. "' , 
												codice = '".$codice. "' , 
												prezzo = '".$prezzo."' , 
												costo = '".$costo."' , 
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