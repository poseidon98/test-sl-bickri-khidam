<?php
header("Content-Type: application/json");
include '../dbconn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['name'], $data['last_name'], $data['gender'], $data['email'], $data['phone_number'])
) {
    $stmt = $conn->prepare("INSERT INTO pegawais (name, last_name, birth_date, gender, email, phone_number, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param(
        "ssssss",
        $data['name'],
        $data['last_name'],
        $data['birth_date'],
        $data['gender'],
        $data['email'],
        $data['phone_number']
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Data tidak lengkap"]);
}
