<?php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == $_POST) {
    $id = $_POST['id'];

    $sql = "DELETE FROM blogs WHERE id=$1";

    $result = pg_prepare($conn,"delete_blog",$sql);

    if($result === false){
        $error = pg_last_error($conn);
        echo json_encode(['success' => false, 'message' => 'Error:' . $error  ]);
        exit;
    }

    $result = pg_execute($conn,"delete_blog",[$id]);

    if($result){
        echo json_encode(['success' => true, 'message' => 'Blog deleted successfully']);
    } else{
        $error = pg_last_error($conn);
        echo json_encode(['success' => false, 'message' => 'Error:' . $error]);
    }

    pg_close($conn);

}