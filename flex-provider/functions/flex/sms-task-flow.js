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
    //Validate request
    if (!event.what || !event.status || !event.workspaceSid || !event.taskSid) {
      var validationMessage =
        "The following need to be included on the request: what, status, workspaceSid, taskSid, reservationSid*.";

      if (event.what && event.what === "reservation" && !event.reservationSid) {
        validationMessage = "No reservationSid was included.";
      } else if (
        event.status &&
        event.status === "accepted" &&
        !event.identity
      ) {
        validationMessage = "No identity was provided";
      }

      response.setStatusCode(400);
      response.setBody({
        error: true,
        errorObject: validationMessage,
      });
      return callback(null, response);
    }

    const client = context.getTwilioClient();

    const result =
      event.what === "task"
        ? await updateTaskStatus(
            client,
            event.workspaceSid,
            event.taskSid,
            event.status,
            event.conversationSid
          )
        : await updateReservationStatus(
            client,
            event.workspaceSid,
            event.taskSid,
            event.reservationSid,
            event.status,
            event.conversationSid,
            event.identity
          );

    if (result.error) {
      response.setStatusCode(400);
      response.setBody({
        error: true,
        errorObject: "Unknown error. Check the Twilio Console.",
      });
      return callback(null, response);
    }

    response.setBody({ error: false });

    return callback(null, response);
  } catch (err) {
    console.error(err);
    response.setStatusCode(500);
    return callback(null, response);
  }
});

/**
 * Sets a reservation's status to accepted or rejected.
 * @param {*} client
 * @param {*} workspaceSid
 * @param {*} taskSid
 * @param {*} reservationSid
 * @param {*} status
 * @param {*} conversationSid
 * @param {*} identity Identity of the worker
 * @returns
 */
async function updateReservationStatus(
  client,
  workspaceSid,
  taskSid,
  reservationSid,
  status,
  conversationSid,
  identity
) {
  try {
    const result = await client.taskrouter
      .workspaces(workspaceSid)
      .tasks(taskSid)
      .reservations(reservationSid)
      .update({ reservationStatus: status })
      .then(() => {
        switch (status) {
          case "accepted":
            return addConversationParticipant(
              client,
              conversationSid,
              identity
            );
          case "completed":
            return deleteConversation(client, conversationSid);
          default:
            return Promise.resolve();
        }
      })
      .then(() => ({ error: false }))
      .catch((err) => {
        return { error: true, errorObject: err };
      });
    console.log(result);
    return result;
  } catch (err) {
    return { error: true, errorObject: err };
  }
}

/**
 * Updates the status of a task to pending, reserved, assigned, canceled, wrapping, or completed.
 * @param {*} client
 * @param {*} workspaceSid
 * @param {*} taskSid
 * @param {*} status Can be: pending, reserved, assigned, canceled, wrapping, or completed.
 * @param {*} conversationSid Only required when status is completed.
 * @param {*} identity The identity of the worker.
 * @returns
 */
async function updateTaskStatus(
  client,
  workspaceSid,
  taskSid,
  status,
  conversationSid
) {
  try {
    const result = await client.taskrouter
      .workspaces(workspaceSid)
      .tasks(taskSid)
      .update({
        assignmentStatus: status,
      })
      .then(() =>
        status === "completed"
          ? deleteConversation(client, conversationSid)
          : Promise.resolve()
      )
      .then(() => ({ error: false }))
      .catch((err) => ({ error: true, errorObject: err }));
    return result;
  } catch (err) {
    return { error: true, errorObject: err };
  }
}

async function addConversationParticipant(client, conversationSid, identity) {
  try {
    await client.conversations
      .conversations(conversationSid)
      .participants.create({
        identity,
      })
      .then(() => ({ error: false }));
  } catch (err) {
    return { error: false, errorObject: err };
  }
}

async function deleteConversation(client, conversationSid) {
  try {
    await client.conversations.conversations(conversationSid).remove();
    return { error: false };
  } catch (err) {
    return { error: true, errorObject: err };
  }
}
