import React from 'react';
import {useEffect} from 'react';
import $ from 'jquery';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import {Decryptor} from './ency.js';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Portfolio()
{
	useEffect(() => {
		if(localStorage.getItem("logstatus")==="false"){
		document.getElementById('page').style.display = "none";
		document.getElementById('err').style.display = "";
	}
	else{
	document.getElementById('err').style.display = "none";
	var usr = Decryptor(localStorage.getItem('cny'));
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{usr:usr,datafor:"portfol"},success(data){
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="<tr><th>Sr.</th><th>tid</th><th>tender</th><th>status</th><th>view</th></tr>";
		  for(let i=0;i<obj.length;i++)
		  {
			  table += "<tr><td>"+(i+1)+"</td><td>"+obj[i]['tid']+"</td><td>"+obj[i]['tname']+"</td><td>"+obj[i]['stat']+"</td><td><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a></td></tr>";
		  }
		  document.getElementById('t2').innerHTML=table;
	  }
	  });
	}
	});
var login= () =>{
	window.location.href = "http://localhost:3000/login"; 
}
return(
<>
<div>
<Alert variant="warning" id="err">Oops! You need to login first to access this page <br/><br/><Button variant="outline-warning" onClick={login}>Login</Button></Alert>
<div id="page" align="center">
<h1>Portfolio</h1>
<br/>
<br/>
<Container>
<Table bordered id="t2">
</Table>
</Container>
</div>
</div>
</>
);
}
export default Portfolio;