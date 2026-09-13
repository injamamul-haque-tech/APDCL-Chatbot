<?php
include("connection.php");
$txt = $_POST['inputText'];

$sql = "select name,mobile_number,address,user_connection_type,user.meter_number,electric_connection.connected_load from user INNER JOIN electric_connection on user.meter_number = electric_connection.meter_number where consumer_number = $txt;";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$count = mysqli_num_rows($result);

if($count>0){
    $sentData = array(
        "name"=>$row['name'],
        "address"=>$row['address'],
        "meter_number"=>$row['meter_number'],
        "connected_load"=>$row['connected_load'],
        "mobile_number"=>$row['mobile_number'],
        "user_connection_type"=>$row['user_connection_type'],
        "msg" => "success"
    );
}
else{
    $sentData = array(
        "msg" => "reject"
    );
}
echo json_encode($sentData);
?>