<?php
include("connection.php");
$tip_id = $_POST['tips'];

$sql = "select tip_details from tips where tip_number = $tip_id;";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$count = mysqli_num_rows($result);

if($count>0){
    $sentData = array(
        "tip_details"=>$row['tip_details']
    );
}
echo json_encode($sentData);
?>