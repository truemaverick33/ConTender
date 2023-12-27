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

function UploadTend()
{
var [title,setTitle] = useState("");
var [descr,setDescr] = useState("");
var [locate,setLocate] = useState("");
var [cat,setCat] = useState("");
var [val,setVal] = useState("");
var [expd,setExpd] = useState("");
var [price,setPrice] = useState("");

useEffect(()=>{
	document.getElementById('uname').value=Decryptor(localStorage.getItem("un"));
	document.getElementById('cny').value=Decryptor(localStorage.getItem("cny"));

});
const handleTitle = (e) => {
    setTitle(e.target.value);
}
const handleDescr = (e) => {
    setDescr(e.target.value);
}
const handleLocate = (e) => {
    setLocate(e.target.value);
}
const handleCat = (e) => {
    setCat(e.target.value);
}
const handleVal = (e) => {
    setVal(e.target.value);
}
const handleExpd = (e) => {
    setExpd(e.target.value);
}
const handlePrice = (e) => {
    setPrice(e.target.value);
}
const handleSmbt = (e) =>{
	var file=document.getElementById('tfile');
	if(title==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('title').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Title cannot be blank";
	}
	else if(descr==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('descr').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="A short description about tender would be appriciated";
	}
	else if(locate==="--select--" || locate==="" )
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('loc').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Please select a valid location";
	}
	else if(cat==="--select--" || cat==="" )
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('cat').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Please select a valid catagory";
	}
	else if(val==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('val').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Tender Value cannot be null";
	}
	else if(expd==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('expd').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Please select a valid expiry date";
	}
	else if(file.files.length===0)
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('tfile').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Please select a File for tender";
	}
	else if(price==="")
	{
		console.log("freebie");
	}
}
return(
<>
<br/>
<Container style={{borderRadius:"25px",width:"35rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<Row>
<Col align="center">
<Alert variant="warning" id="err"><Alert.Heading>Note:</Alert.Heading>Username and Company name will be taken from the user credentials of the logged in account</Alert>
<h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Up</span>load:</h1>
<br/>
<Form action="http://localhost/php/uploadtd.php" noValidate method="post" encType="multipart/form-data" onSubmit={(event) => handleSmbt(event)} style={{width:"30rem"}}>
<Form.Group>
<Form.Label>Tender Title :</Form.Label>
<Form.Control type="text" id="title" name="title" onChange={(event) => handleTitle(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Description :</Form.Label>
<Form.Control as="textarea" id="descr" name="descr" rows={3} onChange={(event) => handleDescr(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Location :</Form.Label>
<Form.Select id="loc" name="loc"  onChange={(event) => handleLocate(event)}>
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
<Form.Group>
<Form.Label>Catagory :</Form.Label>
<Form.Select id="cat" name="cat" onChange={(event) => handleCat(event)}>
<option>--Select--</option>
<option>Aerospace</option>
<option>Agro</option>
<option>Aviation</option>
<option>Automobile</option>
<option>Bio</option>
<option>Chemicals</option>
<option>Civil works</option>
<option>Construction</option>
<option>Computer Harware and Software</option>
<option>Defence</option>
<option>Electricals</option>
<option>Food Grains</option>
<option>Fruits and Plants</option>
<option>Healthcare</option>
<option>House Appliances</option>
<option>HydroPower</option>
<option>Lighting</option>
<option>Machinery</option>
<option>Medical</option>
<option>Mining</option>
<option>Military</option>
<option>Pipelines</option>
<option>Pharma</option>
<option>Port</option>
<option>Railways</option>
<option>Resources</option>
<option>Real Estate</option>
<option>Robotics</option>
<option>Roadways</option>
<option>Solar</option>
<option>Spices</option>
<option>Telecomm</option>
</Form.Select>
</Form.Group>
<Form.Group>
<Form.Label>Tender Value :</Form.Label>
<Form.Control type="text" name="val" id="val" onChange={(event) => handleVal(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Expire date :</Form.Label>
<Form.Control type="date" name="expd" id="expd" onChange={(event) => handleExpd(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Tender price:</Form.Label>
<Form.Control type="number" step="100" name="price" id="price" onChange={(event) => handlePrice(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Tender Document:</Form.Label>
<Form.Control name="tfile" id="tfile" type="file"></Form.Control>
</Form.Group>
<Form.Control name="uname" id="uname" type="hidden"></Form.Control>
<Form.Control name="cny" id="cny" type="hidden"></Form.Control>
<br/>
<Button variant="outline-warning" type="submit">Upload</Button>
</Form>
</Col>
</Row>
<br/>
</Container>
<br/>
</>
);
}
export default UploadTend;