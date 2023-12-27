import React from 'react';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import {useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import {Decryptor} from './ency.js';
import mv from './icons/mv-48.png';
function MyTends()
{
useEffect(() => {
	if(localStorage.getItem("logstatus")==="false"){
		document.getElementById('page').style.display = "none";
		document.getElementById('err').style.display = "";
	}
	else{
	document.getElementById('err').style.display = "none";
	var uname = Decryptor(localStorage.getItem("un"));
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'mytends',uname:uname},success(data){
		  console.log(data);
		  var obj = JSON.parse(data);
		  var table="";
		  const imgFold = require.context('./icons',true);
		  for(let i=0;i<obj.length;i++)
		  {
			 table += "<tr><th>" +  (i+1) +". " +obj[i]['title'] + "</th></tr><tr><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr>";
			 }
		  document.getElementById('t3').innerHTML=table;
	  }
	  });
	}

});
var uploading = () =>{
	window.location.href = "http://localhost:3000/upload"; 
}
var login= () =>{
	window.location.href = "http://localhost:3000/login"; 
}
return(
<>
<Alert variant="warning" id="err">Oops! You need to login first to access this page <br/><br/><Button variant="outline-warning" onClick={login}>Login</Button></Alert>
<div align="center" id="page">
<h1>My Tenders</h1>
<br/>
<br/>
<Button variant="outline-secondary" onClick={uploading}>Upload +</Button>
<hr/>
<Container>
<Table bordered striped id="t3">
</Table>
</Container>
</div>
</>
);
}
export default MyTends;