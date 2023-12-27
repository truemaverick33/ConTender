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
import {Decryptor} from './ency.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Databases(){
useEffect(() => {
	  $.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:"alltends"},success(data){
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="";
		  var opt="<option>select tender</option>";
		  for(let i=0;i<obj.length;i++)
		  {
			  table += "<tr><th>" +  (i+1) +". " +obj[i]['title'] + "</th></tr><tr><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/>";
			  if(obj[i]['winner']=="")
			  {
				  table+= "Result : TBD";
			  }
			  else
			  {
				  table+= "Result : Won By - " + obj[i]['winner'];
			  }
			  table+="<br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr><br/>";
		  opt+="<option value='"+obj[i]['tid']+"' >"+obj[i]['title']+"</option>";
		  }
		  document.getElementById('tenders').innerHTML=table;
		  document.getElementById('tenderlist').innerHTML=opt;
	  }
	  });
	  $.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:"usrs"},success(data){
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="<tr><th>uid</th><th>uname</th><th>company</th><th>email</th><th>phone</th><th>city</th><th>state</th><th>role</th>";
		  var opt="<option>select user</option>";
          for(let i=0;i<obj.length;i++)
		  {
			  table+="<tr><td>"+obj[i]['uid']+"</td><td>"+obj[i]['uname']+"</td><td>"+obj[i]['company']+"</td><td>"+obj[i]['email']+"</td><td>"+obj[i]['phone']+"</td><td>"+obj[i]['city']+"</td><td>"+obj[i]['state']+"</td><td>"+obj[i]['role']+"</td></tr>";
			  opt+="<option>"+obj[i]['company']+"</option>";
		  }
		  document.getElementById('users').innerHTML=table;
		  document.getElementById('userlist').innerHTML=opt;
		  
	  }});
	  $.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:"allbids"},success(data){
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="<tr><th>Bid Id</th><th>Tender Id</th><th>Bidder</th><th>email</th><th>phone</th><th>catagory</th><th>location</th><th>bid doc</th><th>dob</th></tr>";
          for(let i=0;i<obj.length;i++)
		  {
			  table+="<tr><td>"+obj[i]['bid_id']+"</td><td>"+obj[i]['tid']+"</td><td>"+obj[i]['bidder']+"</td><td>"+obj[i]['email']+"</td><td>"+obj[i]['phone']+"</td><td>"+obj[i]['catagory']+"</td><td>"+obj[i]['location']+"</td><td>"+obj[i]['bid_doc']+"</td><td>"+obj[i]['dob']+"</td></tr>";
		  }
		  document.getElementById('bids').innerHTML=table;
	  }});
});
const getdata1=()=>{
	var usr = document.getElementById('userlist').value;
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{usr:usr,datafor:"portfol"},success(data){
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="<tr><th>Sr.</th><th>tid</th><th>tender</th><th>status</th><th>user</th><th>view</th></tr>";
		  for(let i=0;i<obj.length;i++)
		  {
			  table += "<tr><td>"+(i+1)+"</td><td>"+obj[i]['tid']+"</td><td>"+obj[i]['tname']+"</td><td>"+obj[i]['stat']+"</td><td>"+obj[i]['user']+"</td><td><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a></td></tr>";
		  }
		  document.getElementById('ports').innerHTML=table;
	  }
	  });
}
const getdata2=()=>{
	var tid = document.getElementById('tenderlist').value;
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/probpart.php",
		data: {tid:tid,act:"get"},
		success(data2){
			var obj2 = JSON.parse(data2);
			var tab="<tr><th>Tender Id</th><th>Probable Participants</th></tr>";
			for(let i=0;i<obj2.length;i++)
		   {
			   tab += "<tr><td>"+obj2[i]['tid']+"</td><td>"+obj2[i]['probprc']+"</td></tr>"
		   }
		   document.getElementById('parts').innerHTML=tab;
		   
	}}); 
}
return(
<>
<div align="center">
<h1> Databases </h1>
<Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
<Tab eventKey="users" title="Users">
<h3>Users table</h3>
<Table bordered striped id="users" style={{width:"60rem"}}>
</Table>
</Tab>
<Tab eventKey="tenders" title="Tenders">
<h3>Tenders table</h3>
<Table id="tenders" style={{width:"60rem"}}>
</Table>  
</Tab>
<Tab eventKey="bids" title="Bids">
<h3>Bids table</h3>
<Table bordered striped id="bids" style={{width:"60rem"}}>
</Table>  
</Tab>
<Tab eventKey="portfolio" title="Portfolios">
<h3>Portfolios table</h3>
Select User:
<Form.Select id="userlist" onChange={getdata1} style={{width:"20rem"}}>
</Form.Select>
<br/>
<Table bordered striped id="ports" style={{width:"60rem"}}>
</Table> 
</Tab>
<Tab eventKey="probs" title="Participants">
<h3>Participants table</h3>
Select Tender:<Form.Select id="tenderlist" onChange={getdata2} style={{width:"20rem"}}>
</Form.Select>
<br/>
<Table bordered striped id="parts" style={{width:"60rem"}}>
</Table> 
</Tab>
</Tabs>
</div>
</>
);
}
export default Databases;