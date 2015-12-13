
	
<?php
	include 'connessione-db.php';
	
	$query="USE my_provejoppi;";
	$result = $mysqli->query($query);
	$query="SELECT * FROM clienti;";
	$result = $mysqli->query($query);       
	$array = mysql_fetch_row($result);      
	echo json_encode($array);

?>
