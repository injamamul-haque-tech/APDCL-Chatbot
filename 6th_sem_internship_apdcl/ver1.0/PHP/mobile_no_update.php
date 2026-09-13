<?php
include("connection.php");
$mob_num = $_POST['mob_num'];
$consumer_num = $_POST['consumer_num'];

$update_sql = "update user set mobile_number='$mob_num' where consumer_number = '$consumer_num';";
$get_sql = "select name,mobile_number from user where consumer_number = '$consumer_num';";

$Update_result = mysqli_query($conn, $update_sql);
$result = mysqli_query($conn, $get_sql);
$row = mysqli_fetch_assoc($result);
$count = mysqli_num_rows($result);

if($count>0){
    $sentData = array(
        "name"=>$row["name"],
        "mob_num"=>$row["mobile_number"]
    );
}
echo json_encode($sentData);
?>