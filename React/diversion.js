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
import Dashboard from './dashboard.js';
import App from "./App";

function Divert(){
if(localStorage.getItem("role")==="mod"){
	return(<Dashboard />);
}
else{
	return(<App />); 
}	
}
export default Divert;