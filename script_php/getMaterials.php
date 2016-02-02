
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$query = $_GET['q'];
				$db = $_GET['db'];
				include 'connessione-db.php';
				
				$qry = "SELECT * FROM materiali WHERE descrizione like '%".$query."%' or codice like '%".$query."%' order by descrizione;";
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
