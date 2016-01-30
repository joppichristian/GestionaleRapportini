
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$id = $_GET['id'];
				$db = $_GET['db'];
				include 'connessione-db.php';
				
				$qry = "SELECT m.id,m.descrizione,ur.quantita FROM materiali m JOIN utilizzo_risorse ur ON m.id = ur.id_materiale_mezzo WHERE ur.id_rapportino = ".$id." and tipologia='ma';";
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
