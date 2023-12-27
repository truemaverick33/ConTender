import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import $ from 'jquery';
import {useEffect} from 'react';
import img1 from './icons/tank-48.png';
import img2 from './icons/chem-48.png';
import img3 from './icons/construction-48.png';
import img4 from './icons/bio-48.png';
import img5 from './icons/electricity-48.png';
import img6 from './icons/solar-48.png';
import img7 from './icons/hydroelectric-48.png';
import img8 from './icons/mine-48.png';
import img9 from './icons/radar-48.png';
import img10 from './icons/robot-48.png';
import img11 from './icons/resources-48.png';
import img12 from './icons/pipelines-48.png';
import img13 from './icons/med-48.png';
import img14 from './icons/pharma-48.png';
import img15 from './icons/healthcare-48.png';
import img16 from './icons/agro-48.png';
import img17 from './icons/spices-48.png';
import img18 from './icons/foodgrains-48.png';
import img19 from './icons/fruit-48.png';
import img20 from './icons/household-48.png';
import img21 from './icons/lighting-48.png';
import img22 from './icons/aviation-48.png';
import img23 from './icons/aerospace-48.png';
import img24 from './icons/rail-48.png';
import img25 from './icons/roadway-48.png';
import img26 from './icons/automobile-48.png';
import img27 from './icons/port-48.png';
import img28 from './icons/civil-48.png';
import img29 from './icons/realestate-48.png';
import img30 from './icons/computer-48.png';
import img31 from './icons/telecom-48.png';
import img32 from './icons/machine-48.png';

