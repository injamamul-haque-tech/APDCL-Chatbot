<?php
include("connection.php");
$consumer_num = $_POST['consumer_num'];

$sql = "select amount_paid,due_amount,due_date from bills where bill_date = (SELECT bill_date FROM bills WHERE consumer_number = $consumer_num ORDER BY bill_date DESC LIMIT 1);";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$count = mysqli_num_rows($result);

if($count>0){
    $sentData = array(
        "amt_paid" => $row['amount_paid'],
        "due_amount" => $row['due_amount'],
        "due_date" => $row['due_date'],
        "status" => "has_bill"
    );
}
else{
    $sentData = array(
        "status" => "no_bill"
    );
}
echo json_encode($sentData);
?>
