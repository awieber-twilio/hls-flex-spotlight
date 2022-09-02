/* ----------------------------------------------------------------------------------------------------
 * common helper function used by functions
 *
 * parameters to specific to this application
 *
 * getParam(context, key)        : fetches parameter value from (1) context; (2) deployed service
 *   also, provisions provisionable parameters (application-specific)
 * setParam(context, key, value) : sets parameter in deployed service
 * deprovisionParams(context)    : deprovisions all provisionable parameter for this application, call from undeploy
 *
 * ----------------------------------------------------------------------------------------------------
 */
const assert = require("assert");

/* --------------------------------------------------------------------------------
 * retrieve environment variable value
 * --------------------------------------------------------------------------------
 */
async function getParam(context, key) {
  assert(context.APPLICATION_NAME, "undefined .env environment variable APPLICATION_NAME!!!");
  assert(context.CUSTOMER_NAME   , "undefined .env environment variable CUSTOMER_NAME!!!");

  if (
    key !== "SERVICE_SID" && // avoid warning
    key !== "ENVIRONMENT_SID" && // avoid warning
    context[key]
  ) {
    return context[key]; // first return context non-null context value
  }

  const client = context.getTwilioClient();
  switch (key) {
    case "SERVICE_SID":
    {
      const services = await client.serverless.services.list();
      const service = services.find(s => s.friendlyName === context.APPLICATION_NAME);

      // return sid only if deployed; otherwise null
      return service ? service.sid : null;
    }

    case "ENVIRONMENT_SID":
    {
      const service_sid = await getParam(context, "SERVICE_SID");
      if (service_sid === null) return null; // service not yet deployed

      const environments = await client.serverless
        .services(service_sid)
        .environments.list({ limit: 1 });

      return environments.length > 0 ? environments[0].sid : null;
    }

    case "ENVIRONMENT_DOMAIN":
    {
      const service_sid = await getParam(context, "SERVICE_SID");
      if (service_sid === null) return null; // service not yet deployed

      const environments = await client.serverless
        .services(service_sid)
        .environments.list({ limit: 1 });

      return environments.length > 0 ? environments[0].domainName : null;
    }

    case "VERIFY_SID":
    {
      const services = await client.verify.services.list();
      let service = services.find(
        (s) => s.friendlyName === context.APPLICATION_NAME
      );
      if (!service) {
        console.log(
          `Verify service not found so creating a new verify service friendlyName=${context.APPLICATION_NAME}`
        );
        service = await client.verify.services.create({
          friendlyName: context.APPLICATION_NAME,
        });
      }
      if (!service)
        throw new Error(
          "Unable to create a Twilio Verify Service!!! ABORTING!!!"
        );

      await setParam(context, key, service.sid);
      return service.sid;
    }

    case "FLEX_PLUGIN_SID":
    {
      // note that this will only run on LOCALHOST
      const { execSync } = require('child_process');
      const plugin_sid = execSync(
        `twilio flex:plugins:list:plugins --json | jq --raw-output '.[] | select(.friendlyName == "${context.FLEX_PLUGIN_NAME}") | .sid'`,
        {
          env: {
            'PATH': process.env.PATH,
            'HOME': process.env.HOME,
            'TWILIO_ACCOUNT_SID': context.ACCOUNT_SID,
            'TWILIO_AUTH_TOKEN': context.AUTH_TOKEN,
          },
        }).toString();

      return plugin_sid ? plugin_sid : null;
    }

    case 'FLEX_WORKSPACE_SID':
    {
      const flex = await client.flexApi.v1.configuration().fetch();
      assert(flex, `Flex instance not found in Twilio account: ${context.ACCOUNT_SID}!!!`);
      assert(flex.taskrouterWorkspaceSid, `Taskrouter Workspace Sid not found in Twilio account: ${context.ACCOUNT_SID}!!!`);

      await setParam(context, key, flex.taskrouterWorkspaceSid);
      return flex.taskrouterWorkspaceSid;
    }

    // case "TELEHEALTH_SERVICE_SID":
    // {
    //   const services = await client.serverless.services.list();
    //   const service = services.find((s) => s.friendlyName === 'telehealth');
    //   if (!service)
    //     throw new Error(`Telhealth service not found!!! Please deploy first. Aborting!!!`);

    //   return service.sid;
    // }

    // case "TELEHEALTH_HOSTNAME":
    // {
    //   const services = await client.serverless.services.list();
    //   const service = services.find((s) => s.friendlyName === 'telehealth');
    //   if (!service)
    //     throw new Error(`Telhealth service not found!!! Please deploy telehealth first. Aborting!!!`);

    //   const environments = await client.serverless
    //     .services(service.sid)
    //     .environments.list({ limit: 1 });
    //   if (environments.length === 0)
    //     throw new Error(`Telhealth service environment not found!!! Please re-deploy telehealth. Aborting!!!`);

    //   return environments[0].domainName;
    // }

    case "CONVERSATIONS_SID": {
      const services = await client.conversations.services.list();
      let service = services.find(
        (s) => s.friendlyName === context.APPLICATION_NAME
      );
      if (!service) {
        console.log(
          `Conversations Service not found so creating a new Converasations service friendlyName=${context.APPLICATION_NAME}`
        );
        service = await client.conversations.services.create({
          friendlyName: context.APPLICATION_NAME,
        });
        // Now set the new service to be the default for the account (required by Frontline)
        const configuration = await client.conversations
          .configuration()
          .update({ defaultChatServiceSid: service.sid });
      }
      if (!service) {
        throw new Error(
          "Unable to create a Twilio Conversations Service!!! ABORTING!!!"
        );
      }
    }

    default:
      throw new Error(`Undefined variable ${key} !!!`);
  }
}

