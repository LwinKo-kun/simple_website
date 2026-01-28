<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    if($name && $email && $message){
        // Demo response
        echo json_encode([
            "status"=>"success",
            "message"=>"Thank you, $name! Your message has been received."
        ], JSON_PRETTY_PRINT);
    } else {
        echo json_encode([
            "status"=>"error",
            "message"=>"All fields are required."
        ], JSON_PRETTY_PRINT);
    }
} else {
    echo json_encode([
        "status"=>"error",
        "message"=>"Invalid request method. Use POST."
    ], JSON_PRETTY_PRINT);
}
exit;
