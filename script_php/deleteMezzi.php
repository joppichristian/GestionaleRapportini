
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$id = $_POST['id'];
				$db = $_POST['db'];
				include 'connessione-db.php';
				
				$qry = "DELETE FROM mezzi WHERE ID = ".$id.";";
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
