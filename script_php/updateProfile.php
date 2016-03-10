<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
				$username = $_POST['username'];
				$old_password = $_POST['old_password'];
				$password = $_POST['password'];
				include 'connessione-db-generale.php';
				

				
					$sqlUpdate = "UPDATE Azienda_utente SET password = '".$password. "', username='".$username."'
												WHERE id_dipendente = ".$_POST['id']." and ID_azienda= ".$_POST['azienda']." and password= '".$old_password."' ;" ;
					$mysqli_generale->query('SET CHARACTER SET utf8');	  
					if (!mysqli_query($mysqli_generale,$sqlUpdate)){
						echo mysqli_error($mysqli_generale);
					}
					else{
					
						echo json_encode("success");
	

					}
				
				

	}else{
		echo "request error";
	}


?>