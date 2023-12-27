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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function CustomQuery(){
	const exeQuery=(qry,typ)=>{
	$.ajax({type:"POST",url:"http://localhost/php/executioner.php",data:{sql:qry,type:typ},success(data){
		if(typ=="upd"||typ=="del" ||typ=="ins"){
			var obj = JSON.parse(data);
			if(obj.es == "success"){
				document.getElementById("op").innerHTML=obj.res;
			}
			else{
				 document.getElementById("op").innerHTML=obj.res;
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
const SelC=()=>{
	var sql = document.getElementById('sbuild').value;
	if(sql.indexOf(';')!=-1){
	sql=sql.slice(0,sql.indexOf(';'));
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else if(sql.toLowerCase().indexOf("update") != -1){
		exeQuery(sql,"upd");
	}
	else if(sql.toLowerCase().indexOf("delete") != -1 && (sql.toLowerCase().indexOf("where 1")==-1 || sql.toLowerCase().indexOf("1=1")==-1)){
	   exeQuery(sql,"del");
	 }
	 else if(sql.toLowerCase().indexOf("insert") != -1){
	   exeQuery(sql,"ins");
	}
	}
	else if(sql.toLowerCase.indexOf('union')!=-1){
		sql=sql.slice(0,sql.toLowerCase.indexOf('union'));
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else if(sql.toLowerCase().indexOf("update") != -1){
		exeQuery(sql,"upd");
	}
	else if(sql.toLowerCase().indexOf("delete") != -1 && (sql.toLowerCase().indexOf("where 1")==-1 || sql.toLowerCase().indexOf("1=1")==-1)){
	   exeQuery(sql,"del");
	 }
	 else if(sql.toLowerCase().indexOf("insert") != -1){
	   exeQuery(sql,"ins");
	}
	}
	else{
		if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else if(sql.toLowerCase().indexOf("update") != -1){
		exeQuery(sql,"upd");
	}
	else if(sql.toLowerCase().indexOf("delete") != -1 && (sql.toLowerCase().indexOf("where 1")==-1 || sql.toLowerCase().indexOf("1=1")==-1)){
	   exeQuery(sql,"del");
	 }
	 else if(sql.toLowerCase().indexOf("insert") != -1){
	   exeQuery(sql,"ins");
	}	
	}
}
return(
<>
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'105rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<h4 className="display-4" align="center">CustomReports</h4>
<Form.Control as="textarea" id="sbuild" placeholder="Write Your Select Query Here..." rows={5}/>
<br/>
<Button variant="dark" onClick={SelC}> Execute </Button>
<br/>
<br/>
<Table responsive bordered striped id="op" style={{width:"30rem"}}></Table>
</Container>
</>
);
}
export default CustomQuery;