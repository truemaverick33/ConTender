<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$name = $_POST['name'];
$comp = $_POST['company'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$pwd = $_POST['pwd'];
$city = $_POST['city'];
$state = $_POST['state'];

$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);

$sql = "INSERT INTO users(uname,company,email,phone,pwd,city,state) VALUES('$name','$comp','$email','$phone','$pwd','$city','$state')";
if(mysql_query($sql,$conn))
	{
		header('location:http://localhost:3000/login');
	}
	else{
		echo mysql_error($conn);
	}
?>