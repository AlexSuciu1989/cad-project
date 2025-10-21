<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost:3306";
$username = "alexsuci_user";
$password = "Desire1989";
$dbname = "alexsuci_db";



$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

?>