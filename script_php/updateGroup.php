<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
				
				$db = $_POST['db'];
				include 'connessione-db.php';

				
				$sqlUpdate = "UPDATE classi_privilegi SET descrizione = '".$_POST['descrizione']. "' , 
												visualizzazione_cliente = '".$_POST['vCL']. "' , 
												aggiunta_cliente = '".$_POST['aCL']. "' , 
												modifica_cliente = '".$_POST['mCL']. "' , 
												cancellazione_cliente = '".$_POST['cCL']. "' ,
												visualizzazione_materiale = '".$_POST['vMA']. "' , 
												aggiunta_materiale = '".$_POST['aMA']. "' , 
												modifica_materiale = '".$_POST['mMA']. "' , 
												cancellazione_materiale = '".$_POST['cMA']. "' ,
												visualizzazione_mezzo = '".$_POST['vME']. "' , 
												aggiunta_mezzo = '".$_POST['aME']. "' , 
												modifica_mezzo = '".$_POST['mME']. "' , 
												cancellazione_mezzo = '".$_POST['cME']. "' , 
												visualizzazione_dipendente = '".$_POST['vDI']. "' , 
												aggiunta_dipendente = '".$_POST['aDI']. "' , 
												modifica_dipendente = '".$_POST['mDI']. "' , 
												cancellazione_dipendente = '".$_POST['cDI']. "' ,
												modifica_privilegi = '".$_POST['MP']. "' , 
												rapportino_rapido = '".$_POST['RR']. "' , 
												visualizzazione_resoconti_rapportini = '".$_POST['vRR']. "'   
												WHERE id = '".$_POST['id']."' ;" ;
												  
				if (!mysqli_query($mysqli,$sqlUpdate)){
					echo mysqli_error($mysqli);
				}
				echo json_encode("success");
				

	}else{
		echo "request error";
	}


?>