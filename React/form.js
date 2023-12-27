import React from 'react';
import { useState,useEffect } from 'react';
import $ from 'jquery';

function RegForm()
{
//variables to store name,username,uid,updated name,updated username etc.
const [name,setName] = useState("");
const [uid,setUid] = useState(0);
const [updname,setUpdName] = useState("");
const [username,setUsername] = useState("");
const [updusername,setUpdUsername] = useState("");

//useEffect hook is used to send ajax request when page is loaded for select query
//and table the data to be displayed as soon as page loads
//Similar to onload event of html/javascript
// btn variable is send in data to let php know what action to perform here "select" that means select
useEffect(() => {
	  $.ajax({type:"POST",url:"http://localhost/php/Disp.php",data:{btn:"Select"},success(data){
		  var obj = JSON.parse(data);
		  var table="<tr><th>uid</th><th>name</th><th>username</th></tr>";
		  for(let i=0;i<obj.length;i++)
		  {
			  table += "<tr><td>" + obj[i]['uid'] + "</td><td>" + obj[i]['name'] +"</td><td>"+obj[i]['username']+"</td></tr>";
		  }
		  document.getElementById('t1').innerHTML=table;
	  }
	  });	
	});
//below there are 'e' written as parameters and they refer to the event that triggered the functions
// like onclick or onsubmit or onchange..
//e.target means the element that triggered event like the button / textbox / form etc
//e.target.value means value of the element.
// this handleName is to set the value of variable 'name' declared above
const handleName = (e) => {
	setName(e.target.value);
}
// this handleUid is to set the value of variable 'uid' declared above
const handleUid = (e) => {
	setUid(e.target.value);
}
// this handleUpdName is to set the value of variable 'updname' declared above
const handleUpdName = (e) => {
	setUpdName(e.target.value);
}
// this handleUsername is to set the value of variable 'username' declared above
const handleUsername = (e) => {
	setUsername(e.target.value);
}
// this handleUpdUsername is to set the value of variable 'updusername' declared above
const handleUpdUsername = (e) => {
	setUpdUsername(e.target.value);
}
// this is handelIns function that gets triggered when first form (insert form is submitted) to insert data
// it sends the name and username variable to php script to be inserted
// and reloads page after insertion to show the table with added record with help of useEffect Above
// btn variable is send in data to let php know what action to perform here "Add" that means insert
const handleIns = (e) => {
		e.preventDefault(); // used to prevent default submission event of html and use this 
		const form = $(e.target); //create object of form itself
		$.ajax({ type:"POST" ,
		url: form.attr("action"),
		data: {name:name , username:username , btn:"Add"},
		success(data){
			console.log(data);
			document.location.reload();//reloads page
		}//ajax call using jquery $
		});
}
// this is handelUpd function that gets triggered when 2nd form (update form is submitted) to update data
// it sends the uid , updname and updusername variable to php script to be updated
//it updates the username and name of inputted uid
// and reloads page after updation to show the table with updated record with help of useEffect Above
// btn variable is send in data to let php know what action to perform here "Update" that means Update
const handleUpd = (e) => {
		e.preventDefault(); // used to prevent default submission event of html and use this 
		const form = $(e.target); //create object of form itself
		$.ajax({ type:"POST" ,
		url: form.attr("action"),
		data: {uid:uid, name:updname , username:updusername , btn:"Update"},
		success(data){
			console.log(data);
			document.location.reload(); //reloads page
		}//ajax call using jquery $
		});
}
// this is handelDel function that gets triggered when 3rd form (delete form is submitted) to delete data
// it sends the uid variable to php script to be deleted (it shares same with update uid in this eg)
// so dont worry if value gets changed at both places
// it delets the user with the inputted uid
// and reloads page after deletion to show the table with deleted record with help of useEffect Above
// btn variable is send in data to let php know what action to perform here "Delete" that means Delete
const handleDel = (e) => {
		e.preventDefault();
		const form = $(e.target);
		$.ajax({ type:"POST" ,
		url: form.attr("action"),
		data: {uid:uid, btn:"Delete"},
		success(data){
			console.log(data);
			document.location.reload();
		}
		});
}
//below are three forms and one table to insert , update and delete and display data
return(
	<div>
	<h3> Insert Form </h3>
	<form action="http://localhost/php/phpreact.php" method="post" onSubmit={(event) => handleIns(event)} >
	Name:<input type="text" id="name" name="name" value={name} onChange={(event) => handleName(event)} /> <br/><br/>
	Username:<input type="text" id="username" name="username" value={username} onChange={(event) => handleUsername(event)} /><br/><br/>
	<br/>
	<button type="submit" name="Add">Insert</button>
	</form>
	<br/>
	<br/>
	<h3> Update Form </h3>
	<form action="http://localhost/php/phpreact.php" method="post" onSubmit={(event) => handleUpd(event)} >
	uid:<input type="number" id="uid" name="uid" value={uid} onChange={(event) => handleUid(event)} /><br/><br/>
	Name:<input type="text" id="name" name="name" value={updname} onChange={(event) => handleUpdName(event)} /><br/><br/>
	Username:<input type="text" id="username" name="username" value={updusername} onChange={(event) => handleUpdUsername(event)} /><br/><br/>
	<br/>
	<button type="submit" name="Update">Update</button>
	</form><br/><br/>
	<h3> Delete Form </h3>
	<form action="http://localhost/php/phpreact.php" method="post" onSubmit={(event) => handleDel(event)} >
	uid:<input type="number" id="uid" name="uid" value={uid} onChange={(event) => handleUid(event)} /><br/><br/>
	<button type="submit" name="Delete">Delete</button>
	</form><br/><br/>
	<h3> Display data </h3>
	<table id="t1" border="1">
	</table>
	</div>
	);
}
export default RegForm; 
//this statement is used to allow export of this page function so it can be used in index page to render
// the page contents