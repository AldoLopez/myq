import axios from 'axios';
import { generateHeaders } from '../identityActions';

export const toggleLight = () => {
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
        alert(`Garage Door: ${res.body}`);
      });
  });
};
