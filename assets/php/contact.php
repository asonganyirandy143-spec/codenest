<?php
if($_SERVER['REQUEST_METHOD']==='POST'){
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    if($name && $email && $message){
        $to = "randyblaze208@gmail.com";
        $subject = "New message from RandyBlaze Coding website";
        $body = "Name: $name\nEmail: $email\nMessage:\n$message";
        $headers = "From: $email" . "\r\n" .
                   "Reply-To: $email" . "\r\n";

        if(mail($to, $subject, $body, $headers)){
            echo "✅ Your message has been sent!";
        } else {
            echo "❌ Sorry, something went wrong. Please try again.";
        }
    } else {
        echo "❌ Please fill in all fields.";
    }
    exit;
}
?>
