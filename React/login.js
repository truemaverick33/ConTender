import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import {Encryptor} from './ency.js';

function Login()
{
var [log,setLog] = useState("");
var [pwd,setPwd] = useState("");

useEffect(() => {
	 document.getElementById('err').style.visibility = "hidden";
	 if(localStorage.getItem('logstatus')=="true"){
		 window.location.href="http://localhost:3000/";
	 }
});
const handlePwd = (e) => {
    setPwd(e.target.value);
}
const handleLog = (e) => {
    setLog(e.target.value);
}
const handleSmbt = (e) => {
	if(log==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('login').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Email or Phone cannot be blank";
	}
	else if(pwd==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('pwd').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Password cannot be blank";
	}
	else{
		e.preventDefault();
		e.stopPropagation();
		const form = $(e.target);
		$.ajax({ type:"POST" ,
		url: form.attr("action"),
		data: {login:log,pwd:pwd},
		success(data){
			var obj = JSON.parse(data);
			//console.log(obj.logstat);
			//console.log(obj.lastcheck);
			if(obj.logstat==="success"){
			localStorage.setItem("logstatus","true");
			localStorage.setItem("uid",Encryptor(obj.uid));
			localStorage.setItem("un",Encryptor(obj.uname));
			localStorage.setItem("cny",Encryptor(obj.company));
			localStorage.setItem("eml",Encryptor(obj.email));
			localStorage.setItem("pne",Encryptor(obj.phone));
			localStorage.setItem("cty",Encryptor(obj.city));
			localStorage.setItem("ste",Encryptor(obj.state));
			localStorage.setItem("lastcheck",obj.lastcheck);
			localStorage.setItem("notifs",obj.notifs);
			localStorage.setItem("role",obj.role);
			window.location.href="http://localhost:3000/";
			}
			else if(obj.logstat==="failed"){
		    document.getElementById('err').style.visibility = "visible";
		    document.getElementById('err').innerHTML="Credentials Mismatched! Try Again :(";
			document.getElementById('pwd').value="";
			document.getElementById('pwd').focus();
			} 
		}
		});
	}
}
return(
<>
<br/>
<br/>
<div align="center">
<div style={{width:"31rem",height:"31rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"50%"}}>
<div style={{width:"27rem",height:"27rem",background:"white",borderRadius:"50%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<Container style={{borderRadius:"25px",width:"25rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h2 align="center">Log<span style={{color:"rgb(248, 161, 27)"}}>In</span></h2>
<Alert variant="warning" id="err"></Alert>
<Form method="post" onSubmit={(event) => handleSmbt(event)} action="http://localhost/php/loginuser.php">
<Form.Group>
<Form.Label>Email:</Form.Label>
<Form.Control type="email" name="login" id="login" onChange={(event) => handleLog(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd" onChange={(event) => handlePwd(event)}></Form.Control>
</Form.Group>
<br/>
<Button variant="outline-warning" type="submit">Login</Button>
</Form>
<br/>
</Container>
</div>
</div>
</div>
</>
);
}
export default Login;