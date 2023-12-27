import React from 'react';
import CardDemo from './carddemo.js';
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';

function Rpt()
{
const [buttonsOnCanvos, setButtonsOnCanvos] = useState([]);
  return (
    <div className="App">
      <div className="canvos">{buttonsOnCanvos}</div>
    </div>
  );

}

export default Rpt;