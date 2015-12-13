<?php

$mysqli = new mysqli("localhost","provejoppi","sivdodigbo15","my_provejoppi");
//$mysqli = new mysqli("62.149.150.245", "Sql902302", "5a6xps69a6", "Sql902302_2");
   
if ($mysqli->connect_errno) {
	echo "Failed to connect to DataBase...";
	exit();
}
?>