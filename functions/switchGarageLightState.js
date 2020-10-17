const { USER, PW, SN } = process.env;
const MyQ = require('myq-api');

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log(`identity: ${JSON.stringify(identity)}`);
  console.log(`User: ${user}`);
  if (!user) {
    return { statusCode: 403, body: 'You shall not pass!' };
  }
  const account = new MyQ();
  console.log('logging into myq');
  const loginResult = await account.login(USER, PW);
  console.log('Login result:');
  console.log(JSON.stringify(loginResult, null, 2));
  console.log(`Short-lived security token: '${loginResult.securityToken}'`);

  const getDevices = await account.getDevices();
  const { devices } = getDevices;
  const serials = [];
  devices.forEach((device) => serials.push(device.serial_number));
  try {
    const result = await account.getLightState(serials[0]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  try {
    const result2 = await account.getLightState(serials[1]);
    console.log(result2);
  } catch (error) {
    console.log(error);
  }

  return { statusCode: 200 };
};
