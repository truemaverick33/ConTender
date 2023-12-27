<?php 
header('Access-Control-Allow-Origin : http://localhost:3000');
$conn=@mysql_connect('localhost','root','');
mysql_select_db('auctiondb',$conn);
$email = $_POST['email'];
$pass = $_POST['password'];
$sql = " delete from usersignin where email='$email' and password = '$password' ";
if(mysql_query($sql,$conn)){
header('location:http://localhost:3000/Merchant');
}
else{
echo mysql_error($conn);
}
?>