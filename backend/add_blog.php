<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $content = $_POST["content"];
    $img_url = "";
}

if (strlen($content) < 500) {
    echo json_encode(['sucsses' => false, 'message' => 'The content must be at least 500 characters']);
    exit;
}

if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $img_name = basename($_FILES['image']['name']);
    $img_tmp_name = $_FILES['image']['tmp_name'];
    $upload_dir = __DIR__ . '../frontend/uploads/';

    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    $image_path = $upload_dir . $img_name;

    if (move_uploaded_file($img_tmp_name, $image_path)) {
        $image_url = 'uploads/' . $img_name;
    } else {
        echo json_encode(['sucsses' => false, 'message' => 'Failed to upload image']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO blogs (title , content ,image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $image_url);

    if ($stmt->execute()) {
        echo json_encode(['sucsses' => true, 'message' => 'Blog created sucssesfully']);
    } else {
        echo json_encode(['sucsses' => false, 'message' => 'Error:' . $stmt->error]);
    }

    $stmt->close();
}
$conn->close();

