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
import dm from './icons/dm-64.png';

function Notify(){
useEffect(()=>{
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:"usrs"},success(data){
		  var obj = JSON.parse(data);
		  var opt = "<option>Select</option><option>everyone</option>"
		   for(let i=0;i<obj.length;i++)
		  {
			  if(opt.indexOf(obj[i]['company'])==-1){
			  if(obj[i]['company']!=Decryptor(localStorage.getItem('cny'))){
			  opt += "<option>"+obj[i]['company']+"</option>";
			   }
			  }
		  }
		  document.getElementById('concern').innerHTML = opt;
	}});
});
const sendNotice=()=>{
var concern = document.getElementById('concern').value;
var msg = document.getElementById('desc').value;
var from = Decryptor(localStorage.getItem("cny"));;
$.ajax({type:"POST",url:"http://localhost/php/sendNotice.php",data:{concern:concern,msg:msg,from:from},success(data){
		var obj = JSON.parse(data);
		if(obj.es=="success"){
			document.getElementById("successm").innerHTML=obj.res;
		    document.getElementById("successm").style.display="";
			
		}
		else{
			document.getElementById("failm").innerHTML=obj.res;
			document.getElementById("failm").style.display="";
			
		}
}});
}
const hideAl=()=>{
	document.getElementById("successm").style.display="none";
	document.getElementById("failm").style.display="none";
}
const clsAlt=()=>{
	document.getElementById('abtmess').style.display="none";
}
return(
<>
<div align="center">
<br/>
<Container style={{background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"35rem"}}>
<br/>
<Alert variant="success" id="successm" style={{display:"none"}}></Alert>
<Alert variant="fail" id="failm" style={{display:"none"}}></Alert>
<h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Messe</span>Fication<img src={dm} height="30" width="30"/></h1>
<br/>
<Alert variant="warning" id="abtmess" align="left" dismissible onClose={clsAlt}>
<Alert.Heading>About Messefication</Alert.Heading>
Messefication is a small facilty for users of contender or our
moderators to hold one-way communication with each other within the system.
You can use this utility to send a small noticable message to any specific user
or broadcast it to all users via the notification stream.
</Alert>
<div id="form">
<br/>
<InputGroup>
<InputGroup.Text>@</InputGroup.Text>
<Form.Select id="concern" style={{width:"30rem"}} onFocus={hideAl}>
</Form.Select> 
</InputGroup>
<br/>
<p>Message:</p>
<Form.Control as="textarea" id="desc" placeholder="write your message here..." rows={5} style={{width:"33rem"}} onFocus={hideAl} />
<br/>
<Button variant="dark" onClick={sendNotice}> Send </Button>
<br/>
<br/>
</div>
</Container>
</div>
<br/>
</>
);
}
export default Notify;