
	
<?php

			include 'connessione-db.php';
			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$query = $_GET['q'];
				
				$qry = "SELECT * FROM materiali ".$query.";";
				$mysqli->query('SET CHARACTER SET utf8');
		    	$result = $mysqli->query($qry);
		    	while($row = $result->fetch_assoc()) {
					$rows[] = $row;
		    	}
				
				header('Content-Type: application/json');
		    	echo json_encode($rows);   
		               
		    	if($result!=null){
					$result->close();
				}
			}else{
				echo "Request Error";
			}
			
?>
