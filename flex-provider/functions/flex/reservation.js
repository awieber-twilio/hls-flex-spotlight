const JWEValidator = require("twilio-flex-token-validator").functionValidator;
const { getBasePath } = require(Runtime.getFunctions()["helpers"].path);
const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;

/** Updates Flex reservations. */
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
    if (!event.workspace || !event.tasks || !event.attributes || !event.Token) {
      response.setStatusCode(400);
      response.setBody({
        error: true,
        errorObject:
          "The following need to be included on the request: workspace, tasks, attributes.",
      });
      return callback(null, response);
    }

    const { workspace, tasks, attributes: unparsedAttrs, Token } = event;
    const attributes = JSON.parse(unparsedAttrs);
    const phone = attributes.customerAddress;

    const patientResult = await fetch(`${getBasePath()}/ehr-lookup`, {
      method: "POST",
      body: new URLSearchParams({
        Token,
        phone,
        cmd: "phone",
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => {
        return { error: true, errorObject: err };
      });

    if (patientResult.error) {
      console.error(patientResult.errorObject);
      response.setStatusCode(400);
      response.setBody({
        error: true,
        errorObject: "Could not get patient information.",
      });
      return callback(null, response);
    }

    const { patientInfo } = patientResult.result;

    const name = patientInfo.name[0];
    const lastName = name.family;
    const firstName = name.given.find((e) => !!e);

    const client = context.getTwilioClient();

    const reservationResult = await client.taskrouter
      .workspaces(workspace)
      .tasks(tasks)
      .update({
        attributes: JSON.stringify({
          ...attributes,
          name: `${firstName} ${lastName}`,
        }),
      })
      .then((res) => {
        return { error: false };
      })
      .catch((err) => {
        return { error: true, errorObject: err };
      });

    if (reservationResult.error) {
      response.setStatusCode(400);
      response.setBody({
        error: true,
        errorObject: "Could not update the reservation name.",
      });
      return callback(null, response);
    }

    return callback(null, response);
  } catch (err) {
    console.error(err);
    response.setStatusCode(500);
    return callback(null, response);
  }
});
