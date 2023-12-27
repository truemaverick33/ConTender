import {useState,useEffect} from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import {Decryptor} from './ency.js';
import $ from 'jquery';

function AddBid(){
useEffect(()=>{
	if(localStorage.getItem('role')!="mod"){
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'details',tid:tid},success(data){
		var obj = JSON.parse(data);
		document.getElementById('ttitle').value = obj[0]['title'];
		document.getElementById('tcat').value = obj[0]['catagory'];
		document.getElementById('town').value = obj[0]['company'];
		document.getElementById('loc').value =obj[0]['location'];
	}});
	document.getElementById('tidt').value=tid;
	document.getElementById('cny').value=Decryptor(localStorage.getItem('cny'));
	document.getElementById('em').value=Decryptor(localStorage.getItem('eml'));
	document.getElementById('pn').value=Decryptor(localStorage.getItem('pne'));
	}
});
return(<>
<br/>
<Container style={{ width:"40rem",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Add</span>Bid</h1>
<Row>
<Col md={1}></Col>
<Col align="center">
<Form action="http://localhost/php/uploadbid.php" noValidate method="post" encType="multipart/form-data" style={{width:"30rem"}} align="center">
<br/>
Your Company:<Form.Control type="text" id="cny" name="cny" readOnly/>
<br/><br/>
Your Email:
<Form.Control type="text" id="em" name="em" readOnly/>
<br/><br/>
Your Phone:
<Form.Control type="text" id="pn" name="pn" readOnly/>
<br/><br/>
TID of tender:
<Form.Control type="text" id="tidt" name="tidt" readOnly/>
<br/><br/>
Title of tender:
<Form.Control type="text" id="ttitle" name="ttitle" readOnly/>
<br/><br/>
Catagory of tender:
<Form.Control type="text" id="tcat" name="tcat" readOnly/>
<br/><br/>
Location of tender:
<Form.Control type="text" id="loc" name="loc" readOnly/>
<br/><br/>
Owner of tender:
<Form.Control type="text" id="town" name="town" readOnly/>
<br/><br/>
Upload Your Bid Document:
<Form.Control type="file" id="file" name="file"/>
<br/><br/>
<Button variant="warning" type="submit">Submit Bid</Button>
</Form>
<br/>
</Col>
<Col md={1}></Col>
</Row>
</Container>
<br/>
</>);
}
export default AddBid;