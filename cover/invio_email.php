<?php

$email=$_GET['email'];
$oggetto=$_GET['oggetto'];
$messaggio=$_GET['testo'];

$mittente = $email;//'From: "Trentino Droni" <io@mioserver.it> \r\n';
$destinatario = "l.casna@gmail.com.com";
mail($destinatario, $oggetto, $messaggio, $mittente);

echo "<script>alert('Email inviata correttamente!');</script>";
echo "<script>window.location = 'index.html#contact'</script>";

?>
