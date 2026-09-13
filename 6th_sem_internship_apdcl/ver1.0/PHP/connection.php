<?php
$server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "6th_sem_internship_apdcl";

$conn = mysqli_connect($server, $db_username, $db_password, $db_name);

if (!$conn) {
    die("Connection Failed :(");
} 

?>