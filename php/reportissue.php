<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$rby = $_POST['rby'];
$rconcern = $_POST['rconcern'];
$rdesc = $_POST['rdesc'];
$notif = "A new report is waiting to be addressed";
$concern = "mod1";
$icons = "promotion-64.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$sql = "INSERT INTO reports(rby,rconcern,rstatement) VALUES ('$rby','$rconcern','$rdesc')";
if(mysql_query($sql,$conn))
{
	$data=array("es"=>"success","res"=>"SuccessFully Submitted!");
	echo json_encode($data);
}
else{
	$data=array("es"=>"failed","res"=>"Unsuccessful Try Again Later!");
	echo json_encode($data);
}
?>