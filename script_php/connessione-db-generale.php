<?php

//$mysqli = new mysqli("54.201.175.207","root","root","gestionale");
$mysqli_generale = new mysqli("localhost", "root", "zse78hul", "gestionale_amministrazione");

if ($mysqli_generale->connect_errno) {
	echo "Failed to connect to DataBase...";
	exit();
}
echo "success";

?>
