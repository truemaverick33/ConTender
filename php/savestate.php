<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 

$uid = $_POST['uid'];
$lc = $_POST['lc'];
$notifs = $_POST['notifs'];

$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$sql = "Update users set lastcheck='$lc',notifs=$notifs where uid=$uid";
if(mysql_query($sql,$conn))
	{
		echo "success";
	}
	else{
		echo mysql_error($conn);
	}
?>