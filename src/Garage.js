import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { generateHeaders } from './identityActions';
import './Garage.css';

const toggleLight = () => {
  generateHeaders().then((headers) => {
    axios
      .get(
        'https://gallant-jackson-3a417f.netlify.app/.netlify/functions/switchGarageLightState',
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
      });
  });
};

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
