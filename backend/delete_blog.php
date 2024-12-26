<?php

include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the input data
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'];

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Invalid blog ID']);
        exit;
    }

    // Delete query
    $query = "DELETE FROM blogs WHERE id = $1";
    $result = pg_query_params($conn, $query, [$id]);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Blog deleted successfully']);
    } else {
        $error = pg_last_error($conn);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $error]);
    }

    pg_close($conn);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
