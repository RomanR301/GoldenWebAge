<?php
$to      = 'info@goldenwebage.de';
$subject = 'GoldenWebAge';
$useremail = $_POST['callback_email'];
$username = $_POST['callback_name'];
$message = $_POST['callback_message'];
$c = "\r\n";

$text_message = 'Name: ' . $username . $c .
'Email: ' . $useremail . $c .
'Message: ' . $message;

$headers = 'From: goldenwebage.ch' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $text_message, $headers);

if (mail($to, $subject, $text_message, $headers)) {
      header('location: thankyou.html');
    } else {
      echo 'Error';
    }

?>