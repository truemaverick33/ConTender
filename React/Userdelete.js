import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import $ from 'jquery';

export default function Userdelete() {

    
  const deleteuser = () => {
    var eml = document.getElementById('eml').value;
    var pass = document.getElementById('pass').value;
    $.ajax({type:"POST",url:"http://localhost/auction_project/deleteuser.php",data:{eml:eml,pass:pass},success(data){
        console.log(data);
		if(data=="success"){
			
		}
		else{
			
		}  
  }});
  }
  return (
    <div>

<Form method="post">

    <br/> <br/> <br/>
            <h2>DELETE HERE</h2><br/>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" id='eml' name="email" placeholder="Enter email" className='form-styling' />
          
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id='pass' name="password" placeholder="Password" className='form-styling'/>
        </Form.Group>
        
        
        <Button variant="primary" className='submit' onClick={deleteuser}>
          Delete
        </Button>
      </Form>
    </div>
  )
}
