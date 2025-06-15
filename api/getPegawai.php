<?php
header('Content-Type: application/json');
include '../dbconn.php';

$result = $conn->query("SELECT * FROM pegawais");
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
