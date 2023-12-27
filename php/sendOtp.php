<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$otpFor = $_POST['otpfor'];
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
if($otpFor=="transaction"){
$paidBy = $_POST['cny'];
$tid = $_POST['tid'];
$otp = $_POST['otp'];
$concern = $_POST['cny'];
$notif = "Your Transaction Pin for transaction is <b> $otp </b>";
$icons = "lock-26.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
if(mysql_query($sql,$conn))
	{
    $data=array("sent"=>"true");
	echo json_encode($data);
	}
	else{
	$data=array("sent"=>"false");
	echo json_encode($data);
	}
}

?>