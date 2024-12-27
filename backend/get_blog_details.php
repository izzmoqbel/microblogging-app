<?php
include "db.php";


if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $query = "SELECT * FROM blogs WHERE id = $1";
    $result = pg_query_params($conn, $query, array($id));

    if ($result) {
        $blog = pg_fetch_assoc($result);

        if ($blog) {
            echo json_encode(["success" => true, "blog" => $blog]);
        } else {
            echo json_encode(["success" => false, "message" => "Blog not found."]);
        }
    } else {
        error_log("Database query error: " . pg_last_error($db));
        echo json_encode(["success" => false, "message" => "Database query error"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request."]);
}

pg_close($conn);
