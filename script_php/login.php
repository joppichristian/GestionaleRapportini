<?php
if ($_SERVER['REQUEST_METHOD'] == "GET")
{


	include("connessione-db-generale.php");

    $user=  $_GET['u'];
    $psw= $_GET['p'];

    $qry = "SELECT * FROM Azienda_utente AU JOIN Azienda_cliente AC ON AU.ID_azienda = AC.ID_azienda WHERE username='".$user."' AND password='".$psw."';";


      $mysqli_generale->query('SET CHARACTER SET utf8');
    	$result1 = $mysqli_generale->query($qry);

    	while($row = $result1->fetch_assoc())
		{
      $rows[] = $row;
    	}

		header('Content-Type: application/json');
		echo json_encode($rows);
		if($result1!=null){
			$result1->close();
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
