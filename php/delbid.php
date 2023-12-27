<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$tid = $_POST['tid'];
$town = str_replace(')','',str_replace('(','',$_POST['town']));
$company = $_POST['pp'];

$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$notif = "<b>".$company."</b> Backed off from Tender Id = $tid";
$concern = "$town";
$icons = "new-48.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$concern','$icons')";
mysql_query($sql,$conn);
$sql = "UPDATE portfolio set stat='Paid' where tid = $tid and user = '$company' ";
mysql_query($sql,$conn);
$sql = "select bid_doc from bids where tid = $tid and bidder = '$company' ";
$res=mysql_query($sql,$conn);
$row = mysql_fetch_row($res);
unlink($row[0]); 
$sql = "Delete from bids where tid=$tid and bidder='$company'";
if(mysql_query($sql,$conn))
	{
    echo "success";
	}
	else{
	echo mysql_error($conn);
	}
?>