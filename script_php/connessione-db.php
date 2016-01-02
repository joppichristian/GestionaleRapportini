<?php

//$mysqli = new mysqli("54.201.175.207","root","root","gestionale");
$mysqli = new mysqli("62.149.150.245", "Sql902302", "5a6xps69a6", $db);

if ($mysqli->connect_errno) {
	echo "Failed to connect to DataBase...";
	exit();
}

?>
