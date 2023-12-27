<html>
<body align="center">
<h1><u>User Manager</u></h1>
<form action="phpHandler.php" method="post" name="myForm" enctype="multipart/form-data">
Name : <input type="text" name="name" id="name" required><br><br>
UserName : <input type="text" name="username" id="username" required><br><br>
Password : <input type="password" name="password" id="password" required><br><br>
Gender : <input type="radio" name="gender" id="male" value="male" required>Male <input type="radio" name="gender" id="female" value="female" required>Female<br><br>
Hobbies : <input type="checkbox" name="hob[]" id="sports" value="sports">Sports <input type="checkbox" name="hob[]" id="reading" value="reading">Reading<input type="checkbox" name="hob[]" id="gaming" value="gaming">Gaming<br><br>
Profile Pic: <input type="File" name="ftu" id="ftu"><br><br>
<input type="hidden" value="hidden" name="hd1" id="hd1">
<input type="hidden" value="hidden" name="hd2" id="hd2">
<input type="submit" value="Add" name="btn1" id="btn1">
</form>
<br>
<br>
<h2><u>Registered Users</u></h2>
<table border="1" align="center">
<tr><th>uid</th><th>name</th><th>username</th><th>gender</th><th>hobbies</th><th>password</th><th>profilepic</th><th>update</th><th>delete</th></tr>
<?php
$conn = @mysql_connect('localhost','root','');
mysql_select_db('mydb1',$conn);
$sql = "select * from regdetails3";
$res = mysql_query($sql,$conn);
while($row = mysql_fetch_row($res))
{
	echo "<tr><td>".$row[0]."</td><td>".$row[1]."</td><td>".$row[2]."</td><td>".$row[3]."</td><td>".$row[4]."</td><td>".$row[6]."</td><td><img src='$row[5]' width='50' height='50'></td><td><button onclick=Upd($row[0],'$row[1]','$row[2]','$row[3]','$row[4]','$row[5]','$row[6]')>update</button></td><td><button onclick=Del($row[0],'$row[5]')>delete</button></td></tr>";
}
?>
</table>
<script>
function setHobs(hobbies)
{
	if(hobbies!="")
	document.getElementById(hobbies).checked = true;
}
function Upd(id,nm,unm,gd,hbs,pfp)
{
	document.getElementById('name').value=nm;
	document.getElementById('username').value=unm;
	document.getElementById(gd).checked=true;
	if(hbs!=''){
	let hobs = hbs.split(",");
	hobs.forEach(setHobs);
	}
	else{
		document.getElementById("sports").checked =false;
		document.getElementById("reading").checked =false;
		document.getElementById("gaming").checked =false;
	}
	document.getElementById('hd1').value=id;
	document.getElementById('hd2').value=pfp;
	document.getElementById('btn1').value="Update";
}
function Del(id,pfp)
{
    document.getElementById('hd1').value=id;
    document.getElementById('hd2').value=pfp;
	document.myForm.submit();
}
</script>
</body>
</html>