<?php

include "db.php";

$sql = "SELECT * FROM blogs ORDER BY created_at DESC ";
$result = pg_query($conn, $sql);

$blogs = [];

while ($row = pg_fetch_row($result)) {
    $blogs[] = $row;
}

echo json_encode($blogs);

pg_close($conn);
