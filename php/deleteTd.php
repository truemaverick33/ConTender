<?php
header('Access-Control-Allow-Origin : http://localhost:3000'); 
    
$tid = $_POST['tid'];
$file = $_POST['file'];
$deletefile=unlink($file);  
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$sql = "delete from tenders where tid=$tid";
if(mysql_query($sql,$conn))
{
	echo "success";
}
else
{
	echo "failed";
}
?>