<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$tid = $_POST['tidt'];
$town = $_POST['town'];
$tcat = $_POST['tcat'];
$loc = $_POST['loc'];
$company = $_POST['cny'];
$em = $_POST['em'];
$pn = $_POST['pn'];
$toDay = date("jnyHis");
$file_name = $_FILES['file']['name'];
$file_size = $_FILES['file']['size'];
$file_tmp = $_FILES['file']['tmp_name'];
$file_type = $_FILES['file']['type'];
move_uploaded_file($file_tmp,"Bids/".$toDay.str_replace(' ', '',$file_name));
$file_loc = "Bids/".$toDay.str_replace(' ', '',$file_name);

$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$notif = "Bid submitted by <b>".$company."</b> for Tender Id = $tid";
$concern = "$town";
$icons = "new-48.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$sql = "UPDATE portfolio set stat='Bidded' where tid = $tid and user = '$company' ";
mysql_query($sql,$conn);
$sql = "INSERT INTO bids(tid,bidder,catagory,location,bid_doc,email,phone) VALUES($tid,'$company','$tcat','$loc','$file_loc','$em','$pn')";
if(mysql_query($sql,$conn))
	{
    header('location:http://localhost:3000/portfolio');
	}
	else{
	echo mysql_error($conn);
	}
?>