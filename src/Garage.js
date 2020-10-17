import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { generateHeaders } from './identityActions';
import './Garage.css';

const Garage = () => (
  <div>
    <Button
      id='toggleLight'
      label='Toggle Light'
      color='primary'
      onClick={toggleLight}
    ></Button>
  </div>
);

export default Garage;
