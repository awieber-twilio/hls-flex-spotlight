'use strict';
/* --------------------------------------------------------------------------------
 * deploys application (service) to target Twilio account.
 *
 * NOTE: that this function can only be run on localhost
 *
 * input:
 * event.action: CREATE|UPDATE|DELETE, defaults to CREATE|UPDATE depending on deployed state
 *
 * service identified via unique_name = APPLICATION_NAME in helpers.private.js
 * --------------------------------------------------------------------------------
 */

const path = require("path");
const fs = require("fs");
const assert = require("assert");
const THIS = 'deploy';
const step_total = 8; // TODO: must set manually based on your implementation!
let step = 0;
function log_step(message) {
  step++;
  console.log(`${THIS}: ${step}/${step_total}`, message);
}

function log(message) {
  console.log(`${THIS}:`, message);
}

exports.handler = async function(context, event, callback) {
  const assert = require("assert");
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);

  step = 0; // reset step

  assert(context.DOMAIN_NAME.startsWith('localhost:'), `Can only run on localhost!!!`);
  console.time(THIS);
  try {
    assert(event.configuration.APPLICATION_NAME, 'missing APPLICATION_NAME variable!!!');
    assert(event.action, 'missing event.action variable!!!');

    log(THIS, ': configuration submitted:\n', event.configuration);

    log(THIS, `Deploying action=${event.action}`);

    switch (event.action) {

      case 'DEPLOY':
      case 'REDEPLOY': {
        log('Provisioning dependent Twilio services');
        // await getParam(context, 'VERIFY_SID');

        log_step(`---------- Deploying serverless service: ${event.configuration.APPLICATION_NAME}`);
        const service_sid = await deploy_service(context, event.configuration);
        log(`Deployed: ${service_sid}`);

        log_step('---------- Make serverless service editable ...');
        const client = context.getTwilioClient();
        await client.serverless.services(service_sid).update({uiEditable: true});
        log(`Completed deployment of serverless service: ${service_sid}`);

        const fpath = path.join(process.cwd(), 'plugin', '.env');
        const hostname = await getParam(context, 'ENVIRONMENT_DOMAIN');
        const telehealth_hostname = await getParam(context, 'TELEHEALTH_HOSTNAME');
        const ngrok_hostname = event.configuration.OPENEMR_NGROK_HOSTNAME;
        assert(hostname, 'ENVIRONMENT_DOMAIN is "null"!!! Aborting...');
        assert(telehealth_hostname, 'TELEHEALTH_HOSTNAME is "null"!!! Aborting...');
        assert(ngrok_hostname, 'OPENEMR_NGROK_HOSTNAME is "null"!!! Aborting...');
        log_step(`---------- Generating plugin .env file at ${fpath}`);
        fs.writeFileSync(fpath, `FLEX_APP_SERVERLESS_HOSTNAME=${hostname}`);
        fs.appendFileSync(fpath, `\nREACT_APP_OPENEMR_NGROK_HOSTNAME=${ngrok_hostname}`);
        fs.appendFileSync(fpath, `\nREACT_APP_TELEHEALTH_HOSTNAME=${telehealth_hostname}`);
        fs.appendFileSync(fpath, `\nREACT_APP_BACKEND_URL=${hostname}`);

        log('Deploying flex plugin ...');
        const plugin_sid = await deploy_flex_plugin(context, event.configuration);
        log(`Completed deployment of flex plugin: ${plugin_sid}`);

        const flex_workspace_sid = await getParam(context, 'FLEX_WORKSPACE_SID');
        log_step(`---------- Configuring task router workspace: ${flex_workspace_sid}`);
        await deploy_taskrouter_configuration(context);

        const response = {
          status: event.action,
          deployables: [
            { serverless_service_sid: service_sid, },
            { flex_plugin_sid: plugin_sid, },
          ],
        };
        return callback(null, response);
      }

      case 'UNDEPLOY': {
        const service_sid = await undeploy_service(context);
        const plug_sid = await undeploy_flex_plugin(context);

        // TODO: un-provision other services

        const response = {
          status: 'UNDEPLOYED',
          deployables: [
            { service_sid: undeployed_service_sid, },
            { flex_plugin_sid: plugin_sid, },
          ],
        };
        return callback(null, response);
      }

      default: throw new Error(`unknown event.action=${action}`);
    }

  } catch(err) {
    console.log(err);
    return callback(err);
  } finally {
    console.timeEnd(THIS);
  }
}


