const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {
 const accountKey = context.gfAccountKey;
 const accountSecret = context.gfAccountSecret;
 const apiUrl = context.gfApiUrl;

 // Create a custom Twilio Response
 // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
 const response = new Twilio.Response();
 response.appendHeader('Access-Control-Allow-Origin', '*');
 response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
 response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

 const data = {
   gfAccountKey: accountKey,
   gfAccountSecret: accountSecret,
   gfApiUrl: apiUrl
 };
 response.appendHeader('Content-Type', 'application/json');
 response.setBody(data);

 return callback(null, response)
});