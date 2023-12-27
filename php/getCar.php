<?php
include("db_connection.php");

$id = $_GET['id'];
$query = "SELECT `id`,`car_name`, `brand_name`, `fuel_type`, `price`, `img_source` FROM `cars` where id=$id";
$result =mysqli_query($conn,$query);
$num= mysqli_num_rows($result);

if($num > 0)
{
	while($product = mysqli_fetch_array($result)){
	  $data[]=$product;
	}
	echo json_encode($data);
}		
?>	