<?php
$host = "localhost"; // Your database host
$user = "root";      // Default username in XAMPP
$pass = "";          // Default password is empty in XAMPP
$dbname = "porfyro_assignment"; // Your database name

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>