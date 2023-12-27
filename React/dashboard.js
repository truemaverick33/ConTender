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
import Card from 'react-bootstrap/Card';
import {Decryptor} from './ency.js';
import Plotly from 'plotly.js/dist/plotly-cartesian';

var months = ["jan","feb","mar","apr","may","june","jul","aug","sep","oct","nov","dec"];
var tenders = [0,0,0,0,0,0,0,0,0,0,0,0];
function Dashboard(){
useEffect(()=>{
var div1 = document.getElementById('plot1');
var div2 = document.getElementById('plot2');
var div3 = document.getElementById('plot3');

$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'dash1'},success(data1){
		  var obj = JSON.parse(data1);
		  for(let i=0;i<obj.length;i++)
		  {
			if(obj[i]['mon']=="1"){
				tenders[0]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="2"){
				tenders[1]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="3"){
				tenders[2]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="4"){
				tenders[3]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="5"){
				tenders[4]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="6"){
				tenders[5]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="7"){
				tenders[6]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="8"){
				tenders[7]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="9"){
				tenders[8]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="10"){
				tenders[9]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="11"){
				tenders[10]=parseInt(obj[i]['total']);
			}
			else if(obj[i]['mon']=="12"){
				tenders[11]=parseInt(obj[i]['total']);
			}
		  }
		  var data = [{x:months,y:tenders,type: 'scatter', marker: {color: 'red'}}];
		  var layout ={width: 700, height: 400};
		  Plotly.newPlot(div1, data, layout);
	}});
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'dash2'},success(data1){
		  var obj = JSON.parse(data1);
		  var catagories = [];
		  var nft = [];
		  for(let i=0;i<obj.length;i++)
		  {
			  catagories.push(obj[i]['catagory']);
			  nft.push(obj[i]['total']);
	      }
		  var data = [{type: "pie",values:nft ,labels: catagories,textinfo: "label+percent",textposition: "outside",automargin: true}];
		  var layout = {height: 400,width: 500};
		  Plotly.newPlot(div2, data, layout);
	}});
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'dash4'},success(data1){
		  var obj = JSON.parse(data1);
		  var states = [];
		  var nft = [];
		  for(let i=0;i<obj.length;i++)
		  {
			  states.push(obj[i]['location']);
			  nft.push(obj[i]['total']);
	      }
		  var data = [{x:states,y:nft,type: 'bar', marker: {color: 'rgb(100,30,200)'}}];
		  var layout = {height: 400,width: 500};
		  Plotly.newPlot(div3, data, layout);
	}});
	$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:'dash3'},success(data1){
		  var obj = JSON.parse(data1);
		  var tdrs = [];
		  var bids = [];
		  const imgFold = require.context('./icons',true);
		  for(let i=0;i<obj.length;i++)
		  {
			  tdrs.push(obj[i]['tdr']+" ("+obj[i]['cpmy']+")");
			  bids.push(obj[i]['total']);
	      }
		  document.getElementById('1stT').innerHTML=tdrs[0];
		  document.getElementById('1st').innerHTML="<h1>"+bids[0]+" <img src="+imgFold(`./up-67.png`)+" height='20' width='20'/></h1>";
		  document.getElementById('2ndT').innerHTML=tdrs[1];
		  document.getElementById('2nd').innerHTML="<h1>"+bids[1]+" <img src="+imgFold(`./up-67.png`)+" height='20' width='20'/></h1>";
		  document.getElementById('3rdT').innerHTML=tdrs[2];
		  document.getElementById('3rd').innerHTML="<h1>"+bids[2]+" <img src="+imgFold(`./up-67.png`)+" height='20' width='20'/></h1>";
		 
	}});
});
const exeQuery=(qry,typ)=>{
	var grft = document.getElementById('gtype').value;
	var lbl = parseInt(document.getElementById('lbl').value);
	var vals =  parseInt(document.getElementById('vals').value);
	var custgraph = document.getElementById('custgraph');
	var clr = document.getElementById('clr').value;
	$.ajax({type:"POST",url:"http://localhost/php/executioner.php",data:{sql:qry,type:typ},success(data){
		try{
		var obj = JSON.parse(data);
		var x = [];
		var y = [];
		for(let i=0;i<obj.length;i++){
				x.push(obj[i][lbl]);
				y.push(obj[i][vals]);
		}
		if(grft=="bar" || grft=="scatter"){
		var data = [{x:x,y:y,type:grft, marker: {color: clr}}];
		var layout = {height: 400,width: 500};
		Plotly.newPlot(custgraph, data, layout);
		}
		else if(grft=="pie"){
		var data = [{type: "pie",values:y ,labels: x,textinfo: "label+percent",textposition: "outside",automargin: true}];
		var layout = {height: 400,width: 500};
		Plotly.newPlot(custgraph, data, layout);
		}
		else if(grft==""||grft=="Select an Graph"){
			document.getElementById("fail").innerHTML="Graph Type is Not Selected";
		    document.getElementById("fail").style.display="";
			document.getElementById('custgraph').innerHTML="";
			
		}
		}
		catch{
			document.getElementById("fail").innerHTML="Graph Could not be plot.<br/>Possible Reasons:<br/>1)Graph and Query are not compatible to each other<br/>2)Error in SQL Query<br/>3)Incompatible datas<br/><br/>Try Again :(";
		    document.getElementById("fail").style.display="";
			document.getElementById('custgraph').innerHTML="";
		}
	}});
}
const SelC=()=>{
	var sql = document.getElementById('sbuild').value;
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"graph");
	}
	else{
		document.getElementById("fail").innerHTML="Not a Select Query";
		document.getElementById("fail").style.display="";
		document.getElementById('sbuild').focus();
	}
}
const clsAlt7=()=>{
	document.getElementById('abt7').style.display="none";
}
const clsAlt8=()=>{
	document.getElementById('fail').style.display="none";
}
const cgt=()=>{
	var gt = document.getElementById('gtype').value;
	if(gt=="pie"){
	 document.getElementById('clr').disabled= true;
	}
	else{
	 document.getElementById('clr').disabled= false;
	}
}
return(
<>
<div align="center">
<h1> Dashboard </h1>
<hr/>
<br/>
<div style={{width:"50rem",height:"36rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",height:"32rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<br/>
<h3>No.of Tenders Uploaded(By Month)</h3>
<div id="plot1">
</div>
</div>
</div>
</div>
<br/>
<div style={{width:"50rem",height:"36rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",height:"32rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<br/>
<h3>No.of Tenders Uploaded(By Catagory)</h3>
<div id="plot2">
</div>
</div>
</div>
</div>
<br/>
<div style={{width:"50rem",height:"36rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",height:"32rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"50rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<br/>
<h3>No.of Tenders Uploaded(By Location)</h3>
<div id="plot3">
</div>
</div>
</div>
</div>
<br/>
<div style={{width:"60rem",height:"22rem",background:"linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 47.80%)",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"60rem",height:"18rem",background:"white",borderRadius:"900px 900px 900px 900px",zIndex:"5"}}>
<br/>
<div style={{width:"60rem",background:"white",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"3"}}>
<div>
<h3> Most Bidded Tenders This Week </h3>
<br/>
<Row align="center">
<Col md={3}></Col>
<Col md={2}>
<Card style={{ width: '10rem' }}>
<Card.Text id="1st">
</Card.Text>
<b><Card.Text id="1stT">
</Card.Text></b>
</Card>
</Col>
<Col md={2}>
<Card style={{ width: '10rem' }}>
<Card.Text id="2nd">
</Card.Text>
<b><Card.Text id="2ndT">
</Card.Text></b>
</Card>
</Col>
<Col md={2}>
<Card style={{ width: '10rem' }}>
<Card.Text id="3rd">
</Card.Text>
<b><Card.Text id="3rdT">
</Card.Text></b>
</Card>
</Col>
<Col md={3}></Col>
</Row>
<br/>
</div>
</div>
</div>
</div>
<br/>
<br/>
<br/>
<Row>
<Col>
<Container style={{borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"20rem"}}>
<h1 align="center">Custom <span style={{color:"rgb(248, 161, 27)"}}>Graphs</span></h1>
<br/>
<Alert variant="warning" id="abt7" align="left" dismissible onClose={clsAlt7}>
<Alert.Heading>About Custom Graphs</Alert.Heading>
Custom Graphs Engine is an Upperhand over Graphs. It is an extended facility for
Experts in SQL to visiually represent data into bar,pie or scatter plots
retrieved from user defined select queries for desirably selected fields without
any bound.Pretty useful for data enthusiasts.
</Alert>
<Form.Select id="gtype" style={{width:"18rem"}} onFocus={clsAlt8} onChange={cgt}>
		<option>Select an Graph</option>
		<option>bar</option>
		<option>scatter</option>
		<option>pie</option>
</Form.Select> 
<br/>
<Form.Control as="textarea" id="sbuild" placeholder="Write Your Select Query Here..." rows={7} onFocus={clsAlt8} />
<br/>
Index of Labels field :<Form.Control type="number" min="0" max="15" id="lbl" style={{width:"5rem"}} onFocus={clsAlt8} />
<br/>
Index of Values field :<Form.Control type="number" id="vals" min="0" max="15" style={{width:"5rem"}} onFocus={clsAlt8} />
<br/>
Color of Graph:<Form.Control type="color" id="clr" defaultValue="#FF0000" title="Choose your color" onFocus={clsAlt8} />
<br/>
<Button variant="dark" onClick={SelC}> Plot </Button>
<br/>
<br/>
</Container>
</Col>
<Col>
<Container style={{height:"40rem",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"50rem"}}>
<h1 align="center"><span style={{color:"rgb(248, 161, 27)"}}>Out</span>Put</h1>
<Alert variant="warning" id="fail" style={{display:"none"}}></Alert> 
<div id="custgraph"></div>
<br/>
</Container>
</Col>
</Row>
</div>
</>
);
}
export default Dashboard;