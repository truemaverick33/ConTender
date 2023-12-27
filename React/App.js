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


function App()
{
var [dataset,setData] = useState({});
useEffect(()=>{
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'latest'},success(data){
		  var obj = JSON.parse(data);
		  var table="";
		  var x = 0;
		  if(obj.length < 5){
		  x = obj.length;}
		  else
		  {
			  x = 5;
		  }
		  for(let i=0;i<x;i++)
		  {
			 table = "<tr align='center'><th>" +(i+1)+". " +obj[i]['title'] + "</th></tr><tr align='center'><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr>";
			 document.getElementById('t1'+i).innerHTML=table;
		  }
		  
	}});
/*	*/
	if(localStorage.getItem("logstatus")==="true"){
	var loc = Decryptor(localStorage.getItem("ste"));
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'locate',loc:loc},success(data){
		  try{
		  var obj = JSON.parse(data);
		  var table="";
		  var x = 0;
		  if(obj.length < 5){
		  x = obj.length;}
		  else
		  {
			  x = 5;
		  }
		  for(let i=0;i<x;i++)
		  {
			 table = "<tr align='center'><th>" +(i+1)+". " +obj[i]['title'] + "</th></tr><tr align='center'><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr>";
			 document.getElementById('t2'+i).innerHTML=table;
		  }
		  }
		  catch{
			var table="<br/><br/><h3 align='center'>No data found</h3><br/><br/><br/><br/>";  
			for(let i=0;i<5;i++)
		  {
			  document.getElementById('t2'+i).innerHTML=table;
		  } 
		  }
		  
	}});
	}
	if(localStorage.getItem("logstatus")==="true"){
	var cny = Decryptor(localStorage.getItem("cny"));
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'pref',uname:cny},success(data){
		  try{
		  var obj = JSON.parse(data);
		  var table="";
		  for(let i=0;i<obj.length;i++)
		  {
			 table = "<tr align='center'><th>" +(i+1)+". " +obj[i]['title'] + "</th></tr><tr align='center'><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr>";
			 document.getElementById('t3'+i).innerHTML=table;
		  }
		  }
		  catch{
			var table="<br/><br/><h3 align='center'>No data found</h3><br/><br/><br/><br/>";  
			for(let i=0;i<5;i++)
		  {
			  document.getElementById('t3'+i).innerHTML=table;
		  } 
		  }
		  
	}});
	}
});
const GetshowSearch=()=>{
	document.getElementById('searchres').style.display="";
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'alltends'},success(data){
		  var obj = JSON.parse(data);
		  setData(obj);
	}});
}
const showSearch=()=>{
	document.getElementById('searchres').style.display="";
}
const hideSearch=()=>{
	document.getElementById('searchres').style.display="none";
}
const srch=()=>{
	var srs=document.getElementById('ser').value;
	window.location.href="http://localhost:3000/searches?sq="+srs;
}
const search=()=>{
	var srs=document.getElementById('ser').value;
	var res="";
	document.getElementById('searchres').style.display="";
	for(let i=0;i<dataset.length;i++){
		if(srs.toLowerCase() == dataset[i]['title'].toLowerCase() && res.indexOf(dataset[i]['title'])==-1){
			res += "<a href='http://localhost:3000/searches?sq="+dataset[i]['title']+"'>"+dataset[i]['title']+"</a><br/>";
		}
		else if(srs.toLowerCase() == dataset[i]['catagory'].toLowerCase() && res.indexOf(dataset[i]['catagory'])==-1){
			res += "<a href='http://localhost:3000/searches?sq="+dataset[i]['catagory']+"'>"+dataset[i]['catagory']+"</a><br/>";
		}
		else if(srs.toLowerCase() == dataset[i]['company'].toLowerCase() && res.indexOf(dataset[i]['company'])==-1){
			res += "<a href='http://localhost:3000/searches?sq="+dataset[i]['company']+"'>"+dataset[i]['company']+"</a><br/>";
		}
		else if(dataset[i]['title'].toLowerCase().indexOf(srs.toLowerCase())!=-1 && res.indexOf(dataset[i]['title'])==-1)
		{
			res += "<a href='http://localhost:3000/searches?sq="+dataset[i]['title']+"'>"+dataset[i]['title']+"</a><br/>";
		}
		else if(dataset[i]['catagory'].toLowerCase().indexOf(srs.toLowerCase())!=-1 && res.indexOf(dataset[i]['catagory'])==-1){
			res += "<a href='http://localhost:3000/searches?sq="+dataset[i]['catagory']+"'>"+dataset[i]['catagory']+"</a><br/>";
		}
		else if(dataset[i]['company'].toLowerCase().indexOf(srs.toLowerCase())!=-1 && res.indexOf(dataset[i]['company'])==-1)
		{
            res += "<a href='http://localhost:3000/searches?sq="+dataset[i]['company']+"'>"+dataset[i]['company']+"</a><br/>";
		}	
		
	}
	document.getElementById('searchres').innerHTML=res;
	
}
return(
<>
<div align="center">
<h1>Homepage</h1>
<br/>
<br/>
<InputGroup className="mb-3" style={{width:"52rem"}} onMouseLeave={hideSearch}>
<Form.Control type="text" id="ser" placeholder="Search" onFocus={GetshowSearch} onChange={search}/>
<Button variant="dark" onClick={srch}><img src={searchicon} height="25" width="25"/></Button>
<div id="searchres" style={{width:"52rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3",display:"none",overflowX:"hidden",overflowY:"auto"}} onMouseEnter={showSearch} onMouseLeave={hideSearch}>
</div>
</InputGroup>
<br/>
<br/>
<div style={{width:"50rem",height:"25rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",height:"22rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<h2>Latest Tenders</h2>
<Carousel variant="dark">
<Carousel.Item><Table id="t10" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t11" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t12" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t13" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t14" variant="light"></Table><br/></Carousel.Item>
</Carousel>
<br/>
</div>
<br/>
</div>
</div>
<br/><br/>
<div style={{width:"50rem",height:"25rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",height:"22rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<h2>Tenders From Your Location</h2>
<Carousel variant="dark">
<Carousel.Item><Table id="t20" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t21" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t22" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t23" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t24" variant="light"></Table><br/></Carousel.Item>
</Carousel>
</div>
</div>
</div>
<br/><br/>
<div style={{width:"50rem",height:"25rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",height:"22rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<h3>Tenders From Your Preffered Catagories</h3>
<Carousel variant="dark">
<Carousel.Item><Table id="t30" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t31" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t32" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t33" variant="light"></Table><br/></Carousel.Item>
<Carousel.Item><Table id="t34" variant="light"></Table><br/></Carousel.Item>
</Carousel>
</div>
</div>
</div>
</div>
</>
);
}

export default App;