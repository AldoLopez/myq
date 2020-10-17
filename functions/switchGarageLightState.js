const { USER, PW } = process.env;
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
  devices.forEach((device) => {
    console.log(`${index}: sn-${device.serial_number}`);
  });
  return { statusCode: 200 };
};
