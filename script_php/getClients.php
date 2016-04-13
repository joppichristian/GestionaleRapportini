
	
<?php

   			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$query = $_GET['q'];
				$db = $_GET['db'];
				$include_disabled = $_GET['all'];
				include 'connessione-db.php';
				
				if($include_disabled ==1)
					$qry = "SELECT * FROM clienti WHERE nominativo like '%".$query."%'  order by nominativo;";
				else
					$qry = "SELECT * FROM clienti WHERE nominativo like '%".$query."%' AND attivo = 1 order by nominativo;";
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
