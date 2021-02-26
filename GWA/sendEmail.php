<?php
    use PHPMailer\PHPMailer\PHPMailer;


    $name = $_POST['callback_name'];
    $email = $_POST['callback_email'];
    $message = $_POST['callback_message'];

    // $attachment = $_POST['upload'];

    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";
    require_once "PHPMailer/Exception.php";

    $mail = new PHPMailer();

    //SMTP Settings
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = ""; // sender mail (SMPT)
    $mail->Password = ''; // password of sender mail
    $mail->Port = 465;
    $mail->SMTPSecure = "ssl";

    //Email Settings
    $mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);
    $mail->isHTML(true);

    $mail->setFrom(''); // sender mail 
    $mail->addAddress("info@goldenwebage.de"); // where the emails will go
    $mail->Subject = ("$email ($name)");
    $mail->Body = 'Name: ' . $name . '<br>' .
    'Email: ' . $email . '<br> <br>' .
    'Message: ' . $message . '<br>';


    if ($mail->send()) {
      header('location: thankyou.html');
    } else {
      echo 'Error';
    }

    exit(json_encode(array("status" => $status, "response" => $response)));
?>
