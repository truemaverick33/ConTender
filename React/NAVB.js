import React from 'react';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import Alltend from "./alltend";
import MyTends from "./mytends";
import Portfolio from "./portfolio";
import UploadTend from './upload.js';
import Reg from './register.js';
import Login from './login.js';
import AddBid from './AddBid.js';
import Viewdetails from './viewdetails.js';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Decryptor} from './ency.js';
import notif from './icons/notif.png';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import down from './icons/down.gif';
import msg from './icons/msg-50.png';
import AllNots from './allnots.js';
import Profile from './userprof.js';
import SearchResults from './searches.js';
import PayGateway from './paygay.js';
import Dashboard from './dashboard.js';
import Reports from './reports.js';
import Action from './actions.js';
import Divert from './diversion.js';
import Databases from './dbs.js';
import HelpDesk from './helpdesk.js';
import UpdateBid from './updbid.js';
import Notify from './notify.js';



function NAVB()
{
var [name,setName] = useState("");
var [cny,setCny] = useState("");
var [noti,setNoti] = useState("");
const [show, setShow] = useState(false);
const handleClose = () => {
	setShow(false);
}
const handleShow = () => {
	setShow(true);
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'notifs',uname:name,cny:cny},success(data){
		  var obj = JSON.parse(data);
		  var currentDate = new Date();
		  //console.log(obj);
		  var table="";
		  const imgFold = require.context('./icons',true);
		  var x=0;
		  if(obj.length>=6){
			  x=6
		  }
		  else{
			 x=obj.length;
		  }
		  for(let i=0;i<x;i++)
		  {
		  var ct = currentDate.getTime(); 
		  var exd = new Date(obj[i]['tstamp']);
		  var et = exd.getTime();
		  var lefts = Math.floor((ct-et)/1000);
		  var leftm = Math.floor((ct-et)/(1000*60));
          var lefth = Math.floor((ct-et)/(1000*60*60));
		  var leftd = Math.floor((ct-et)/(1000*60*60*24));
		  var str = "";
		  if(lefts < 60)
		  {
			  str = " "+lefts+" sec ago";
		  }
          else{
		  if(leftm < 60)
		  {
			  str = " "+leftm+" min ago";
		  }
		  else{
			  if(lefth < 24)
		  {
			  str = " "+lefth+" hr ago";
		  }
		  else{
			  str = " "+leftd+" days ago";
		  }
		  }
		  }
			 table += "<tr><td><img src="+imgFold(`./${obj[i]['ico']}`)+" height='24' width='24' /></td><td>"+obj[i]['notif']+str+"</td></tr>";
		  }
		  document.getElementById('notifs').innerHTML = table;
		  var datestr = currentDate.getFullYear()+"-0"+(currentDate.getMonth()+1)+"-"+currentDate.getDate()+" "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
          localStorage.setItem("lastcheck",datestr);
          setNoti(0);		
          localStorage.setItem("notifs",0);		  
	   }
	  });	
}
const interval = setInterval(() => {
  $.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'notifs',uname:name,cny:cny},success(data2){
		  try{
		  var obj2 = JSON.parse(data2);
		  var x = 0;
		  for(let i=0;i<obj2.length;i++){
		  var ndate = new Date(obj2[i]['tstamp']);
		  var ldate = new Date(localStorage.getItem("lastcheck"));
		  if(ndate>ldate)
		  {
			  x++;
		  }
		  }
		  localStorage.setItem("notifs",x);}
		  catch{
			localStorage.setItem("notifs",0); 
		  }
	}});
	setNoti(localStorage.getItem("notifs"));
}, 2000);
useEffect(() => {
	if(localStorage.getItem("logstatus")==="true"){
		if(localStorage.getItem("role")==="mod"){
			document.getElementById('normal').style.display = "none";
			document.getElementById('mod').style.display = "";
		}
		else{
			document.getElementById('normal').style.display = "";
			document.getElementById('mod').style.display = "none"; 
		}
	  document.getElementById('anonym').style.display = "none";
	  document.getElementById('logged').style.display = "";
	  setName(Decryptor(localStorage.getItem('un')));
	  setCny(Decryptor(localStorage.getItem('cny')));
	}
    else
	{
      document.getElementById('anonym').style.display = "";
	  document.getElementById('logged').style.display = "none";
	  document.getElementById('mod').style.display = "none";
	}	
	},[name,noti]);
