
	
<?php

			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				
				$codice = str_replace("'", "\'",$_POST['codice']);
				$descrizione = str_replace("'", "\'",$_POST['descrizione']);
				$prezzo = $_POST['prezzo'];
				$costo = $_POST['costo'];
				$note = str_replace("'", "\'",$_POST['note']);
				$db = $_POST['db'];
				include 'connessione-db.php';
			
		/*
				$codice = "NSTISO1M";				
				$descrizione = "Nastro Isolante da 1 metro"; 				
				$prezzo = '4.45';
				$costo = '3.70';
				$note = "Prezzo al metro";

				*/	
				
				$sql = "INSERT INTO materiali (codice,descrizione,prezzo,costo,note) VALUES ('".$codice."','".$descrizione."',CAST('".$prezzo."' AS DECIMAL(10,2)),CAST('".$costo."' AS DECIMAL(10,2)),'".$note."');";
				
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				echo json_encode("success");
				

			}else{
				echo "request error";
			}
			
?>
