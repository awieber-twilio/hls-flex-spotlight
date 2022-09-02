/* eslint-disable no-undef */
const JWEValidator = require("twilio-flex-token-validator").functionValidator;
const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;
const parsePhoneNumber = require("awesome-phonenumber").parsePhoneNumber;

const defaultPatient = {
  id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  resourceType: "Patient",
  name: [
    {
      use: "official",
      family: "Doe",
      given: ["Mary Ann"],
    },
  ],
  telecom: [
    { system: "phone", value: "", use: "home" },
    { system: "phone", value: "", use: "work" },
    { system: "phone", value: "111-222-3333", use: "mobile" },
    { system: "email", value: "", use: "home" },
  ],
  gender: "female",
  birthDate: "1990-01-01",
};

exports.handler = JWEValidator(async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent"
  );
  response.setStatusCode(200);

  try {
    const access_token = event.access_token;

    if (!event.cmd) {
      response.setStatusCode(400);
      response.setBody("No cmd included.");
      return callback(null, response);
    }

    if (event.cmd === "name") {
      const first_name = event.first_name;
      const last_name = event.last_name;

      //validation
      if (!last_name || !first_name || !access_token) {
        response
          .setStatusCode(400)
          .setBody("first_name, last_name, or access_token missing.");
        return callback(null, response);
      }

      await fetch(
        `http://${context.OPENEMR_NGROK_HOSTNAME}/apis/default/fhir/Patient`,
        {
          headers: new Headers({ Authorization: `Bearer ${access_token}` }),
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          let patient = null;
          if (data.total === 0) {
            patient = defaultPatient;
          } else if (data.total === 1) {
            patient = data.entry[0].resource;
          } else {
            // multiple match on given OR famiy, so filter
            const matches = data.entry.filter((e) => {
              return (
                e.resource.name[0].family === last_name &&
                e.resource.name[0].given.includes(first_name)
              );
            });
            patient =
              matches.length === 0 ? defaultPatient : matches[0].resource;
          }
          response.setBody(patient);
        });
    } else if (event.cmd === "phone") {
      if (!event.phone || !access_token) {
        response.setStatusCode(400);
        response.setBody("phone or access token was not included.");
        return callback(null, response);
      }

      const searchPhone = parsePhoneNumber(event.phone, "US");
      console.log(searchPhone);
      if (!searchPhone.isValid()) {
        response.setStatusCode(400);
        response.setBody("phone number provided is not valid");
        return callback(null, response);
      }

      await fetch(
        `http://${context.OPENEMR_NGROK_HOSTNAME}/apis/default/fhir/Patient`,
        {
          headers: new Headers({ Authorization: `Bearer ${access_token}` }),
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          let patient = null;
          if (data.total === 0) {
            patient = defaultPatient;
          } else if (data.total === 1) {
            patient = data.entry[0].resource;
          } else {
            // multiple match on given OR famiy, so filter
            const matches = data.entry.filter(
              (e) =>
                e.resource.telecom.filter((t) => {
                  if (!!t.value) {
                    const emrPhone = parsePhoneNumber(t.value, "US");
                    return emrPhone.getNumber() === searchPhone.getNumber();
                  }
                  return false;
                }).length > 0
            );
            patient =
              matches.length === 0 ? defaultPatient : matches[0].resource;
          }
          response.setBody(patient);
        });
    }

    return callback(null, response);
  } catch (err) {
    response.setStatusCode(500);
    response.setBody(err);
    return callback(null, response);
  }
});
