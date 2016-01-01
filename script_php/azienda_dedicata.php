<?php
if ($_SERVER['REQUEST_METHOD'] == "GET")
{


	//DB Connection
	//connessione a MySQL con l'estensione MySQLi
    $mysqli = new mysqli("62.149.150.245", "Sql902302", "5a6xps69a6", "Sql902302_3");
    //}
    // verifica dell'avvenuta connessione
    if (mysqli_connect_errno()) {
        //Errore
        //echo "Errore in connessione al DBMS: ".mysqli_connect_error();
        //Interruzione delle esecuzioni i caso di errore
		//echo 'errore';
        exit();
    }
    else
	{
	//echo 'Prova1';

    $azienda = $_GET['a'];
    $qry = "SELECT * FROM Azienda_cliente WHERE ID_azienda='".$azienda."';";


      $mysqli->query('SET CHARACTER SET utf8');
    	$result2 = $mysqli->query($qry);

    	while($row = $result2->fetch_assoc())
		{
      $rows[] = $row;
    	}

		header('Content-Type: application/json');
		echo json_encode($rows);
		if($result2!=null){
			$result2->close();
		}

	}
}
?>
