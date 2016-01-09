
	
<?php

			
			
			if ($_SERVER['REQUEST_METHOD'] == "POST"){
				
				$db = $_POST['db'];
				
				$note = str_replace("'", "\'",$_POST['note']);
				$ora_inizio = $_POST['ora_inizio'];
				$ora_fine = $_POST['ora_fine'];
				$pausa = $_POST['pausa'];
				$id_dipendente = intval($_POST['dipendente']);
				$id_cliente = intval($_POST['cliente']);
				$materiali = $_POST['materiali'];
				$mezzi = $_POST['mezzi'];
					/*	
				$db = "Sql902302_4";
				$note = "a caso";
				$ora_inizio = "20:20";
				$ora_fine = "22:20";
				$pausa = 0.5;
				$id_dipendente = 1;
				$id_cliente = 5;
				*/
						
				list ($h_i, $m_i) = split (':', $ora_inizio);			
				list ($h_f, $m_f) = split (':', $ora_fine);
				
				$data_inzio = mktime($h_i,$m_i,0,date('m'),date('d'),date('Y')); 
				$data_fine = mktime($h_f,$m_f,0,date('m'),date('d'),date('Y'));
				
				
				$data_inzio = date( 'Y-m-d H:i:s', $data_inzio );
				 $data_fine = date( 'Y-m-d H:i:s', $data_fine );
				 
				
				include 'connessione-db.php';
				$sql = "INSERT INTO rapportini (id_dipendente,id_cliente,inizio,fine,pausa,note) VALUES (".$id_dipendente.",".$id_cliente.",'".$data_inzio."' ,'".$data_fine."',".$pausa.",'".$note."');";
				$mysqli->query('SET CHARACTER SET utf8');

				if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
					else{
				$insertId = $mysqli->insert_id;
				foreach($materiali as $key=>$val){
					$sql = "INSERT INTO utilizzo_risorse (id_materiale_mezzo,id_rapportino,tipologia,quantita) VALUES (".$val['id'].",".$insertId.",'ma' ,".$val['quantita'].");";
					$mysqli->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				}
				foreach($mezzi as $key=>$val){
					$sql = "INSERT INTO utilizzo_risorse (id_materiale_mezzo,id_rapportino,tipologia,quantita) VALUES (".$val['id'].",".$insertId.",'me' ,".$val['quantita'].");";
					$mysqli->query('SET CHARACTER SET utf8');

					if (!mysqli_query($mysqli,$sql)){
						echo mysqli_error($mysqli);
					}
				}
				echo json_encode("success");
				}

			}else{
				echo "request error";
			}
		
?>
