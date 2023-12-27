<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$notif = "<b>New Message from @".$_POST['from']." :</b> ".$_POST['msg'];
$concern = $_POST['concern'];
$icons = "messages-48.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
if(mysql_query($sql,$conn))
{
	$data=array("es"=>"success","res"=>"Message Sent Via Notification Successfully");
	echo json_encode($data);
}
else{
	$data=array("es"=>"failed","res"=>"Unsuccessful Try Again Later!");
	echo json_encode($data);
}
?>