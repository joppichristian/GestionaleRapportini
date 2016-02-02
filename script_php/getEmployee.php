
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$query = str_replace("'", "\'",$_GET['q']);
				$db = $_GET['db'];
				include 'connessione-db.php';
				
				$qry = "SELECT * FROM dipendenti WHERE nome like '%".$query."%' or cognome like '%".$query."%' order by nome,cognome";
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
