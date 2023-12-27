<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$tid = $_POST['tid'];
$win = $_POST['win'];
$notif = " Results declared for tender tid : $tid";
$concern = "everyone";
$icons = "promotion-64.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$notif = "Congratulations! You Won the bid for tender tid : $tid";
$concern = "$win";
$icons = "confetti-48.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$sql = "UPDATE tenders  set winner='$win' where tid = $tid";
if(mysql_query($sql,$conn))
	{
	echo "success";
	}
	else{
	echo "fail";
	}
?>