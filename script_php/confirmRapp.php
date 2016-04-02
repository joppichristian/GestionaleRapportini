
	
<?php

			
			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$db = $_POST['db'];
							
				include 'connessione-db.php';

				
				$sql = "UPDATE rapportini SET bloccato = ".$_POST['lock']." WHERE id = ".$_POST['id'].";";
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				echo json_encode("success");

			}else{
				echo "request error";
			}
			
?>
