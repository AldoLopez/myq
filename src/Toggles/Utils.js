import axios from 'axios';

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
      });
  });
};
