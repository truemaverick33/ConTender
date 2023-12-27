import React from 'react';
import Table from 'react-bootstrap/Table';
import {useState,useEffect} from 'react';
import $ from 'jquery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Decryptor} from './ency.js';

function AllNots()
{
useEffect(() => {
	var name = Decryptor(localStorage.getItem("un"));
	var company = Decryptor(localStorage.getItem("cny"));
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'notifs',uname:name,cny:company},success(data){
		  var obj = JSON.parse(data);
		  var currentDate = new Date();
		  //console.log(obj);
		  var table="";
		  const imgFold = require.context('./icons',true);
		  for(let i=0;i<obj.length;i++)
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
			 table += "<tr style='height:75px'><td><img src="+imgFold(`./${obj[i]['ico']}`)+" height='48' width='48' /></td><td>"+obj[i]['notif']+"</td><td>"+str+"</td></tr>";
		  }
		  document.getElementById('nots').innerHTML = table;
	}});
	});
return(
<>
<div align="center">
<h1>All Notifications</h1>
<br/>
<br/>
<Container>
<Row>
<Col md={1}></Col>
<Col>
<Table id="nots">
</Table>
</Col>
<Col md={1}></Col>
</Row>
</Container>
</div>
</>
);
}

export default AllNots;