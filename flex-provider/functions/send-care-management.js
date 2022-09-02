/* eslint-disable no-undef */
const JWEValidator = require('twilio-flex-token-validator').functionValidator;
const { parsePhoneNumber } = require('awesome-phonenumber');

exports.handler = JWEValidator(async function(context, event, callback) {
  const response = new Twilio.Response();
  const client = context.getTwilioClient();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent',
  );
  response.setStatusCode(200);
  const { textBody, phoneNumber } = event;
  try {
    const text = "You are enrolled in the following programs: ";
    const pn = parsePhoneNumber( phoneNumber, 'US' );
    const programs = textBody.reduce((acc, curr) => {
      if(curr){
        return acc.concat(curr)
      }
      return acc
    }, []);
    await client.messages
      .create({
        body: text + programs.join(", "), 
        from: context.ADMINISTRATOR_PHONE,
        to: pn.getNumber(),
      })
      .then(message => {
        console.log(message.sid);
        response.setBody({
          result: message,
          error: false,
        });
      });

    return callback(null, response);
  } catch(err) {
    console.log(err);
    return callback(null, setError(response, err));
  }
});

function setError(response, err) {
  response.setStatusCode(500)
    .setBody({
      error: true,
      errorObject: err,
    });
  return response;
}
