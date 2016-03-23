
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				$db = $_POST['db'];
				include 'connessione-db.php';
				
				$qry = "select * from rapportini join clienti on id_cliente = clienti.id where id_dipendente = ".$_POST['dip']." and DAY(inizio) = ".$_POST['data_dd']." and MONTH(inizio)= ".$_POST['data_mm']." and YEAR(inizio)= ".$_POST['data_yy'].";";
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
