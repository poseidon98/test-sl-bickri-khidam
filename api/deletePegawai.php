<?php
header("Content-Type: application/json");
include '../dbconn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $stmt = $conn->prepare("DELETE FROM pegawais WHERE id=?");
    $stmt->bind_param("i", $data['id']);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID tidak ditemukan"]);
}
