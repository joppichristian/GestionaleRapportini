
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				$db = $_POST['db'];
				include 'connessione-db.php';
				
				$qry = "DELETE FROM mezzi WHERE ID = ".$id.";";
				$mysqli->query('SET CHARACTER SET utf8');
		    	if (!mysqli_query($mysqli,$qry)){
						echo mysqli_error($mysqli);
					}
				echo json_encode("success");

			}else{
				echo "Request Error";
			}
			
?>
