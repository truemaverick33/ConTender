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

function Reports(){
useEffect(()=>{
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'reports'},success(data){
		  try{
		  var obj = JSON.parse(data);
		  var table="<tr><th>sr</th><th>report</th><th>type</th><th>by</th></tr>";
		  for(let i=0;i<obj.length;i++)
		  {
			  table+="<tr><td>"+(i+1)+"</th><td>"+obj[i]['rstatement']+"</td><td>"+obj[i]['rconcern']+"</td><td>"+obj[i]['rby']+"</td></tr>";
		  }
		  document.getElementById('t1').innerHTML=table;
		  }
		  catch{
			 console.log("no reports"); 
		  }
		  
	}});
});
return(
<>
<div align="center">
<h1> Reports </h1>
<Table id="t1">
</Table>
</div>
</>
);
}
export default Reports;