/* --------------------------------------------------------------------------------
 * deprovision environment variable
 * --------------------------------------------------------------------------------
 */
async function provisionParams(context) {
  const client = context.getTwilioClient();

  return {
    VERIFY_SID: await getParam(context, "VERIFY_SID"),
  };
}

/* --------------------------------------------------------------------------------
 * deprovision environment variable
 * --------------------------------------------------------------------------------
 */
async function deprovisionParams(context) {
  const client = context.getTwilioClient();

  const resources = {};

  const verify_sid = await getParam(context, "VERIFY_SID");
  if (!verify_sid) return; // do nothing if no value

  let verify_service = null;
  try {
    verify_service = await client.verify.services(verify_sid).fetch();
    if (verify_service) {
      await client.verify.services(verify_sid).remove();
      resources["VERIFY_SID"] = verify_sid;
    }
  } catch (err) {
    console.log(`no verify service SID=${verify_sid}. skpping...`);
  }

  return resources;
}

/* --------------------------------------------------------------------------------
 * sets environment variable, only if service is deployed
 * --------------------------------------------------------------------------------
 */
async function setParam(context, key, value) {
  const service_sid = await getParam(context, "SERVICE_SID");
  if (!service_sid) return null; // do nothing is service is not deployed

  const client = context.getTwilioClient();

  const environment_sid = await getParam(context, "ENVIRONMENT_SID");
  const variables = await client.serverless
    .services(service_sid)
    .environments(environment_sid)
    .variables.list();
  let variable = variables.find((v) => v.key === key);

  if (variable) {
    // update existing variable
    if (variable.value !== value) {
      await client.serverless
        .services(service_sid)
        .environments(environment_sid)
        .variables(variable.sid)
        .update({ value })
        .then((v) => console.log("setParam: updated variable", v.key));
    }
  } else {
    // create new variable
    await client.serverless
      .services(service_sid)
      .environments(environment_sid)
      .variables.create({ key, value })
      .then((v) => console.log("setParam: created variable", v.key));
  }

  return {
    key: key,
    value: value,
  };
}

// --------------------------------------------------------------------------------
module.exports = {
  getParam,
  setParam,
  deprovisionParams,
};