/* --------------------------------------------------------------------------------
 * deploys (creates new/updates existing) service to target Twilio account.
 *
 * - service identified via unique_name = APPLICATION_NAME in helpers.private.js
 *
 * returns: service SID, if successful
 * --------------------------------------------------------------------------------
 */
async function get_assets() {
  const { getListOfFunctionsAndAssets } = require('@twilio-labs/serverless-api/dist/utils/fs');

  const { assets } = await getListOfFunctionsAndAssets(process.cwd(), {
    functionsFolderNames: [],
    assetsFolderNames: ["assets"],
  });
  //console.log('asset count:', assets.length);

  const indexHTMLs = assets.filter(asset => asset.name.includes('index.html'));
  // Set indext.html as a default document
  const allAssets = assets.concat(indexHTMLs.map(ih => ({
    ...ih,
    path: ih.name.replace("index.html", ""),
    name: ih.name.replace("index.html", ""),
  })));
  //console.log(allAssets);
  //return allAssets;
  return assets;
}


/* --------------------------------------------------------------------------------
 * deploys serverless service
 * --------------------------------------------------------------------------------
 */
async function deploy_service(context, envrionmentVariables = {}) {
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);
  const { getListOfFunctionsAndAssets } = require('@twilio-labs/serverless-api/dist/utils/fs');
  const { TwilioServerlessApiClient } = require('@twilio-labs/serverless-api');
  const fs = require('fs');

  const client = context.getTwilioClient();

  const assets = await get_assets();
  log('asset count:' , assets.length);

  const { functions } = await getListOfFunctionsAndAssets(process.cwd(),{
    functionsFolderNames: ["functions"],
    assetsFolderNames: []
  });
  log('function count:' , functions.length);

  const pkgJsonRaw = fs.readFileSync(`${process.cwd()}/package.json`);
  const pkgJsonInfo = JSON.parse(pkgJsonRaw);
  const dependencies = pkgJsonInfo.dependencies;
  log('package.json loaded');

  const deployOptions = {
    env: {
      ...envrionmentVariables
    },
    pkgJson: {
      dependencies,
    },
    functionsEnv: 'dev',
    functions,
    assets,
  };
  log('deployOptions.env:', deployOptions.env);

  let service_sid = await getParam(context, 'SERVICE_SID');
  if (service_sid) {
    // update service
    log('updating services ...');
    deployOptions.serviceSid = service_sid;
  } else {
    // create service
    log('creating services ...');
    deployOptions.serviceName = envrionmentVariables.APPLICATION_NAME;
  }

  const serverlessClient = new TwilioServerlessApiClient({
    username: client.username, // ACCOUNT_SID
    password: client.password, // AUTH_TOKEN
  });

  serverlessClient.on("status-update", evt => {
    console.log(evt.message);
  });

  log_step(`---------- Deploying serverless service: ${envrionmentVariables.APPLICATION_NAME}`);
  await serverlessClient.deployProject(deployOptions);
  service_sid = await getParam(context, 'SERVICE_SID');

  return service_sid;
}


/* --------------------------------------------------------------------------------
 * undeploys sererless service
 * --------------------------------------------------------------------------------
 */
async function undeploy_service(context, envrionmentVariables) {
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);

  const client = context.getTwilioClient();
  // ---------- remove studio flow, if exists
  const service_sid = await getParam(context, 'SERVICE_SID'); // will be null if not deployed
  if (service_sid) {
    const response = await client.serverless.services(service_sid).remove();
  }

  return service_sid;
}


/* --------------------------------------------------------------------------------
 * (re)deploys a deployable
 * --------------------------------------------------------------------------------
 */
