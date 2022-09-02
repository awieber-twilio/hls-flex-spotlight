import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import "./GlobalStyles.js";

import reducers, { namespace } from "./states";
import { CustomTheme } from "./CustomTheme";

import {
  getBasePath,
  setUpActions,
  setUpComponents,
  setUpNotifications,
} from "./helpers";

const PLUGIN_NAME = "HlsEmrPlugin";

function getFlexObject(workerClient) {
  return {
    skills: workerClient.attributes.routing.skills,
    full_name: workerClient.attributes.full_name,
    name: workerClient.name,
    email: workerClient.attributes.email,
    workspaceSid: workerClient.workspaceSid,
    token: workerClient._config.token,
    accountSid: workerClient.accountSid,
    sid: workerClient.sid,
  };
}

export default class HlsEmrPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    //loadCSS('https://almond-penguin-7632.twil.io/assets/theme.css');
    // loadCSS('/theme.css');

    // console.log(manager.store.getState());
    this.registerReducers(manager);
    const flexInfo = getFlexObject(manager.workerClient);

    const configuration = {
      colorTheme: CustomTheme,
    };
    /*flex.MainHeader.defaultProps.logoUrl =
      "https://hls-site-4115-dev.twil.io/owlhealth/images/logoOwlHealth.png";*/
    manager.updateConfig(configuration);
    manager.strings.NoTasksTitle = "Task Status";
    manager.strings.NoTasks = "No Patient Tasks";

    manager.workerClient.on("reservationCreated", async function (reservation) {
      if (reservation.task.attributes.channelType === "sms") {
        const taskSid = reservation.task.sid;
        const workspaceSid = reservation.workspaceSid;

        fetch(`${getBasePath()}/flex/reservation`, {
          method: "POST",
          body: new URLSearchParams({
            workspace: workspaceSid,
            tasks: taskSid,
            attributes: JSON.stringify(reservation.task.attributes),
            Token: manager.user.token,
          }),
        });
      }
    });

    //console.log("overall state", manager.store.getState());
    setUpComponents(flex, manager, flexInfo);
    setUpNotifications();
    setUpActions();
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
