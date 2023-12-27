import React from 'react';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import searchicon from './icons/search-30.png';
import Form from 'react-bootstrap/Form';

function SearchResults()
{
var [dataset,setData] = useState({});
useEffect(()=>{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
	var sq = params.get('sq');
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'searches',sq:sq},success(data){
		  try{
		  var obj = JSON.parse(data);
		  var table="";
		  for(let i=0;i<obj.length;i++)
		  {
			 table += "<tr align='center'><th>" +(i+1)+". " +obj[i]['title'] + "</th></tr><tr align='center'><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr>";
		  }
		  document.getElementById('t3').innerHTML=table;
		  document.getElementById('srf').innerHTML="Showing Results For: "+sq;
		  }
		  catch{
			  document.getElementById('srf').innerHTML="Showing Results For: "+sq;
			  document.getElementById('t3').innerHTML= "No Results Found..";
		  }
		  
	}});
	
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
<h1>Search</h1>
<hr/>
<InputGroup className="mb-3" style={{width:"52rem"}} onMouseLeave={hideSearch}>
<Form.Control type="text" id="ser" placeholder="Search" onFocus={showSearch} onChange={search}/>
<Button variant="dark" onClick={srch}><img src={searchicon} height="25" width="25"/></Button>
<div id="searchres" style={{width:"52rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3",display:"none",overflowX:"hidden",overflowY:"auto"}} onMouseEnter={showSearch} onMouseLeave={hideSearch}>
</div>
</InputGroup>
<br/>
<h5 id="srf"></h5>
<br/>
<Container>
<Table bordered striped id="t3">
</Table>
</Container>
</div>
</>
);
}
export default SearchResults;