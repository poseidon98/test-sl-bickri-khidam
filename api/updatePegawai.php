<?php
header("Content-Type: application/json");
include '../dbconn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['id'], $data['name'], $data['last_name'], $data['gender'], $data['email'], $data['phone_number'])
) {
    $stmt = $conn->prepare("UPDATE pegawais SET name=?, last_name=?, birth_date=?, gender=?, email=?, phone_number=?, updated_at=NOW() WHERE id=?");
    $stmt->bind_param(
        "ssssssi",
        $data['name'],
        $data['last_name'],
        $data['birth_date'],
        $data['gender'],
        $data['email'],
        $data['phone_number'],
        $data['id']
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Data tidak lengkap"]);
}
