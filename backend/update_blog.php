<?php

include 'db.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $removeImg = isset($_POST['removeImage']) && $_POST['removeImage'] === 'true';

    if (strlen($content) < 500) {
        echo json_encode(['success' => false, 'message' => 'Content must be at least 500 characters.']);
        exit;
    }

    $image_url = "";

    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $img_name = basename($_FILES['image']['name']);
        $img_tmp_name = $_FILES['image']['tmp_name'];
        $upload_dir = __DIR__ . '/../frontend/uploads/';

        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        $image_path = $upload_dir . $img_name;

        if (move_uploaded_file($img_tmp_name, $image_path)) {
            $image_url = 'uploads/' . $img_name;
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
            exit;
        }
    }

    if ($removeImg) {
        $query = "UPDATE blogs SET title = $1, content = $2, image_url = NULL WHERE id = $3";
        $result = pg_query_params($conn, $query, [$title, $content, $id]);
    } elseif ($image_url) {
        $query = "UPDATE blogs SET title = $1, content = $2, image_url = $3 WHERE id = $4";
        $result = pg_query_params($conn, $query, [$title, $content, $image_url, $id]);
    } else {
        $query = "UPDATE blogs SET title = $1, content = $2 WHERE id = $3";
        $result = pg_query_params($conn, $query, [$title, $content, $id]);
    }

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Blog updated successfully']);
    } else {
        $error = pg_last_error($conn);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $error]);
    }

    pg_close($conn);
}