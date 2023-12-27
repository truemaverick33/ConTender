import React from 'react';
import {useState,useEffect} from 'react';
import $ from 'jquery'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import locat from './icons/location.png';
import wap from './icons/whatsapp-48.png';
import gmail from './icons/gmail-48.png';
import docm from './icons/document-48.png';
import lock from './icons/lock-26.png';
import crown from './icons/crown-48.png';
import trash from './icons/trash-48.gif';
import Badge from 'react-bootstrap/Badge';
import {Decryptor} from './ency.js';

function Viewdetails()
{
var [isProb,setProb] = useState(false); 
var [isBidded,setBidded] = useState(false); 
var [isOwn,setOwn] = useState(false);
var [isPaid,setPaid] = useState(false);
var [isExp,setExp] = useState(false);
var [isWon,setWon] = useState(false);
var [doclink,setDoc] = useState("");
var [doc,setDc] = useState("");
var [uname,setUname] = useState("");
useEffect(() => {
	document.getElementById('dustbin').style.display = "none";
	let currentDate = new Date();
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'details',tid:tid},success(data){
		  var obj = JSON.parse(data);
		  document.getElementById('title').innerHTML = obj[0]['title'];
		  document.getElementById('subt').innerHTML = "("+obj[0]['company']+")";
		  document.getElementById('reqm').innerHTML = "Requirements: "+obj[0]['descr'];
		  document.getElementById('val').innerHTML = obj[0]['tvalue'];
		  document.getElementById('cat').innerHTML = obj[0]['catagory'];
		  document.getElementById('loc').innerHTML =obj[0]['location'];
		  setUname(obj[0]['company']);
		  setDoc("http://localhost/php/download.php?folder=tenders&file="+obj[0]['tender']);
		  setDc(obj[0]['tender']);
		  var ct = currentDate.getTime(); 
		  var exd = new Date(obj[0]['expd']);
		  var et = exd.getTime();
		  var left = Math.ceil((et-ct)/(1000 * 60 * 60 * 24));
		  if(left>0){
		  document.getElementById('bdg1').innerHTML = left + " days left";
		  }
		  else{
		  document.getElementById('bdg1').innerHTML = "Expired";
		  setExp(true);
		  /*document.getElementById('Bid').style.display = "none";
		  document.getElementById('locked').style.display = "none";
		  document.getElementById('avail').style.display = "none";*/
		  }
		  if(obj[0]['company']===Decryptor(localStorage.getItem('cny')))
		  {
			  setOwn(true);
		  }
		  if(obj[0]['winner']!="")
		  {
			  setWon(true);
			  document.getElementById('bdg1').innerHTML = "Declared";
			  document.getElementById('wonby').innerHTML = obj[0]['winner'];
		  }
		  else{document.getElementById('wonby').innerHTML = "TBD";}
	  }
	  });
	 $.ajax({ type:"POST" ,
		url: "http://localhost/php/probpart.php",
		data: {tid:tid,act:"get"},
		success(data2){
			var obj2 = JSON.parse(data2);
			var tab="<tr><th>Probable Participants</th></tr>";
			for(let i=0;i<obj2.length;i++)
		   {
			   tab += "<tr><td>"+obj2[i]['probprc']+"</td></tr>"
			   if(Decryptor(localStorage.getItem('cny')) === obj2[i]['probprc'])
			   {
				   setProb(true);
			   }
		   }
		   document.getElementById('pp').innerHTML=tab;
		   
	}}); 
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/fetchtd.php",
		data: {datafor:"bids",tid:tid},
		success(data2){
			var obj2 = JSON.parse(data2);
			const imgFold = require.context('./icons',true);
			var tab="<tr><th>Bids</th><th>contacts</th><th>Bid</th></tr>";
			var opt=""
			for(let i=0;i<obj2.length;i++)
		   {
		   tab += "<tr><td>"+obj2[i]['bidder']+"</td><td><a href='https://wa.me/"+obj2[i]['phone']+"'><img src="+imgFold(`./whatsapp-48.png`)+" height='24' width='24'/></a>&nbsp;&nbsp;&nbsp;<a href='mailto:"+obj2[i]['email']+"'><img src="+imgFold(`./gmail-48.png`)+" height='24' width='24'/></a>&nbsp;&nbsp;&nbsp;<a href='tel:"+obj2[i]['phone']+"'><img src="+imgFold(`./call-48.png`)+" height='24' width='24'/></a></td><td><a href='http://localhost/php/download.php?folder=bids&file="+obj2[i]['bid_doc']+"'><img src="+imgFold(`./document-48.png`)+" height='24' width='24'/></a></td></tr>";
		   opt += "<option>"+obj2[i]['bidder']+"</option>";
		   }
		   document.getElementById('bids').innerHTML=tab;
		   document.getElementById('winner').innerHTML=opt;
		   
	}});
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/fetchtd.php",
		data: {tid:tid,datafor:"paym"},
		success(data2){
			var obj2 = JSON.parse(data2);
			for(let i=0;i<obj2.length;i++)
		   {
			   if(obj2[i]['stat']==="Paid" && obj2[i]['user']===Decryptor(localStorage.getItem('cny')))
			   {
				   setPaid(true);
				   break;
			   }
			   else if(obj2[i]['stat']==="Bidded" && obj2[i]['user']===Decryptor(localStorage.getItem('cny')))
			   {
				   setBidded(true);
				   break;
			   }
		   }
	}}); 
	if(localStorage.getItem('role')=="mod"){
		document.getElementById('Bid').style.display = "none";
		document.getElementById('own').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "none";
		document.getElementById('dustbin').style.display = "none";
	}
	if(isProb==true && isPaid==false)
	{
		document.getElementById('Bid').style.display = "none";
		document.getElementById('own').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "none";
	    document.getElementById('locked').style.display = "";
	    document.getElementById('expired').style.display = "none";
		document.getElementById('dustbin').style.display = "none";
		
	}
	if(isPaid==true)
	{
		document.getElementById('Bid').style.display = "";
		document.getElementById('own').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "none";
	}
	if(isOwn==true)
	{
		document.getElementById('Bid').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('own').style.display = "";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "none";
	}
	if(isExp==true)
	{
		document.getElementById('Bid').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('own').style.display = "none";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "none";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "";
	}
	if(isBidded==true)
	{
		document.getElementById('Bid').style.display = "none";
		document.getElementById('afterbid').style.display = "";
		document.getElementById('own').style.display = "none";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "none";
	}
	if(isPaid==false && isOwn==false && isExp==false &&isProb==false && localStorage.getItem('role')!="mod"){
		document.getElementById('Bid').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('own').style.display = "none";
		document.getElementById('EOI').style.display = "";
		document.getElementById('locked').style.display = "";
		document.getElementById('avail').style.display = "none";
		document.getElementById('expired').style.display = "none";
	}
	if(isWon==true && isOwn==false)
	{
		document.getElementById('Bid').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('own').style.display = "none";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "none";
	}
	if(isWon==true && isOwn==true)
	{
		document.getElementById('Bid').style.display = "none";
		document.getElementById('afterbid').style.display = "none";
		document.getElementById('own').style.display = "";
		document.getElementById('EOI').style.display = "none";
		document.getElementById('avail').style.display = "";
	    document.getElementById('locked').style.display = "none";
	    document.getElementById('expired').style.display = "none";
	    document.getElementById('dwin').style.display = "none";
	    document.getElementById('winner').style.display = "none";
	}
},[isPaid,isProb,isOwn,isBidded,isExp,isWon,doclink,uname]);
const addPP = () =>
{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	var pp = Decryptor(localStorage.getItem("cny"));
	var tname = document.getElementById('title').innerHTML;
	var tcm = document.getElementById('subt').innerHTML;
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/probpart.php",
		data: {tid:tid,pp:pp,tcm:uname,tname:tname,act:"set"},
		success(data){
			if(data==="success"){
			window.location.reload();}
	}});
}
const addBid = () =>{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	window.location.href = "http://localhost:3000/addBid?tid="+tid;
}
const MakePayment = () =>{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	window.location.href = "paygay?tid="+tid;
}
const updateBid = () =>{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	window.location.href = "http://localhost:3000/updateBid?tid="+tid;
}
const deleteBid = () =>{
	console.log("inside back");
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	var pp = Decryptor(localStorage.getItem("cny"));
	var town = document.getElementById('subt').innerHTML;
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/delbid.php",
		data: {tid:tid,pp:pp,town:town},
		success(data){
			window.location.reload();
	}});
}
const declare = () =>{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	var winner = document.getElementById('winner').value;
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/declareWin.php",
		data: {tid:tid,win:winner},
		success(data){
			if(data==="success"){
			window.location.reload();}
	}});
}
const allowDrop = (ev) => {
  ev.preventDefault();
}
const drag = (ev) => {
  console.log("dragged");
  if(isOwn==true){
  document.getElementById('dustbin').style.display = "";}
}
const dragnot = (ev) => {
  console.log("dragging stopped");
  document.getElementById('dustbin').style.display = "none";
}
const drop = (ev) => {
	console.log("dropped");
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var tid = params.get('tid');
	console.log(doc);
	$.ajax({ type:"POST" ,
		url: "http://localhost/php/deleteTd.php",
		data: {tid:tid,file:doc},
		success(data){
			if(data==="success"){
			window.location.href = "alltend";}
	}});
}
const clsAlt1=()=>{
	document.getElementById('abt1').style.display="none";
}
return(
<>
<div align="center">
<br/>
<h1 align="center">Tender Details</h1>
<Alert variant="warning" id="abt1" align="left" dismissible onClose={clsAlt1}>
<Alert.Heading>*Note :</Alert.Heading>
     Tender Owners Can drag the Tender and drop it into visible Dustbin
	 to delete the Tender.
</Alert>
<div align="center" id="dustbin" onDrop={(event)=>{drop(event)}} onDragOver={(event)=>{allowDrop(event)}}><img src={trash} height="40" width="40"/></div>
<br/>
<br/>
<div style={{width:"75rem",height:"65rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"50%"}}>
<div style={{width:"65rem",height:"60rem",background:"white",borderRadius:"50%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
 <Card style={{width:"50rem",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} draggable="true" onDragStart={(event)=>{drag(event)}} onDragLeave={(event)=>{dragnot(event)}}>
      <Card.Body>
        <Card.Title id="title"></Card.Title>
		<Card.Subtitle id="subt"></Card.Subtitle>
		<hr/>
		<br/>
		<Table>
		<tbody>
		<tr>
		<td>
        <Card.Text id="reqm" align="left">
        </Card.Text>
		<tr><td>
		Location : <img src={locat} width="18" height="18"/></td><td><Card.Text id="loc"></Card.Text></td>
		</tr>
		<br/>
		<tr>
		<td>Catagory : </td>
		<td>
		<Badge bg="secondary" id="cat"></Badge></td>
		</tr>
		<br/>
		<h3><Badge bg="danger" id="bdg1"></Badge></h3>
		<br/><br/>
		<Table bordered id="pp">
		</Table>
		<div id="afterwin">
		<Card style={{ width: '35rem'}} align="center">
		<Card.Title> Result </Card.Title>
		<hr/>
		<b><Card.Text><table><tr><td><img src={crown}/></td><td><h1>-</h1></td><td><h1 id="wonby"></h1></td></tr></table></Card.Text></b>
		</Card>
		</div>
		<br/>
		<div id="own">
		<Table bordered id="bids">
		</Table>
		<Form.Select id="winner"></Form.Select>
		<br/>
		<Button variant="warning" onClick={declare} id="dwin">Declare Winner</Button>
		</div>
		</td>
		<td>
		<Card style={{ width: '10rem'}} align="center">
		<Card.Title> Tender Value: </Card.Title>
		<hr/>
		<b><Card.Text><h1 id="val"></h1></Card.Text></b>
		</Card>
		<br/><br/>
		<Card style={{ width: '10rem'}} align="center">
		<Card.Title> Document: </Card.Title>
		<hr/>
	    <Card.Text id="avail"><a href={doclink} download><img src={docm}/></a></Card.Text>
		<Card.Text id="expired"><h3><Badge bg="secondary">Expired</Badge></h3></Card.Text>
		<Card.Text id="locked" align="center"><img src={lock} height="48" width="48"/><br/><br/><Button variant="success" onClick={MakePayment}>Pay to Unlock</Button></Card.Text>
		<br/>
		</Card>
		</td>
		</tr>
		</tbody>
		</Table>
        <Button variant="warning" onClick={addPP} id="EOI">EOI</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="warning" onClick={addBid} id="Bid">Bid</Button>
		<div id="afterbid">
		<Button variant="warning" onClick={updateBid} id="EOI">Re-consider</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="warning" onClick={deleteBid} id="Bid">Back off</Button>
		</div>
      </Card.Body>
</Card>
</div>
<br/>
</div>
<br/>
<br/>
</div>
</>
);
}
export default Viewdetails;