import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import searchicon from './icons/search-30.png';
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import {Decryptor} from './ency.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UploadTend from './upload.js';
import Reg from './register.js';
import AddBid from './AddBid.js';
import ddone from './icons/checkmark-48.png';
import dback from './icons/databackup-40.png';
import Notify from './notify.js';

var timediff = 0;
function renderer(e){
	if(e.target.value=="Register User")
	{
		document.getElementById("d1").style.display="";
		document.getElementById("d2").style.display="none";
		document.getElementById("d3").style.display="none";
		document.getElementById("d4").style.display="none";
	}
	else if(e.target.value=="Upload Tender")
	{
		document.getElementById("d1").style.display="none";
		document.getElementById("d2").style.display="";
		document.getElementById("d3").style.display="none";
		document.getElementById("d4").style.display="none";
	}
	else if(e.target.value=="Upload Bid")
	{
        document.getElementById("d1").style.display="none";	
        document.getElementById("d2").style.display="none";	
        document.getElementById("d3").style.display="";	
        document.getElementById("d4").style.display="none";	
    }
	else if(e.target.value=="Custom Insert")
	{
        document.getElementById("d1").style.display="none";	
        document.getElementById("d2").style.display="none";	
        document.getElementById("d3").style.display="none";	
        document.getElementById("d4").style.display="";	
    }
	else{
		document.getElementById("d1").style.display="none";	
        document.getElementById("d2").style.display="none";	
        document.getElementById("d3").style.display="none";
	}
}
function Action(){
useEffect(()=>{
var lastback = new Date(localStorage.getItem("lastback"));
var today = new Date();	
var diff = today.getTime() - lastback.getTime();
timediff = Math.floor(diff/(1000*60*60*24));
});
const hideErr=()=>{
document.getElementById("fail").style.display="none";
document.getElementById("success").style.display="none";
}
const renderdel=(e)=>
{
	if(e.target.value=="users")
	{
	    document.getElementById("condition2").value="uid";
	}
	else if(e.target.value=="tenders")
	{
	    document.getElementById("condition2").value="tid";
	}
	else if(e.target.value=="notifications")
	{
	    document.getElementById("condition2").value="nid";
	}
	else if(e.target.value=="portfolio")
	{
	    document.getElementById("condition2").value="pid";
	}
	else if(e.target.value=="bids")
	{
	    document.getElementById("condition2").value="bid_id";
	}
	else if(e.target.value=="probs")
	{
    	document.getElementById("condition2").value="submid";
	}
	else{
	   document.getElementById("condition2").value="";
	}
};
const renderUpd=(e)=>
{
	if(e.target.value=="users")
	{
		document.getElementById("flist").innerHTML="<option>Select a field</option><option>role</option>";
	    document.getElementById("condition").value="uid";
	}
	else if(e.target.value=="tenders")
	{
		document.getElementById("flist").innerHTML="<option>Select a field</option><option>title</option><option>descr</option><option>location</option><option>catagory</option><option>tvalue</option><option>expd</option><option>tprice</option><option>tender</option><option>uname</option><option>company</option><option>winner</option>";
	    document.getElementById("condition").value="tid";
	}
	else if(e.target.value=="notifications")
	{
		document.getElementById("flist").innerHTML="<option>Select a field</option><option>concern</option>";
	    document.getElementById("condition").value="nid";
	}
	else if(e.target.value=="portfolio")
	{
		document.getElementById("flist").innerHTML="<option>Select a field</option><option>stat</option><option>user</option>";
	    document.getElementById("condition").value="pid";
	}
	else if(e.target.value=="bids")
	{
		document.getElementById("flist").innerHTML="<option>Select a field</option><option>bidder</option><option>catagory</option><option>location</option><option>bid_doc</option><option>email</option><option>phone</option>";
	    document.getElementById("condition").value="bid_id";
	}
	else if(e.target.value=="probs")
	{
		document.getElementById("flist").innerHTML="<option>Select a field</option><option>probprc</option>";
    	document.getElementById("condition").value="submid";
	}
	else{
	   document.getElementById("flist").innerHTML="";
	   document.getElementById("condition").value="";
	}
};
const exeQuery=(qry,typ)=>{
	$.ajax({type:"POST",url:"http://localhost/php/executioner.php",data:{sql:qry,type:typ},success(data){
		if(typ=="upd"||typ=="del" ||typ=="ins"){
			var obj = JSON.parse(data);
			if(obj.es == "success"){
				 document.getElementById("success").innerHTML=obj.res;
				 document.getElementById("success").style.display="";
				 document.getElementById("fail").innerHTML="";
				 document.getElementById("fail").style.display="none";
			}
			else{
				 document.getElementById("success").innerHTML="";
				 document.getElementById("success").style.display="none";
				 document.getElementById("fail").innerHTML=obj.res;
				 document.getElementById("fail").style.display="";
			}
		}
		else{
			try{
			var obj = JSON.parse(data);
			if(obj.es=="failed")
			{
				document.getElementById("op").innerHTML="Error: "+obj.res;
			}
			else{
			var table="<tr>";
			var x = parseInt(obj[0]);
			for(let i=1;i<=x;i++){
				table+="<th>"+obj[i]+"</th>";
			}
			table +="</tr>";
			for(let a=x+1;a<obj.length;a++){
				table+="<tr>";
			  for(let j=0;j<obj[a].length;j++){
				table+="<td>"+obj[a][j]+"</td>";
			  }
			  table+="</tr>";
			}
			document.getElementById("op").innerHTML=table;}
			}
			catch{
			 document.getElementById("op").innerHTML="No Results Found. Check Your SQL Query Or Try Some Other Value";
			}
		}
	}});
}
const UpdateB=()=>
{
	var db = document.getElementById('dblist').value;
	var fl = document.getElementById('flist').value;
	var val = document.getElementById('nval').value;
	var cnd = document.getElementById('condition').value;
	var cv = document.getElementById('cval').value;
	var sql = "update "+db+" set "+fl+"='"+val+"' where "+cnd+"="+cv;
	exeQuery(sql,"upd");
	
}
const UpdateC=()=>{
	
	var sql = document.getElementById('ubuild').value;
	if(sql.toLowerCase().indexOf("update") != -1){
	exeQuery(sql,"upd");
	}
	document.getElementById("fail").innerHTML="Not an Update Query";
	document.getElementById("fail").style.display="";
	document.getElementById('ubuild').focus();
	
}
const DelB=()=>{
	var db = document.getElementById('dblist2').value;
	var val = document.getElementById('nval2').value;
	var cnd = document.getElementById('condition2').value;
	var sql = "delete from "+db+" where "+cnd+"="+val;
	console.log(sql);
	exeQuery(sql,"del");
}
const DelC=()=>{
	
	var sql = document.getElementById('dbuild').value;
	if(sql.toLowerCase().indexOf("delete") != -1){
	exeQuery(sql,"del");
	}
	else{
		document.getElementById("fail").innerHTML="Not a Delete Query";
		document.getElementById("fail").style.display="";
		document.getElementById('dbuild').focus();
	}
}
const InsC=()=>{
	var sql = document.getElementById('ibuild').value;
	if(sql.toLowerCase().indexOf("insert") != -1){
	exeQuery(sql,"ins");
	}
	else{
		document.getElementById("fail").innerHTML="Not a Insert Query";
		document.getElementById("fail").style.display="";
		document.getElementById('ibuild').focus();
	}
}
const SelC=()=>{
	var sql = document.getElementById('sbuild').value;
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else{
		document.getElementById("fail").innerHTML="Not a Select Query";
		document.getElementById("fail").style.display="";
		document.getElementById('sbuild').focus();
	}
}
const createbackup=()=>{
	$.ajax({type:"POST",url:"http://localhost/php/backdatabse.php",success(data){
		var obj = JSON.parse(data);
		if(obj.es == "success"){
				 document.getElementById("success").innerHTML=obj.res;
				 document.getElementById("success").style.display="";
				 document.getElementById("fail").innerHTML="";
				 document.getElementById("fail").style.display="none";
				 var currentDate = new Date();
				 localStorage.setItem("lastback",currentDate);
				 window.location.reload();
			}
			else{
				 document.getElementById("success").innerHTML="";
				 document.getElementById("success").style.display="none";
				 document.getElementById("fail").innerHTML=obj.res;
				 document.getElementById("fail").style.display="";
			}
	}});
}
const clsAlt1=()=>{
	document.getElementById('abt1').style.display="none";
}
const clsAlt2=()=>{
	document.getElementById('abt2').style.display="none";
}
const clsAlt3=()=>{
	document.getElementById('abt3').style.display="none";
}
const clsAlt4=()=>{
	document.getElementById('abt4').style.display="none";
}
const clsAlt5=()=>{
	document.getElementById('abt5').style.display="none";
}
const clsAlt6=()=>{
	document.getElementById('abt6').style.display="none";
}
return(
<>
<div align="center">
<h1> Action </h1>
<Alert variant="danger" id="fail" style={{display:"none"}}></Alert>
<Alert variant="success" id="success" style={{display:"none"}}></Alert>
<Tabs defaultActiveKey="Insert" variant="tabs">
      <Tab eventKey="Insert" title="Insert">
	  <br/>
        <h3>Insert</h3>
		Select Database : 
		<Form.Select id="userlist" onChange={(event)=>renderer(event)} style={{width:"20rem"}}>
		<option>Select</option>
		<option>Register User</option>
		<option>Upload Tender</option>
		<option>Upload Bid</option>
		<option>Custom Insert</option>
		</Form.Select>
		<div id="d1" style={{display:"none"}}><Reg /></div>
		<div id="d2" style={{display:"none"}}><UploadTend /></div>
		<div id="d3" style={{display:"none"}}><AddBid /></div>
		<div id="d4" style={{display:"none"}}>
		<br/>
		<Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"30rem"}}>
		 <h1 align="center">Custom<span style={{color:"rgb(248, 161, 27)"}}>Query</span></h1>
		 <br/>
		 <br/>
		 <Alert variant="warning" id="abt1" align="left" dismissible onClose={clsAlt1}>
         <Alert.Heading>About Custom Query</Alert.Heading>
          Custom Query Engine is a Extended functionality for moderators expert in SQL,
		  it allows run custom insert,update,delete queries on database tables of ConTender.
		  It also enables to generate result datasets with Custom user defined Select Queries
		  to generate useful in-sights or get all the required data info.
         </Alert>
		 <Form.Control as="textarea" id="ibuild" placeholder="Write Your Insert Query Here..." rows={7} onChange={hideErr}/>
		 <br/>
		 <Button variant="dark" onClick={InsC}> Execute </Button>
		 <br/>
		 <br/>
		</Container>
		</div>
      </Tab>
      <Tab eventKey="Update" title="Update">
	  <br/>
	  <Row>
	  <h3>Update</h3>
	  <Col>
	  <br/>
	  <Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
		<h1 align="center">Query<span style={{color:"rgb(248, 161, 27)"}}>Builder</span></h1>
		<br/>
		<Alert variant="warning" id="abt5" align="left" dismissible onClose={clsAlt5}>
         <Alert.Heading>About Query Builder</Alert.Heading>
          Query Builder is a handy functionality for moderators new in SQL,
		  it allows run update and delete queries on database tables of ConTender.
		  all you need is to input values into given fields and let our Query Builder 
		  handle the rest. it automatically creates appropriate sql query and executes it.
         </Alert>
		<h4 align="left">Update</h4>
        <Form.Select id="dblist" onChange={(event)=>renderUpd(event)}  style={{width:"30rem"}}>
		<option>Select a database</option>
		<option>users</option>
		<option>tenders</option>
		<option>notifications</option>
		<option>probs</option>
		<option>portfolio</option>
		<option>bids</option>
		</Form.Select> 
		<h4 align="left">Set</h4>
		<Form.Select id="flist" style={{width:"30rem"}}>
		</Form.Select>
		<h4 align="left">=</h4>
        <Form.Control type="text" id="nval" placeholder="Enter New Value" style={{width:"30rem"}}/>
		<h4 align="left">Where</h4>
		<Form.Control type="text" id="condition" style={{width:"30rem"}} readOnly />
		<h4 align="left">=</h4>
        <Form.Control type="text" id="cval" placeholder="Enter New Value" style={{width:"30rem"}}/>
		<br/>
		<Button variant="dark" onClick={UpdateB}> Execute </Button>
		<br/>
		<br/>
        </Container>		
		</Col>
		<Col>
		<br/>
		 <Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
		 <h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Custom</span>Query</h1>
		 <br/>
		 <Alert variant="warning" id="abt2" align="left" dismissible onClose={clsAlt2}>
         <Alert.Heading>About Custom Query</Alert.Heading>
          Custom Query Engine is a Extended functionality for moderators expert in SQL,
		  it allows run custom insert,update,delete queries on database tables of ConTender.
		  It also enables to generate result datasets with Custom user defined Select Queries
		  to generate useful in-sights or get all the required data info.
         </Alert>
		 <br/>
		 <Form.Control as="textarea" id="ubuild" placeholder="Write Your Update Query Here..." rows={5} onChange={hideErr} />
		 <br/>
		 <Button variant="dark" onClick={UpdateC}> Execute </Button>
		 <br/>
		 <br/>
		 </Container>
		</Col>
        </Row>		
      </Tab>
      <Tab eventKey="Delete" title="Delete">  
	  <br/>
	<Row>
	  <h3>Delete</h3>
	  <Col>
	  <br/>
	  <Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
		<h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Query</span>Builder</h1>
		<br/>
		<Alert variant="warning" id="abt6" align="left" dismissible onClose={clsAlt6}>
         <Alert.Heading>About Query Builder</Alert.Heading>
          Query Builder is a handy functionality for moderators new in SQL,
		  it allows run update and delete queries on database tables of ConTender.
		  all you need is to input values into given fields and let our Query Builder 
		  handle the rest. it automatically creates appropriate sql query and executes it.
         </Alert>
		<h4 align="left">Delete From</h4>
        <Form.Select id="dblist2" onChange={(event)=>renderdel(event)}  style={{width:"30rem"}}>
		<option>Select a database</option>
		<option>users</option>
		<option>tenders</option>
		<option>notifications</option>
		<option>probs</option>
		<option>portfolio</option>
		<option>bids</option>
		</Form.Select> 
		<h4 align="left">Where</h4>
		<Form.Control type="text" id="condition2" style={{width:"30rem"}} readOnly />
		<h4 align="left">=</h4>
        <Form.Control type="text" id="nval2" placeholder="Enter New Value" style={{width:"30rem"}}/>
		<br/>
		<Button variant="dark" onClick={DelB}> Execute </Button>
		<br/>
		<br/>
        </Container>		
		</Col>
		<Col>
		<br/>
		 <Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
		 <h1 align="center">Custom<span style={{color:"rgb(248, 161, 27)"}}>Query</span></h1>
		 <br/>
		 <Alert variant="warning" id="abt3" align="left" dismissible onClose={clsAlt3}>
         <Alert.Heading>About Custom Query</Alert.Heading>
          Custom Query Engine is a Extended functionality for moderators expert in SQL,
		  it allows run custom insert,update,delete queries on database tables of ConTender.
		  It also enables to generate result datasets with Custom user defined Select Queries
		  to generate useful in-sights or get all the required data info.
         </Alert>
		 <br/>
		 <Form.Control as="textarea" id="dbuild" placeholder="Write Your Delete Query Here..." rows={5} onChange={hideErr} />
		 <br/>
		 <Button variant="dark" onClick={DelC}> Execute </Button>
		 <br/>
		 <br/>
		 </Container>
		</Col>
        </Row>
      </Tab>
	  <Tab eventKey="Select" title="Select">
	  <br/>
        <h3>Select</h3>
		<br/>
		<Row>
		<Col>
		<Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"20rem"}}>
		 <h1 align="center">Custom<span style={{color:"rgb(248, 161, 27)"}}>Query</span></h1>
		 <br/>
		 <Alert variant="warning" id="abt4" align="left" dismissible onClose={clsAlt4}>
         <Alert.Heading>About Custom Query</Alert.Heading>
          Custom Query Engine is a Extended functionality for moderators expert in SQL,
		  it allows run custom insert,update,delete queries on database tables of ConTender.
		  It also enables to generate result datasets with Custom user defined Select Queries
		  to generate useful in-sights or get all the required data info.
         </Alert>
		 <br/>
		 <Form.Control as="textarea" id="sbuild" placeholder="Write Your Select Query Here..." rows={7} onChange={hideErr}/>
		 <br/>
		 <Button variant="dark" onClick={SelC}> Execute </Button>
		 <br/>
		 <br/>
		 </Container>
		 </Col>
		 <Col>
		 <Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"50rem"}}>
		 <h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Out</span>Put</h1>
		 <br/>
		 <br/>
		 <Table responsive bordered striped id="op" style={{width:"30rem"}}></Table>
		 <br/>
		 <br/>
		 </Container>
		 </Col>
		 </Row>
      </Tab>
	  <Tab eventKey="Notify" title="Notify">
	  <Notify />
	  </Tab>
	  <Tab eventKey="Backup" title="Backup">
	  <br/>
	  <Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"30rem"}}>
	  <h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Database </span>BackUp</h1>
	  <br/>
	  <br/>
	  <div>{ timediff>0?<img src={dback} />:<img src={ddone} />}
	  <br/>
	  <br/>
	  { timediff>0?<Button variant="success" onClick={createbackup}>Backup Database</Button>:<Button variant="success" disabled>Backedup Already</Button>}
	  </div>
	  <br/>
	  <br/>
	  <h6>Last Backup : {localStorage.getItem("lastback")}</h6>
	  <br/>
	  </Container>
	  <br/>
	  </Tab>
    </Tabs>
</div>
</>
);
}
export default Action;