const logout = () =>{
	 var uid = Decryptor(localStorage.getItem('uid'));
	 var lc = localStorage.getItem('lastcheck')
	 var notifs = localStorage.getItem('notifs')
	$.ajax({type:"POST",url:"http://localhost/php/savestate.php",data:{notifs:notifs,lc:lc,uid:uid},success(data){
		localStorage.setItem("response",data);
		if(data=="success"){
		    localStorage.removeItem("uid");
			localStorage.removeItem("un");
			localStorage.removeItem("cny");
			localStorage.removeItem("eml");
			localStorage.removeItem("pne");
			localStorage.removeItem("cty");
			localStorage.removeItem("ste");
			localStorage.removeItem("lastcheck");
			localStorage.removeItem("notifs");
			localStorage.removeItem("role");
		localStorage.setItem("logstatus","false");}
		console.log(data);
	}});
	        
}

return(
<Router>
<Navbar bg="warning" variant="dark" id="nb">
        <Container>
<Navbar.Brand href="home" style={{color:"#FFE8D4"}}><h1>ConTender</h1></Navbar.Brand>
          <Nav className="me-auto" id="normal">
            <Nav.Link href="home" >Home</Nav.Link>
            <Nav.Link href="alltend" >All Tenders</Nav.Link>
			<Nav.Link href="portfolio" id="mport" >My Portfolio</Nav.Link>
			<Nav.Link href="mytenders" id="mtends">My Tenders</Nav.Link>
			<Nav.Link href="notify">MesseFication<img src={msg} height='30' width='30'/></Nav.Link>
          </Nav>
		  <Nav className="me-auto" id="mod">
            <Nav.Link href="dashboard" >Dashboard</Nav.Link>
            <Nav.Link href="reports" >Reports</Nav.Link>
			<Nav.Link href="action">Action</Nav.Link>
			<Nav.Link href="dbs">Databases</Nav.Link>
          </Nav>
		  <Nav className="ms-auto" id="anonym">
		  <Nav.Link href="login" className="ms-auto" id="Log">Login</Nav.Link>
		  <Nav.Link href="register" className="ms-auto" id="Reg">Register</Nav.Link>
		  </Nav>
		  <Nav className="ms-auto" id="logged">
		  <Nav.Link onClick={handleShow}><Badge pill bg="danger">{noti==0?"":noti}</Badge><img src={notif} height='20' width='20'/></Nav.Link>
		  <NavDropdown title={name}>
		  <Nav.Link href="profile" id="Profile" style={{color:"black"}} >Profile</Nav.Link>
			  {localStorage.getItem('role')==""?<Nav.Link href="helpdesk" style={{color:"black"}}>Help Desk</Nav.Link>:""}
		  <hr/>
		  <Nav.Link href="home" id="Logout" onClick={logout} style={{color:"black"}}>Logout</Nav.Link>
		  </NavDropdown>
		  </Nav>
        </Container>
      </Navbar>
	  <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Table id="notifs"></Table>
		<div align="center"><a href="allnotifs" style={{color:"black"}}>View All</a><br/><img src={down} height="24" width="24"/></div>
      </Offcanvas>
	  
<Routes>
<Route exact path="/home" element={<App />} /> 
<Route path="/" element={<Divert />} /> 
<Route path="/alltend" element={<Alltend />} /> 
<Route path="/portfolio" element={<Portfolio />} /> 
<Route path="/mytenders" element={<MyTends />} /> 
<Route path="/upload" element={<UploadTend />} /> 
<Route path="/login" element={<Login />} /> 
<Route path="/register" element={<Reg />} /> 
<Route path="/profile" element={<Profile />} /> 
<Route path="/allnotifs" element={<AllNots />} /> 
<Route path="/viewdetails" element={<Viewdetails />} /> 
<Route path="/paygay" element={<PayGateway />} /> 
<Route path="/addBid" element={<AddBid />} /> 
<Route path="/searches" element={<SearchResults />} /> 
<Route path="/dashboard" element={<Dashboard />} /> 
<Route path="/reports" element={<Reports />} /> 
<Route path="/action" element={<Action />} /> 
<Route path="/dbs" element={<Databases />} /> 
<Route path="/helpdesk" element={<HelpDesk />} /> 
<Route path="/updatebid" element={<UpdateBid />} /> 
<Route path="/notify" element={<Notify />} /> 

 
</Routes>
</Router>
);
}

export default NAVB;
