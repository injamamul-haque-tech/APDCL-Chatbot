<?php
include("connection.php");
$complaint_details = $_POST['complaint'];
$consumer_num = $_POST['consumer_num'];

$sql = "insert into complaints(consumer_number,complaint_details) values('$consumer_num','$complaint_details');";

$result = mysqli_query($conn, $sql);

echo "success";
