<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
$act=$_POST['act'];
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
if($act=="set"){
$tid=$_POST['tid'];
$pp=$_POST['pp'];
$tn=$_POST['tname'];
$tcm=$_POST['tcm'];
$st="EOI";
$notif ="<b>".$pp."</b> submitted Expression of interest for your tender";
$icons = "pin-48.png";
$sql = "INSERT INTO notifications(notif,concern,ico) VALUES ('$notif','$tcm','$icons')";
mysql_query($sql,$conn);
$sql = "INSERT INTO portfolio(tid,tname,stat,user) VALUES($tid,'$tn','$st','$pp')";
mysql_query($sql,$conn);
$sql = "INSERT INTO probs(tid,probprc) VALUES ($tid,'$pp')";
if(mysql_query($sql,$conn))
	{
		echo "success";
	}
	else{
		echo mysql_error($conn);
	}
}
else if($act=="get"){
$tid=$_POST['tid'];
$sql="select * from probs where tid=$tid";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
?>