<?php

session_start();

require_once __DIR__ . '/../vendor/autoload.php';


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();


$db_host = $_ENV['DB_HOST'];
$db_port = $_ENV['DB_PORT'];
$db_username = $_ENV['DB_USERNAME'];
$db_pass = $_ENV['DB_PASSWORD'];
$db_name = $_ENV['DB_NAME'];


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST,PUT,DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



$conn_string = "host=$db_host port=$db_port dbname=$db_name user=$db_username password=$db_pass";



$conn = pg_connect($conn_string);


