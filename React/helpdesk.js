import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import searchicon from './icons/search-30.png';
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import $ from 'jquery';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import {Decryptor} from './ency.js';

function HelpDesk(){
const sendReport=()=>{
var rconcern = document.getElementById('issues').value;
var rdesc = document.getElementById('desc').value;
var rby = document.getElementById('usr').value;
$.ajax({type:"POST",url:"http://localhost/php/reportissue.php",data:{rby:rby,rdesc:rdesc,rconcern:rconcern},success(data){
		var obj = JSON.parse(data);
		const imgFold = require.context('./icons',true);
		if(obj.es=="success"){
			document.getElementById("success").innerHTML="<img src="+imgFold(`./success-80.png`)+" /><br/><br/>"+obj.res;
		    document.getElementById("success").style.display="";
			document.getElementById("fail").innerHTML="";
			document.getElementById("fail").style.display="none";
			document.getElementById("form").style.display="none";
			document.getElementById("cont").style.display="";
		}
		else{
			document.getElementById("success").innerHTML=""
		    document.getElementById("success").style.display="none";
			document.getElementById("fail").innerHTML="<img src="+imgFold(`./success-80.png`)+" /><br/><br/>"+obj.res;
			document.getElementById("fail").style.display="";
			document.getElementById("form").style.display="none";
			document.getElementById("cont").style.display="";
		}
}});
}
const backtohome=()=>{
	window.location.href="http://localhost:3000/home";
}
return(
<>
<div align="center">
<h1> Help Desk </h1>
<div>
<Alert variant="success" id="success" style={{display:"none"}}></Alert>
<Alert variant="fail" id="fail" style={{display:"none"}}></Alert>
<Button variant="dark" id="cont" style={{display:"none"}} onClick={backtohome}> Continue </Button>
<div id="form">
<br/>
<p>Select Issue:</p>
<Form.Select id="issues" style={{width:"30rem"}}>
		<option>Select an Issue</option>
		<option>Report Users</option>
		<option>Report Tenders</option>
		<option>Report Bug</option>
		<option>Request Changes</option>
</Form.Select> 
<br/>
<p>Description:</p>
<Form.Control as="textarea" id="desc" placeholder="Elaborate the issue here..." rows={5} style={{width:"30rem"}}/>
<br/>
<p>Posting Report/Request as:</p>
<Form.Control type="text" id="usr" style={{width:"30rem"}} value={Decryptor(localStorage.getItem('cny'))} readOnly />
<br/>
<Button variant="dark" onClick={sendReport}> Send </Button>
<br/>
<br/>
</div>
</div>
</div>
</>
);
}
export default HelpDesk;