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

		
    $user=  $_GET['u'];
    $psw= $_GET['p'];
    $qry = "SELECT * FROM Azienda_utente WHERE username='".$user."' AND password='".$psw."';";


      $mysqli->query('SET CHARACTER SET utf8');
    	$result1 = $mysqli->query($qry);

    	while($row = $result1->fetch_assoc())
		{
      $rows[] = $row;
    	}

		header('Content-Type: application/json');
		echo 'json_user({"items":'.json_encode($rows).'})';
		if($result1!=null){
			$result1->close();
		}

	}
}
?>








<?php
/*
    include 'connessione-db-generale.php';

    if ($_SERVER['REQUEST_METHOD'] == "GET"){
      $user=  $_POST['u'];
      $psw= $_POST['p'];
      $qry = "SELECT * FROM Azienda_utente WHERE username='".$user."' AND password='".$psw."';";
      $mysqli->query('SET CHARACTER SET utf8');
        $result = $mysqli->query($qry);
        while($row = $result->fetch_assoc()) {
        $rows[] = $row;
        }

      header('Content-Type: application/json');
        //echo json_encode($rows);
        //echo 'la query è : '.$qry;
        echo 'json_user({"items":'.json_encode($rows).'})';

        //mysql_close($qry);
        if($result!=null){
        $result->close();
      }
    }else{
      //echo "Request Error";
      //mysql_close($qry);
    }
*/
?>
