<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$paidBy = $_POST['cny'];
$tid = $_POST['tid'];
$concern = $_POST['to'];
$notif = "<b> $paidBy </b> paid the tender fee and unlocked the tender";
$icons = "promotion-64.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$sql = "UPDATE portfolio set stat='Paid' where tid = $tid and user = '$paidBy' ";
if(mysql_query($sql,$conn))
	{
    $data=array("paid"=>"true");
	echo json_encode($data);
	}
	else{
	$data=array("paid"=>"false");
	echo json_encode($data);
	}

?>