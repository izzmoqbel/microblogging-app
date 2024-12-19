<?php
include 'db.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $content = $_POST["content"];
    $img_url = "";

    if (strlen($content) < 500) {
        echo json_encode(['success' => false, 'message' => 'The content must be at least 500 characters']);
        exit;
    }

    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
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

        try {
            $sql ="INSERT INTO blogs (title, content, image_url) VALUES ($1, $2, $3)";
            $stmt = pg_prepare($conn, "insert_blog",$sql );

            $result = pg_execute($conn, "insert_blog", array($title, $content, $image_url));

            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Blog created successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create blog']);
            }
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid image file']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

pg_close($conn);