
	
<?php

   			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				
				
				$db = $_POST['db'];
				include 'connessione-db.php';
				
				
				$qry = "SELECT ".$_POST["slVLS"]." FROM ".$_POST["tb1"]." JOIN ".$_POST["tb2"]." ON ".$_POST["fl1"]." = ".$_POST["fl2"]." WHERE ".$_POST["flWH"]." = ".$_POST["vlWH"].";";
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
