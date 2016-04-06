
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$db = $_GET['db'];
				include 'connessione-db.php';
				
				$qry = "SELECT * FROM classi_privilegi WHERE descrizione like '%".$_GET['q']."%';";
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
