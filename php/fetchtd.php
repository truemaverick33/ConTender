<?php
header('Access-Control-Allow-Origin : http://localhost:3000');
$conn=@mysql_connect('localhost','root','');
mysql_select_db('project1',$conn);
$datafor=$_POST['datafor'];
if($datafor == "mytends"){
$uname = $_POST['uname'];
$sql="select * from tenders where uname='$uname'";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data1[] = $row;
}
echo json_encode($data1);
}
else if($datafor == "alltends"){
$sql="select * from tenders";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data2[] = $row;
}
echo json_encode($data2);
}
else if($datafor == "alltendsCat"){
$cat = $_POST['cat'];
$sql="select * from tenders where catagory='$cat'";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data3[] = $row;
}
echo json_encode($data3);
}
else if($datafor == "details"){
$tid = $_POST['tid'];
$sql="select * from tenders where tid=$tid";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data4[] = $row;
}
echo json_encode($data4);
}
else if($datafor == "portfol"){
$usr = $_POST['usr'];
$sql="select * from portfolio where user='$usr'";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data5[] = $row;
}
echo json_encode($data5);
}
else if($datafor == "notifs"){
$usr = $_POST['uname'];
$cny = $_POST['cny'];
$sql="select * from notifications where concern='$usr' or concern='$cny' or concern='everyone' order by tstamp DESC";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data6[] = $row;
}
echo json_encode($data6);
}
else if($datafor == "users"){
$uid = $_POST['uid'];
$sql="select * from users where uid=$uid";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data4[] = $row;
}
echo json_encode($data4);
}
else if($datafor == "paym"){
$tid = $_POST['tid'];
$sql="select * from portfolio where tid=$tid";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data4[] = $row;
}
echo json_encode($data4);
}
else if($datafor == "paygay"){
$tid = $_POST['tid'];
$sql="select * from tenders where tid=$tid"; 
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data4[] = $row;
}
echo json_encode($data4);
}
else if($datafor == "bids"){
$tid = $_POST['tid'];
$sql="select * from bids where tid=$tid"; 
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data4[] = $row;
}
echo json_encode($data4);
}
else if($datafor == "latest"){
$sql="select * from tenders order by tid DESC";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data4[] = $row;
}
echo json_encode($data4);
}
else if($datafor == "locate"){
$loc = $_POST['loc'];
$sql="select * from tenders where location='$loc'";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data8[] = $row;
}
echo json_encode($data8);
}
else if($datafor == "searches"){
$sq = $_POST['sq'];
$sql="select * from tenders where catagory='$sq' or company='$sq' or title='$sq' or location='$sq'";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data9[] = $row;
}
echo json_encode($data9);
}
else if($datafor == "pref"){
$cny = $_POST['uname'];
$sql="SELECT catagory,count(bid_id) as total FROM bids where bidder='$cny' group by catagory order by total DESC limit 3";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
if(count($data)>=1){
$type1 = $data[0]['catagory'];
}
else{
$type1 = "";	
}
if(count($data)>=2){
$type2 = $data[1]['catagory'];
}
else{
$type2 = "";	
}
if(count($data)>=3){
$type3 = $data[2]['catagory'];
}
else{
$type3 = "";	
}
$sql="select * from tenders where catagory='$type1' or catagory='$type2' or catagory='$type3'";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data10[] = $row;
}
echo json_encode($data10);
}
else if($datafor == "reports"){
$sql="select * from reports";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
else if($datafor == "dash1"){
$sql="SELECT MONTH(upload_date) as mon,Count(tid) as total FROM tenders Group By mon";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
else if($datafor == "dash2"){
$sql="SELECT catagory,Count(tid) as total FROM tenders Group By catagory ";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
else if($datafor == "dash4"){
$sql="SELECT location,Count(tid) as total FROM tenders Group By location ";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
else if($datafor == "dash3"){
$sql="SELECT t.title as tdr,t.company as cpmy,Count(b.bid_id) as total FROM `tenders` t inner join `bids` b on t.tid = b.tid where DATEDIFF(NOW(),b.dob) < 8 group by t.title order by total DESC";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
else if($datafor == "usrs"){
$sql="select * from users";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
else if($datafor == "allbids"){
$sql="select * from bids";
$result = mysql_query($sql,$conn);
while($row = mysql_fetch_assoc($result))
{
  $data[] = $row;
}
echo json_encode($data);
}
?>