<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$log = $_POST['login'];
$pwd = $_POST['pwd'];
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$sql = "select * from users";
$res = mysql_query($sql,$conn);
while($row = mysql_fetch_row($res))
{
	if(($row[3] == $log)&&($row[5] == $pwd))
	{
		$flag=1;
		$data=array("uid"=>$row[0],"uname"=>$row[1],"company"=>$row[2],"email"=>$row[3],"phone"=>$row[4],"city"=>$row[6],"state"=>$row[7],"lastcheck"=>$row[8],"notifs"=>$row[9],"role"=>$row[10],"logstat"=>"success");
		echo json_encode($data);
		break;
	}
	else{
		$flag=0;
		continue;
	}
}
if($flag===0)
{
	$data=array("logstat"=>"failed");
	echo json_encode($data);
}
?>