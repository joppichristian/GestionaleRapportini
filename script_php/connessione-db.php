<?php

//$mysqli = new mysqli("54.201.175.207","root","root","gestionale");
$mysqli = new mysqli("localhost",  "root", "zse78hul", $db);

if ($mysqli->connect_errno) {
	echo "Failed to connect to DataBase...";
	exit();
}

?>
