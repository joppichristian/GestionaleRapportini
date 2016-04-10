
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				$tipo = $_POST['tipo'];
				$db = $_POST['db'];
				include 'connessione-db.php';
				$qry = "DELETE FROM utilizzo_risorse WHERE id_materiale_mezzo = ".$id." and tipologia= ".$tipo.";";
		    	if (!mysqli_query($mysqli,$qry)){
						echo mysqli_error($mysqli);
					}
				echo json_encode("success");

			}else{
				echo "Request Error";
			}
			
?>
