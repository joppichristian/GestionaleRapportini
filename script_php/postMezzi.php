
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				
				$descrizione = str_replace("'", "\'",$_POST['descrizione']);
				$prezzo = $_POST['prezzo'];
				$costo = $_POST['costo'];
				$note = str_replace("'", "\'",$_POST['note']);
				$db = $_POST['db'];
				include 'connessione-db.php';
	
				
				$sql = "INSERT INTO mezzi (descrizione,prezzo,costo,note) VALUES ('".$descrizione."',CAST('".$prezzo."' AS DECIMAL(10,2)),CAST('".$costo."' AS DECIMAL(10,2)),'".$note."');";
				echo $sql;
				
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				echo json_encode("success");
				

			}else{
				echo "request error";
			}
			
?>