const deploy_flex_plugin = async (context) => {
  const assert = require("assert");
  const path = require('path');
  const { execSync } = require('child_process');

  assert(context.ACCOUNT_SID, 'TWILIO_ACCOUNT_SID not set!!!');
  assert(context.AUTH_TOKEN , 'TWILIO_ACCOUNT_SID not set!!!');
  assert(context.FLEX_PLUGIN_NAME  , 'FLEX_PLUGIN_NAME not set!!!');

  const client = context.getTwilioClient();
  const flexPluginName = context.FLEX_PLUGIN_NAME;

  log_step(`---------- Deploying flex plugin: ${flexPluginName} ...`);
  const changeLog = "Deployed manually II";
  const deployDescription = "Deployed manually II";
  execSync(
    `twilio flex:plugins:deploy --patch --changelog "${changeLog}" --description "${deployDescription}"`,
    {
      cwd: 'plugin',
      env: {
        'PATH': process.env.PATH,
        'HOME': process.env.HOME,
        'TWILIO_ACCOUNT_SID': context.ACCOUNT_SID,
        'TWILIO_AUTH_TOKEN': context.AUTH_TOKEN,
      },
      stdio: 'inherit',
    });

  log_step(`---------- Retrieving deployed flex plugin current version ...`);
  const pluginVersion = execSync(
    `twilio flex:plugins:list:plugin-versions --name ${flexPluginName} --json | jq --raw-output '.[0].version'`,
    {
      env: {
        'PATH': process.env.PATH,
        'HOME': process.env.HOME,
        'TWILIO_ACCOUNT_SID': context.ACCOUNT_SID,
        'TWILIO_AUTH_TOKEN': context.AUTH_TOKEN,
      },
    }).toString().replace(/(\r\n|\n|\r)/gm, "");
  console.log(`version = ${pluginVersion}`);

  const plugin = `${flexPluginName}@${pluginVersion}`;
  log_step(`---------- Releasing flex plugin ${plugin} ...`);
  const releaseName = 'releaseName';
  const releaseDescription = 'releaseDescription';
  execSync(
    `twilio flex:plugins:release --plugin "${plugin}" --name "${releaseName}" --description "${releaseDescription}"`,
    {
      env: {
        'PATH': process.env.PATH,
        'HOME': process.env.HOME,
        'TWILIO_ACCOUNT_SID': context.ACCOUNT_SID,
        'TWILIO_AUTH_TOKEN': context.AUTH_TOKEN,
      },
      stdio: 'inherit',
    });

  const pluginSid = execSync(
    `twilio flex:plugins:list:plugin-versions --name ${flexPluginName} --json | jq --raw-output '.[0].pluginSid'`,
    {
      env: {
        'PATH': process.env.PATH,
        'HOME': process.env.HOME,
        'TWILIO_ACCOUNT_SID': context.ACCOUNT_SID,
        'TWILIO_AUTH_TOKEN': context.AUTH_TOKEN,
      },
      stdio: 'inherit',
    });
  log(`Completed deploy & release of flex plugin: ${pluginSid} ...`);

  return pluginSid;
}
exports.deploy_flex_plugin = deploy_flex_plugin;


/* --------------------------------------------------------------------------------
 * undeploys a deployable
 * --------------------------------------------------------------------------------
 */
const undeploy_flex_plugin = async (context ,env) => {
  const client = context.getTwilioClient();

  // TODO

  return null;
}
exports.undeploy_flex_plugin = undeploy_flex_plugin;


/* --------------------------------------------------------------------------------
 * deploy task router configuration
 * --------------------------------------------------------------------------------
 */
