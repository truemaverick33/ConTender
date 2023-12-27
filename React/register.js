import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

function Reg()
{
var [name,setName] = useState("");
var [company,setCompany] = useState("");
var [email,setEmail] = useState("");
var [phone,setPhone] = useState("");
var [city,setCity] = useState("");
var [pwd,setPwd] = useState("");
var [state,setState] = useState("");

useEffect(() => {
	 document.getElementById('err').style.visibility = "hidden";
	 
});
const handleName = (e) => {
    setName(e.target.value);
}
const handlePwd = (e) => {
    setPwd(e.target.value);
}
const handleCompany = (e) => {
    setCompany(e.target.value);
}
const handleEmail = (e) => {
    setEmail(e.target.value);
}
const handlePhone = (e) => {
    setPhone(e.target.value);
}
const handleCity = (e) => {
    setCity(e.target.value);
}
const handleState = (e) => {
    setState(e.target.value);
}

const handleSmbt = (e) => {
	if(name=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('name').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Name cannot be blank";
	}
	else if(company=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('company').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Company cannot be blank";
	}
	else if(email=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('email').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="email cannot be blank";
	}
	else if(phone=="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('phone').focus();
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
		document.getElementById('name').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid name <br/> rules :<br/>1)Normal Humans have only alphabets in name<br/>2)You are not allowed to attempt XSS<br/>3) You aren't elon musk's child xae12 to have an alphanumeric name";
	}
	else if(company.match(/[a-zA-Z0-9._@]*/)==null)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('company').focus();
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

return(
<>
<br/>
<Container align="center" style={{borderRadius:"25px",width:"35rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Reg</span>ister:</h1>
<Alert variant="warning" id="err"></Alert>
<Form onSubmit={(event) => handleSmbt(event)} noValidate method="post" encType="multipart/form-data" action="http://localhost/php/reguser.php" style={{width:"30rem"}}>
<Form.Group>
<Form.Label>Full Name:</Form.Label>
<Form.Control type="text" name="name" id="name" onChange={(event) => handleName(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Company Name:</Form.Label>
<Form.Control type="text" name="company" id="company" onChange={(event) => handleCompany(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Email:</Form.Label>
<Form.Control type="email" name="email" id="email" onChange={(event) => handleEmail(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Phone:</Form.Label>
<Form.Control type="tel" name="phone" id="phone" onChange={(event) => handlePhone(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd" onChange={(event) => handlePwd(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>City:</Form.Label>
<Form.Control type="text" name="city" id="city" onChange={(event) => handleCity(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>State</Form.Label>
<Form.Select name="state" id="state" onChange={(event) => handleState(event)}>
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
</Form.Select>
</Form.Group>
<br/>
<Button variant="outline-warning" type="submit">Register</Button>&nbsp;&nbsp;
<Button variant="outline-secondary" type="Reset">Reset</Button>
</Form>
<br/>
</Container>
</>
);
}
export default Reg;