function Alltend()
{
	useEffect(() => {
	  $.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:"alltends"},success(data){
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="";
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
		  }
		  document.getElementById('t1').innerHTML=table;
	  }
	  });
      
	});
	const catagorize = (e) => {
		var cat = e.target.id;
		document.getElementById('shr').innerHTML="Showing results for Catagory : " +cat;
		$.ajax({type:"POST",url:"http://localhost/php/fetchtd.php",data:{datafor:"alltendsCat",cat:cat},success(data){
		  try{
		  var obj = JSON.parse(data);
		  //console.log(obj);
		  var table="";
		  for(let i=0;i<obj.length;i++)
		  {
			 table += "<tr><th>" +  (i+1) +". " +obj[i]['title'] + "</th></tr><tr><td> Requirements: " + obj[i]['descr'] +"<br/>Value: "+ obj[i]['tvalue'] +"<br/>Last Date: "+ obj[i]['expd'] +"<br/><a href='viewdetails?tid="+obj[i]['tid']+"'>view details</a><br/><br/><u>Uploaded By: "+ obj[i]['uname'] +" ( "+ obj[i]['company'] +" )</u></td></tr><br/>";
			 }
		  document.getElementById('t1').innerHTML=table;}
		 catch{
		 var table="<br/><br/><h3 align='center'>No data found</h3>";
		 document.getElementById('t1').innerHTML=table;
		 }
	  }
	  });
	}
	const refresh = () =>{
		window.location.reload();
	}
	return(
	<div style={{backgroundColor:"white"}}align="center">
      <header>
	  <h1>Tenders</h1><br/><br/>
	  <Container>
	  <p><u>Select Catagory :</u></p>
	  <Carousel variant="dark">
      <Carousel.Item>
	  <Row>
	  <Col></Col>
      <Col><img src={img1} alt="img not rendered" id="Military" onClick={(event)=>catagorize(event)}/><br/><h6>Military</h6></Col>
	  <Col><img src={img2} alt="img not rendered" id="Chemicals" onClick={(event)=>catagorize(event)}/><br/><h6>Chemicals</h6></Col>
	  <Col><img src={img3} alt="img not rendered" id="Construction" onClick={(event)=>catagorize(event)}/><br/><h6>Construction</h6></Col>
	  <Col><img src={img4} alt="img not rendered" id="Bio" onClick={(event)=>catagorize(event)}/><br/><h6>Bio</h6></Col>
	  <Col></Col>
	  </Row><br/><br/>
      </Carousel.Item>
      <Carousel.Item>
	  <Row>
	  <Col></Col>
      <Col><img src={img5} alt="img not rendered" id="Electricals" onClick={(event)=>catagorize(event)}/><br/><h6>Electricals</h6></Col>
	  <Col><img src={img6} alt="img not rendered" id="Solar" onClick={(event)=>catagorize(event)}/><br/><h6>Solar</h6></Col>
	  <Col><img src={img7} alt="img not rendered" id="HydroPower" onClick={(event)=>catagorize(event)}/><br/><h6>HydroPower</h6></Col>
	  <Col><img src={img8} alt="img not rendered" id="Mining" onClick={(event)=>catagorize(event)}/><br/><h6>Mining</h6></Col>
	  <Col></Col>
	  </Row><br/><br/>
      </Carousel.Item>
      <Carousel.Item>
      <Row>
	  <Col></Col>
	  <Col><img src={img9} alt="img not rendered" id="Defence" onClick={(event)=>catagorize(event)}/><br/><h6>Defence</h6></Col>
	  <Col><img src={img10} alt="img not rendered" id="Robotics" onClick={(event)=>catagorize(event)}/><br/><h6>Robotics</h6></Col>
	  <Col><img src={img11} alt="img not rendered" id="Resourcess" onClick={(event)=>catagorize(event)}/><br/><h6>Resources</h6></Col>
	  <Col><img src={img12} alt="img not rendered" id="Pipelines" onClick={(event)=>catagorize(event)}/><br/><h6>Pipelines</h6></Col>
	  <Col></Col>
      </Row><br/><br/>
      </Carousel.Item>
      <Carousel.Item>
      <Row>
	  <Col></Col>
	  <Col><img src={img13} alt="img not rendered" id="Medical" onClick={(event)=>catagorize(event)}/><br/><h6>Medical</h6></Col>
	  <Col><img src={img14} alt="img not rendered" id="Pharma" onClick={(event)=>catagorize(event)}/><br/><h6>Pharma</h6></Col>
	  <Col><img src={img15} alt="img not rendered" id="Healthcare" onClick={(event)=>catagorize(event)}/><br/><h6>Healthcare</h6></Col>
	  <Col><img src={img16} alt="img not rendered" id="Agro" onClick={(event)=>catagorize(event)}/><br/><h6>Agro</h6></Col>
	  <Col></Col>
      </Row><br/><br/>
      </Carousel.Item>
	  <Carousel.Item>
      <Row>
	  <Col></Col>
	  <Col><img src={img17} alt="img not rendered" id="Spices" onClick={(event)=>catagorize(event)}/><br/><h6>Spices</h6></Col>
	  <Col><img src={img18} alt="img not rendered" id="Food Grains" onClick={(event)=>catagorize(event)}/><br/><h6>Food Grains</h6></Col>
	  <Col><img src={img19} alt="img not rendered" id="Fruits and Plants" onClick={(event)=>catagorize(event)}/><br/><h6>Fruits and Plants</h6></Col>
	  <Col><img src={img20} alt="img not rendered" id="House Appliances" onClick={(event)=>catagorize(event)}/><br/><h6>House Appliances</h6></Col>
	  <Col></Col>
      </Row><br/><br/>
      </Carousel.Item>
	  <Carousel.Item>
      <Row>
	  <Col></Col>
	  <Col><img src={img21} alt="img not rendered" id="Lighting" onClick={(event)=>catagorize(event)}/><br/><h6>Lighting</h6></Col>
	  <Col><img src={img22} alt="img not rendered" id="Aviation" onClick={(event)=>catagorize(event)}/><br/><h6>Aviation</h6></Col>
	  <Col><img src={img23} alt="img not rendered" id="Aerospace" onClick={(event)=>catagorize(event)}/><br/><h6>Aerospace</h6></Col>
	  <Col><img src={img24} alt="img not rendered" id="Railways" onClick={(event)=>catagorize(event)}/><br/><h6>Railways</h6></Col>
	  <Col></Col>
      </Row><br/><br/>
      </Carousel.Item>
	  <Carousel.Item>
      <Row>
	  <Col></Col>
	  <Col><img src={img25} alt="img not rendered" id="Roadways" onClick={(event)=>catagorize(event)}/><br/><h6>Roadways</h6></Col>
	  <Col><img src={img26} alt="img not rendered" id="Automobile" onClick={(event)=>catagorize(event)}/><br/><h6>Automobile</h6></Col>
	  <Col><img src={img27} alt="img not rendered" id="Port" onClick={(event)=>catagorize(event)}/><br/><h6>Port</h6></Col>
	  <Col><img src={img28} alt="img not rendered" id="Civil works" onClick={(event)=>catagorize(event)}/><br/><h6>Civil works</h6></Col>
	  <Col></Col>
      </Row><br/><br/>
      </Carousel.Item>
	  <Carousel.Item>
      <Row>
	  <Col></Col>
	  <Col><img src={img29} alt="img not rendered" id="Real Estate" onClick={(event)=>catagorize(event)}/><br/><h6>Real Estate</h6></Col>
	  <Col><img src={img30} alt="img not rendered" id="Computer Harware and Software" onClick={(event)=>catagorize(event)}/><br/><h6>Computer Harware and Software</h6></Col>
	  <Col><img src={img31} alt="img not rendered" id="Telecomm" onClick={(event)=>catagorize(event)}/><br/><h6>Telecomm</h6></Col>
	  <Col><img src={img32} alt="img not rendered" id="Machinery" onClick={(event)=>catagorize(event)}/><br/><h6>Machinery</h6></Col>
	  <Col></Col>
      </Row><br/><br/>
      </Carousel.Item>
    </Carousel>
	<Button variant="outline-warning" onClick={refresh}>Reset Filter</Button>
	<br/><br/>
	  </Container>
      </header>
	  <Container>
	  <h5 id="shr"></h5>
	  <br/>
	  <Table bordered hover striped id="t1" variant="light">
	  </Table>
	  </Container>
	  </div>
	);
}
export default Alltend;

