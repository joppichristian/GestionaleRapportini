<?php
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
			
				
				
				$db = $_POST['db'];
				include 'connessione-db.php';

				
				$sqlUpdate = "INSERT INTO classi_privilegi ( descrizione , 
												visualizzazione_cliente ,  
												aggiunta_cliente ,  
												modifica_cliente ,  
												cancellazione_cliente , 
												visualizzazione_materiale ,  
												aggiunta_materiale , 
												modifica_materiale , 
												cancellazione_materiale , 
												visualizzazione_mezzo ,  
												aggiunta_mezzo , 
												modifica_mezzo , 
												cancellazione_mezzo ,  
												visualizzazione_dipendente , 
												aggiunta_dipendente ,  
												modifica_dipendente , 
												cancellazione_dipendente , 
												modifica_privilegi ,  
												rapportino_rapido ,  
												visualizzazione_resoconti_rapportini,
												impostazioni_app,
												blocco_rapportini   
												) VALUES ('".$_POST['descrizione']. "' ,'".$_POST['vCL']. "' ,'".$_POST['aCL']. "' ,'".$_POST['mCL']. "' ,'".$_POST['cCL']. "' ,'".$_POST['vMA']. "' ,'".$_POST['aMA']. "' , '".$_POST['mMA']. "' , '".$_POST['cMA']. "' ,'".$_POST['vME']. "' ,'".$_POST['aME']. "' , '".$_POST['mME']. "' , '".$_POST['cME']. "' , '".$_POST['vDI']. "' ,	'".$_POST['aDI']. "' ,	'".$_POST['mDI']. "' , 	'".$_POST['cDI']. "' ,	'".$_POST['MP']. "' ,	'".$_POST['RR']. "','".$_POST['vRR']. "',	'".$_POST['IMP']. "',	'".$_POST['LOCK']. "'   );" ;
												  
				if (!mysqli_query($mysqli,$sqlUpdate)){
					echo mysqli_error($mysqli);
				}
				echo json_encode("success");
				

	}else{
		echo "request error";
	}


?>