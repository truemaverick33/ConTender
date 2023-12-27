import React from 'react';
import Table from 'react-bootstrap/Table';
import {useState,useEffect} from 'react';
import $ from 'jquery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Decryptor} from './ency.js';
import background from './icons/transfer.jpg';
import InputGroup from 'react-bootstrap/InputGroup';

function PayGateway(){
const [Otp,setOTP] = useState(0);
const [uname,setUname] = useState("");
useEffect(() => {
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'paygay',tid:tid},success(data){
		var obj = JSON.parse(data);
		for(let i=0;i<obj.length;i++)
		{
			document.getElementById('to').value = obj[i]['company'];
			document.getElementById('amount').value = obj[i]['tprice'];
			setUname(obj[i]['uname']);
		}
		document.getElementById('from').value =  Decryptor(localStorage.getItem('cny'))
	}});
},[uname]);
const procTranc = () =>{
	if(document.getElementById('tp').innerHTML === "Send Transaction Pin"){
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	var cny = document.getElementById('from').value;
	var usr = Decryptor(localStorage.getItem('un'));
	var otp = Math.floor(1000 + Math.random() * 9000);
	setOTP(otp);
	$.ajax({type:"POST",url:"http://localhost/php/sendOtp.php",data:{otpfor:"transaction",tid:tid,cny:cny,otp:otp,usr:usr},success(data){
	var obj = JSON.parse(data);
	if(obj.sent=="true")
	{
		document.getElementById('tpin').disabled=false;
		document.getElementById('tp').innerHTML="$pay";
	}
	}});
}
else{
	var tpin = parseInt(document.getElementById('tpin').value) ;
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	var cny = document.getElementById('from').value;
	var tocn =  document.getElementById('to').value;
	var usr = Decryptor(localStorage.getItem('un'));
	if(Otp===tpin)
	{
	$.ajax({type:"POST",url:"http://localhost/php/Pay.php",data:{tid:tid,cny:cny,usr:usr,to:tocn},success(data){
    var obj = JSON.parse(data)
	if(obj.paid=="true"){
	window.location.href="http://localhost:3000/viewdetails?tid="+tid;
	}
	else{
		document.getElementById('tpin').disabled=true;
		document.getElementById('tp').innerHTML="Send Transaction Pin";
		alert("transaction failed");
	}
	}});
	}
}
}
return (
<>
<br/>
<br/>
<Container align="center">
<Row>
<Col md={2}></Col>
<Col align="center">
<div style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<h1 align="center">Pay<span style={{color:"rgb(248, 161, 27)"}}>ment</span></h1>
<br/>
<Form>
<Row>
<Col md={1}></Col>
<Col>
<InputGroup>
<InputGroup.Text>From:</InputGroup.Text>
<Form.Control type="text" id="from" readOnly/>       
</InputGroup>
</Col>
<Col>
<InputGroup>
<InputGroup.Text>To:</InputGroup.Text>
<Form.Control type="text" id="to" readOnly/>       
</InputGroup>
</Col>
<Col md={2}><InputGroup>
<InputGroup.Text>&#x20B9;</InputGroup.Text>
<Form.Control type="text" id="amount" readOnly/>       
</InputGroup></Col> 
<Col md={1}></Col>
</Row>
<br/>
<Row>
<Col md={4}></Col>
<Col md={2} align="left"><Form.Control type="password" length="4" id="tpin" size="4" disabled/></Col>
<Col><Button variant="primary" id="tp" onClick={procTranc}>Send Transaction Pin</Button></Col>
<Col></Col>
</Row>
<br/><br/>
</Form>
</div>
</Col>
<Col md={2}></Col>
</Row>
<br/>
<img src={background} height="300" width="400"/>
</Container>

</>
);
}
export default PayGateway;