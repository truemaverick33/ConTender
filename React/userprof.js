import React from 'react';
import Table from 'react-bootstrap/Table';
import {useState,useEffect} from 'react';
import $ from 'jquery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {Decryptor} from './ency.js';
import usrp from './icons/user-50.png';
import imp from './icons/important.gif';

function Profile()
{
const handleSmbt = (e) => {
	var name = document.getElementById('usr').value;
	var company = document.getElementById('cny').value;
	var email = document.getElementById('em').value;
	var phone = document.getElementById('pn').value;
	var pwd = document.getElementById('pwd').value;
	var city = document.getElementById('city').value;
	var state = document.getElementById('state').value;
	if(name=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('usr').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Name cannot be blank";
	}
	else if(company=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('cny').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Company cannot be blank";
	}
	else if(email=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('em').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="email cannot be blank";
	}
	else if(phone=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('pn').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="phone number cannot be blank";
	}
	else if(city=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('city').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="city cannot be blank";
	}
	else if(state=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('state').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Pls Select a valid city";
	}
	else if(email.match(/[A-Za-z0-9._ ]*@+[a-zA-Z]*\.+[a-zA-Z.]*/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('email').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid email address! <br/>rules :<br/>1)Cannot be Blank<br/>2)Must be a valid email format <br/>eg: Exam_ple.123@gmail.com";
	}
	else if(phone.match(/[6-9]+[0-9]{9}/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('phone').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid phone number! <br/>rules :<br/>1)Cannot be Blank<br/>2)Must contain 10 digits <br/>3)Starting with 6-9";
	}
	else if(pwd.match(/[A-Za-z0-9._@]{7}[a-zA-Z0-9._@]*/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('pwd').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid password <br/> rules :<br/>1)Must be 7 characters <br/>2)Must be valid characters";
	}
	else if(name.match(/[a-zA-Z]*/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('usr').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid name <br/> rules :<br/>1)Normal Humans have only alphabets in name<br/>2)You are not allowed to attempt XSS<br/>3) You aren't elon musk's child xae12 to have an alphanumeric name";
	}
	else if(company.match(/[a-zA-Z0-9._@]*/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('cny').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid company name <br/> rules :<br/>1)Must be valid characters";
	}
	else if(city.match(/[a-zA-Z]*/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('city').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid city name<br/> rules :<br/>1)Must be valid characters [alphabets only]";
	}
}
useEffect(()=>{
	document.getElementById('err').style.visibility = "hidden";
	var uid = Decryptor(localStorage.getItem("uid"));
	
	//console.log(uid);
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'users',uid:uid},success(data){
	var obj = JSON.parse(data);
	document.getElementById('usr').value=obj[0]['uname'];
	document.getElementById('uid').value=obj[0]['uid'];
	document.getElementById('cny').value=obj[0]['company'];
	document.getElementById('em').value=obj[0]['email'];
	document.getElementById('pn').value=obj[0]['phone'];
	document.getElementById('pwd').value=obj[0]['pwd'];
	document.getElementById('city').value=obj[0]['city'];
	document.getElementById('state').value=obj[0]['state'];
	}
	});
});
const refresh = () =>{
	window.location.reload();
}
const handleFoc = () =>{
	document.getElementById('err').style.visibility = "visible";
	document.getElementById('err').innerHTML="username and company name cannot be edited !";
}
const handleBlr = () =>{
	document.getElementById('err').style.visibility = "hidden";
}
return(
<>
<div align="center">
<h1> Profile </h1>
<br/>
<div style={{width:"50rem",height:"45rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"50%"}}>
<div style={{width:"40rem",height:"40rem",background:"white",borderRadius:"50%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<div style={{background:"white",width:"30rem",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<Image roundedCircle src={usrp} height="100" width="100"/>
<br/>
<Alert variant="warning" id="err"></Alert>
<Container>
<Row>
<Col md={2}></Col>
<Col>
<Form noValidate method="post" action="http://localhost/php/upduser.php" onSubmit={(event) => handleSmbt(event)}>
<Table bordered striped>
<tr align="center"><th>Field</th><th style={{width:"80%"}}>Value</th></tr>
<tr align="center"><td>User Name:</td><td><Form.Control type="text" id="usr" name="usr" readOnly onFocus={handleFoc} onBlur={handleBlr}/></td></tr>
<tr align="center"><td>Company:</td><td><Form.Control type="text" id="cny" name="cny" readOnly onFocus={handleFoc} onBlur={handleBlr}/></td></tr>
<tr align="center"><td>Email:</td><td><Form.Control type="text" id="em" name="em"/></td></tr>
<tr align="center"><td>Phone:</td><td><Form.Control type="text" id="pn" name="pn"/></td></tr>
<tr align="center"><td>Password:</td><td><Form.Control type="password" id="pwd" name="pwd"/></td></tr>
<tr align="center"><td>City:</td><td><Form.Control type="text"  id="city" name="city"/></td></tr>
<tr align="center"><td>State:</td><td><Form.Select name="state" id="state">
<option>--Select--</option>
<option>Andhra Pradesh</option>
<option>Arunachal Pradesh</option>
<option>Assam</option>
<option>Bihar</option>
<option>Chhattisgarh</option>
<option>Goa</option>
<option>Gujarat</option>
<option>Haryana</option>
<option>Himachal Pradesh</option>
<option>Jammu and Kashmir</option>
<option>Jharkhand</option>
<option>Karnataka</option>
<option>Kerala</option>
<option>Madhya Pradesh</option>
<option>Maharashtra</option>
<option>Manipur</option>
<option>Meghalaya</option>
<option>Mizoram</option>
<option>Mizoram</option>
<option>Odisha</option>
<option>Punjab</option>
<option>Rajasthan</option>
<option>Sikkim</option>
<option>Tamil Nadu</option>
<option>Telangana</option>
<option>Tripura</option>
<option>Uttar Pradesh</option>
<option>Uttarakhand</option>
<option>West Bengal</option>
</Form.Select></td></tr>
<Form.Control type="hidden" id="uid" name="uid"/>
</Table>
<Button variant="outline-warning" type="submit">Update</Button>&nbsp;&nbsp;
<Button variant="outline-secondary" onClick={refresh}>Reset</Button>
<br/>
<br/>
</Form>
</Col>
<Col md={2}></Col>
</Row>
</Container>
</div>
</div>
</div>
</div>
</>
);
}

export default Profile;