async function deploy_taskrouter_configuration(context) {
  const assert = require("assert");
  const { getParam } = require(Runtime.getFunctions()['helpers'].path);

  const client = context.getTwilioClient();

  const flex_workspace_sid = await getParam(context, 'FLEX_WORKSPACE_SID');
  assert(flex_workspace_sid, 'Workspace not found for flex account!!!');

  const queues = await client.taskrouter.workspaces(flex_workspace_sid).taskQueues.list();

  // ---------- update/create task queue for scheduler
  let queue_scheduler = null;
  {
    const fname = await getParam(context, 'TASKQUEUE_SCHEDULER');
    assert(fname, 'TASKQUEUE_SCHEDULER undefined in .env !!!');
    const skill = await getParam(context, 'SKILL_SCHEDULER');
    assert(skill, 'SKILL_SCHEDULER undefined in .env !!!')
    const queue = queues.find(q => q.friendlyName === fname);
    queue_scheduler = queue
      ? await client.taskrouter.workspaces(flex_workspace_sid)
        .taskQueues(queue.sid)
        .update({
          targetWorkers: `routing.skills HAS "${skill}"`,
        })
      : await client.taskrouter.workspaces(flex_workspace_sid)
        .taskQueues
        .create({
          friendlyName: fname,
          targetWorkers: `routing.skills HAS "${skill}"`,
        });
  }
  assert(queue_scheduler, 'Unable to configure task router task queue for scheduler!!!');

  // ---------- update/create task queue for educator
  let queue_educator = null;
  {
    const fname = await getParam(context, 'TASKQUEUE_EDUCATOR');
    assert(fname, 'TASKQUEUE_EDUCATOR undefined in .env !!!');
    const skill = await getParam(context, 'SKILL_EDUCATOR');
    assert(skill, 'SKILL_EDUCATOR undefined in .env !!!')
    const queue  = queues.find(q => q.friendlyName === fname);
    queue_educator = queue
      ? await client.taskrouter.workspaces(flex_workspace_sid)
        .taskQueues(queue.sid)
        .update({
          targetWorkers: `routing.skills HAS "${skill}"`
        })
      : await client.taskrouter.workspaces(flex_workspace_sid)
        .taskQueues
        .create({
          friendlyName: fname,
          targetWorkers: `routing.skills HAS "${skill}"`
        });
  }
  assert(queue_educator, 'Unable to configure task router task queue for educator!!!');

  const workflow_default_fname = await getParam(context, 'WORKFLOW_DEFAULT');
  const workflows = await client.taskrouter.workspaces(flex_workspace_sid).workflows.list();
  const workflow_default = workflows.find(w => w.friendlyName === workflow_default_fname);

  // ---------- create workflow for scheduler
  let workflow_scheduler = null;
  {
    const fname = await getParam(context, 'WORKFLOW_SCHEDULER');
    assert(fname, 'WORKFLOW_SCHEDULER undefined in .env !!!');
    const workflow = workflows.find(w => w.friendlyName === fname);
    if (workflow) {
      workflow_scheduler = workflow;
    } else {
      const configuration = JSON.stringify({
        task_routing: {
          default_filter: {
            queue: queue_scheduler.sid,
          }
        }
      });
      if (workflow_default) {
        workflow_scheduler = await client.taskrouter.workspaces(flex_workspace_sid)
          .workflows(workflow_default.sid)
          .update({
            friendlyName: fname,
            configuration: configuration,
          });
      } else {
        workflow_scheduler = await client.taskrouter.workspaces(flex_workspace_sid)
          .workflows
          .create({
            friendlyName: fname,
            configuration: configuration,
          });
      }
    }
  }
  assert(workflow_scheduler, 'Unable to create task router workflow for scheduler!!!');

  // ---------- update/create workflow for educator
  let workflow_educator = null;
  {
    const fname = await getParam(context, 'WORKFLOW_EDUCATOR');
    assert(fname, 'WORKFLOW_EDUCATOR undefined in .env !!!');
    const workflow = workflows.find(w => w.friendlyName === fname);
    if (workflow) {
      workflow_educator = workflow;
    } else {
      const configuration = JSON.stringify({
        task_routing: {
          default_filter: {
            queue: queue_educator.sid,
          }
        }
      });
      workflow_educator = await client.taskrouter.workspaces(flex_workspace_sid)
        .workflows
        .create({
          friendlyName: fname,
          configuration: configuration,
        });
    }
  }
  assert(workflow_educator, 'Unable to create task router workflow for educator!!!');

  // ---------- assign skills to admin worker (1st in returns workers)
  const workers = await client.taskrouter.workspaces(flex_workspace_sid)
    .workers
    .list();
  assert(workers, 'No task router workers found!!!');
  const admin = workers[0];
  const jsonAttributes = JSON.parse(admin.attributes);
  jsonAttributes.routing = {
    skills: [
      await getParam(context, 'SKILL_SCHEDULER'),
      await getParam(context, 'SKILL_EDUCATOR'),
      'language*es-xl',
    ],
    levels: {},
  }
  const worker = await client.taskrouter.workspaces(flex_workspace_sid)
    .workers(admin.sid)
    .update({
      attributes: JSON.stringify(jsonAttributes),
    });
  console.log('Admin Worker updated attribute:', worker.attributes);
}

/* --------------------------------------------------------------------------------
 * (re)deploys a deployable
 * --------------------------------------------------------------------------------
 */
const deploy_a_deployable = async (context) => {
  const client = context.getTwilioClient();

  // TODO

  return null;
}
exports.deploy_a_deployable = deploy_a_deployable;


/* --------------------------------------------------------------------------------
 * undeploys a deployable
 * --------------------------------------------------------------------------------
 */
const undeploy_a_deployable = async (context) => {
  const client = context.getTwilioClient();

  // TODO

  return null;
}
exports.undeploy_a_deployable = undeploy_a_deployable;
