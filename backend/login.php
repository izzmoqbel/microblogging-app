<?php

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare SQL statement for PostgreSQL
    $sql = "SELECT * FROM admins WHERE username = $1";
    $result = pg_prepare($conn, "my_query", $sql);
    $result = pg_execute($conn, "my_query", array($username));

    if ($result) {
        $admin = pg_fetch_assoc($result);

        if ($admin && password_verify($password, $admin['password'])) {
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Database query failed']);
    }
}
