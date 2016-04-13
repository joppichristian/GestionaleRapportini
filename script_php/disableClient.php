<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
				
				
				
				$db = $_POST['db'];
				include 'connessione-db.php';
				

				
				$sqlUpdate = "UPDATE clienti SET attivo = 0 
												WHERE id = '".$_POST['id']."' ;" ;
												  
				if (!mysqli_query($mysqli,$sqlUpdate)){
					echo mysqli_error($mysqli);
				}
				echo json_encode("success");
				

	}else{
		echo "request error";
	}


?>