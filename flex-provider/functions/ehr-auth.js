/* eslint-disable no-undef */
const JWEValidator = require("twilio-flex-token-validator").functionValidator;
const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;

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
    const client_id = event.client_id;

    if (client_id === undefined) {
      response.setStatusCode(400);
      response.setBody("client_id was not provided.");
      return callback(null, response);
    }

    const body = {
      client_id,
      grant_type: "password",
      user_role: "users",
      username: "admin",
      password: "pass",
      scope:
        "openid offline_access api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/Encounter.read patient/Patient.read",
    };

    await fetch(`http://${context.OPENEMR_NGROK_HOSTNAME}/oauth2/default/token`, {
      body: new URLSearchParams(body),
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) {
          const statusCode =
            resp.error_description && resp.error_description === "Bad Request"
              ? 400
              : 500;
          response.setStatusCode(statusCode).setBody(resp.error);
        } else {
          const { access_token, expires_in, refresh_token } = resp;
          console.log(`Access token expires in ${expires_in}`);
          response.setBody({
            access_token,
            expires_in,
            refresh_token,
          });
        }
      });

    return callback(null, response);
  } catch (err) {
    response.setStatusCode(500);
    return callback(null, response);
  }
});
