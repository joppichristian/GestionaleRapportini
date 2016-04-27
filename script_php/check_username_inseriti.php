
	
<?php

   			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				include 'connessione-db-generale.php';
				
				
				$qry = "SELECT COUNT(*) as inserted FROM Azienda_utente WHERE username like '".$_POST['us']."';";
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
