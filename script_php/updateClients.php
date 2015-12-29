<?php
	include "connessione-db.php";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
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
				
				/*
				
				$nominativo = "Christian Joppi";
				$indirizzo = "Piazza Melari 4";
				$citta = "Valda";
				$cap = "38030";
				$provincia = "TN";
				$telefono = "";
				$cellulare = "";
				$cf = "";
				$piva = "";
				$email = "";
				$site = "";
				$note = "";
				*/

				
				$sqlUpdate = "UPDATE clienti SET nominativo = '".$nominativo. "' , 
												indirizzo = '".$indirizzo. "' , 
												citta = '".$citta."' , 
												cap = '".$cap."' , 
												provincia = '".$provincia."' , 
												telefono = '".$telefono."' , 
												cellulare = '".$cellulare."' , 
												codice_fiscale = '".$cf."' , 
												partita_iva = '".$piva."' , 
												email = '".$email."' , 
												sito = '".$site."' , 
												note = '".$note."'
												WHERE id = '".$_POST['id']."' ;" ;
												//WHERE id = 3 ;" ;
												  
				if (!mysqli_query($mysqli,$sqlUpdate)){
					echo mysqli_error($mysqli);
				}
				else{
					echo "success";
				}
				

	}else{
		echo "request error";
	}


?>