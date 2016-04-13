<?php
if ($_SERVER['REQUEST_METHOD'] == "GET")
{
	include("connessione-db-generale.php");

	$username=  $_GET['u'];
	$password= $_GET['p'];
	$azienda= $_GET['a'];
		//$qry = "SELECT * FROM Azienda_utente AU JOIN Azienda_cliente AC ON AU.ID_azienda = AC.ID_azienda WHERE username='".$user."' AND password='".$psw."';";
    //prevengo attacco SQL injection con prepared statement
  if ($stmt = $mysqli_generale->prepare("SELECT ID_utente, username, password, salt FROM Azienda_utente WHERE username = ? LIMIT 1")) {
    	// riga sotto sostituisce al ? sopra la s->stringa $username
			$stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();
    	//salva il risultato della query nei parametri
      $stmt->bind_result($user_id, $email, $db_password, $salt);
      $stmt->fetch();
    	//codifica la password usando una chiave univoca (salt)
      $password = hash('sha512', $password.$salt);
			//echo "username='".$username."' AND password='".$db_password."';";
      if($stmt->num_rows == 1) {
				//if(!possibile_attacco($user_id, $mysqli_generale)){
					if($db_password == $password){
						$qry = "SELECT * FROM Azienda_utente AU JOIN Azienda_cliente AC ON AU.ID_azienda = AC.ID_azienda WHERE username='".$username."' AND password='".$db_password."' AND codice = '".$azienda."';";
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
					}else	{
						//[LOG] Salvo il tenativo errato di login
					//	$timeNow = time();
					//	$mysqli_generale->query("INSERT INTO Tentativi_login (User_id, Time) VALUES ('$user_id', '$timeNow')");
					}
				//}
			}
	}
/*
	header('Content-Type: application/json');
	echo json_encode($rows);
	if($result1!=null){
		$result1->close();
	}*/
}
/*
function possibile_attacco($user_id, $mysqli) {
   $time_now = time();
   // dammi il time di 3 ore fa
   $time_possibile_attacco = $time_now - (3 * 60 * 60);
   if ($stmt = $mysqli->prepare("SELECT * FROM Tentativi_login WHERE User_id = ? AND TIME > '$time_possibile_attacco'")) {
	  $stmt->bind_param('d', $user_id);
      $stmt->execute();
      $stmt->store_result();
      // Se ha sbagliato 8 volte la password
      if($stmt->num_rows > 8) {
         return true;
      } else {
         return false;
      }
   }
}*/

?>
