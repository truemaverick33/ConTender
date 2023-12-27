<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$name = $_POST['usr'];
$uid = $_POST['uid'];
$comp = $_POST['cny'];
$email = $_POST['em'];
$phone = $_POST['pn'];
$pwd = $_POST['pwd'];
$city = $_POST['city'];
$state = $_POST['state'];

$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$sql = "Update users set uname='$name',company='$comp',email='$email',phone='$phone',pwd='$pwd',city='$city',state='$state' where uid=$uid";
if(mysql_query($sql,$conn))
	{
		header('location:http://localhost:3000/profile');
	}
	else{
		echo mysql_error($conn);
	}
?>