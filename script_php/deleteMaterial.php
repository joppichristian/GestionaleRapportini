
	
<?php

			include 'connessione-db.php';
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				
				$qry = "DELETE FROM materiali WHERE ID = ".$id.";";
				$mysqli->query('SET CHARACTER SET utf8');
		    	$result = $mysqli->query($qry);
		    	echo "success";
		               
		    	if($result!=null){
					$result->close();
				}
			}else{
				echo "Request Error";
			}
			
?>
