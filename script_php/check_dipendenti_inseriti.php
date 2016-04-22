
	
<?php

   			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				include 'connessione-db-generale.php';
				
				
				$qry = "SELECT ac.limite_utenze - COUNT( * ) as remained FROM Azienda_utente au LEFT JOIN utente_azienda ua ON au.id_Utente = ua.id_utente LEFT JOIN Azienda_cliente ac ON ua.id_azienda = ac.ID_azienda
WHERE ua.id_azienda = ".$_POST['az'].";";
				$mysqli_generale->query('SET CHARACTER SET utf8');
		    	$result = $mysqli_generale->query($qry);
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
