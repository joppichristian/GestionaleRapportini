

<?php

   			if ($_SERVER['REQUEST_METHOD'] == "GET"){
				$id_c = $_GET['c'];
        $id_d = $_GET['d'];
				$db = $_GET['db'];
				include 'connessione-db.php';

				$qry = "SELECT * FROM dipendenti AS d, rapportini AS r WHERE r.id_cliente='".$id_c."' AND d.id='".$id_d."' ORDER BY inizio ASC;";

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
