<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$toDay = date('dmY');
$db = "project1";
exec("mysqldump --user='root' --password='' --host='localhost' $db > C://wamp/www/php/backups/".$toDay."_DBbak.sql");
$data=array("es"=>"success","res"=>"Database Backedup SuccessFully");
echo json_encode($data);
?>