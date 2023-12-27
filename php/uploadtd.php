<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$title = $_POST['title'];
$descr = $_POST['descr'];
$loc = $_POST['loc'];
$cat = $_POST['cat'];
$val = $_POST['val'];
$exp = $_POST['expd'];
$prc = $_POST['price'];
$uname = $_POST['uname'];
$company = $_POST['cny'];
$toDay = date("jnyHis");
$file_name = $_FILES['tfile']['name'];
$file_size = $_FILES['tfile']['size'];
$file_tmp = $_FILES['tfile']['tmp_name'];
$file_type = $_FILES['tfile']['type'];
move_uploaded_file($file_tmp,"tenders/".$toDay.str_replace(' ', '',$file_name));
$file_loc = "tenders/".$toDay.str_replace(' ', '',$file_name);

$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$notif = "New Tender uploaded by <b>".$company."</b> in ".$cat." catagory";
$concern = "everyone";
$icons = "new-48.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$sql = "INSERT INTO tenders(title,descr,location,catagory,tvalue,expd,tprice,tender,uname,company) VALUES('$title','$descr','$loc','$cat','$val','$exp','$prc','$file_loc','$uname','$company')";
if(mysql_query($sql,$conn))
	{
		header('location:http://localhost:3000/mytenders');
	}
	else{
		echo mysql_error($conn);
	}
?>