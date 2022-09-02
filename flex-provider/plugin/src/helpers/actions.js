import {
  Actions,
  TaskHelper,
  Manager,
  Notifications,
  StateHelper,
} from "@twilio/flex-ui";
import { getBasePath } from ".";
import fetch from "node-fetch";

// Once you publish the chat transfer function, place the returned domain in your version of the plugin.

/**
 * This is the function we replaced Flex's default TransferTask action with.
 *
 * First, it inspects the task passing through it, if the task is not chat-based it calls the original
 * Flex TransferTask action. This allows voice transfers to complete as normal.
 *
 * Assuming its a chat task, we initiate a request to our serverless function to iniate the transfer.
 */
export const transferOverride = async (payload, original) => {
  console.log(TaskHelper.isChatBasedTask(payload.task));
  if (!TaskHelper.isChatBasedTask(payload.task)) {
    return original(payload);
  }

  /*
   * The Twilio Chat SDK only allows an agent to join 250 chat channels. The transfer-chat serverless function
   * will bypass normal Flex controls for automatically removing agents from Twilio Chat channels in order
   * to ensure the transfer "works". By forcefully removing the agent here, we ensure the agent never hits the
   * 250 channel limit.
   */
  const channel = StateHelper.getChatChannelStateForTask(payload.task);
  console.log("channel", channel);
  if (channel) {
    await channel.source.leave();
  }
  /*
   * instantiate the manager to get useful info like user identity and token
   * build the request to initiate the transfer
   */
  const manager = Manager.getInstance();
  console.log("manager", manager);
  const body = {
    Token: manager.user.token,
    taskSid: payload.task.taskSid,
    targetSid: payload.targetSid,
    workerName: manager.user.identity,
  };

  // initiate the transfer
  return fetch(`${getBasePath()}/transfer-chat`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  }).catch(async (e) => {
    /*
     * see src/helpers/notifications.js for how this custom notification is registered.
     * if for some reason the request to transfer fails, show it to the agent
     */
    Notifications.showNotification("chatTransferFetchError", {
      message: e.message,
    });

    /*
     * If we encounter an error with the transfer-chat function we do not want to leave
     * the customer with no one in the chat channel.
     */
    if (channel) {
      await channel.source.join();
    }
  });
};

export const startOutboundCall = async (payload, original) => {
  const manager = Manager.getInstance();
  console.log("manager", manager);
  console.log("PAYLOAD", payload);
  console.log("ORIGINAL", original);
  const newPayload = payload;

  delete newPayload.taskAttributes.channelSid;
  delete newPayload.taskAttributes.conversationSid;
  newPayload.taskAttributes.channelType = "voice";
  console.log("newPayload", newPayload);
  original(newPayload);
};

/**
 * This replaces Flex's default TransferTask action with our own implementation.
 * The great thing about replacing Flex actions is that you get access to the original action,
 * so you can still call it in certain scenarios. In this case, we only want to run our `transferOverride`
 * function if the task is a chat-like task.
 *
 * If its a voice task, we want to run the original function. (see transferOverride for details)
 */
export const setUpActions = () => {
  Actions.replaceAction("TransferTask", (payload, original) =>
    transferOverride(payload, original)
  );

  Actions.replaceAction("StartOutboundCall", (payload, original) => {
    startOutboundCall(payload, original);
  });

  Actions.replaceAction("AcceptTask", (payload, original) => {
    if (payload.task.channelType === "sms") {
      const { sid, task } = payload;
      const manager = Manager.getInstance();
      const conversationSid = task.attributes.conversationSid;
      console.log("CONVERSATION SID: ", conversationSid);
      console.log("PAYLOAD", payload);
      console.log("ORIGINAL", original);
      console.log("BASE PATH: ", getBasePath());

      fetch(`${getBasePath()}/flex/sms-task-flow`, {
        method: "POST",
        body: new URLSearchParams({
          identity: Manager.getInstance().workerClient.name,
          conversationSid,
          reservationSid: sid,
          status: "accepted",
          taskSid: task.taskSid,
          Token: manager.user.token,
          what: "reservation",
          workspaceSid: manager.workerClient.workspaceSid,
        }),
      });
    } else {
      original(payload);
    }
  });

  Actions.replaceAction("RejectTask", (payload, original) => {
    //Must accept the reservation before completing it; this mimics rejection.
    if (payload.task.channelType === "sms") {
      const { sid, task } = payload;
      const manager = Manager.getInstance();
      const conversationSid = task.attributes.conversationSid;
      fetch(`${getBasePath()}/flex/sms-task-flow`, {
        method: "POST",
        body: new URLSearchParams({
          reservationSid: sid,
          what: "reservation",
          workspaceSid: manager.workerClient.workspaceSid,
          status: "accepted",
          taskSid: task.taskSid,
          Token: manager.user.token,
        }),
      }).then(() =>
        fetch(`${getBasePath()}/flex/sms-task-flow`, {
          method: "POST",
          body: new URLSearchParams({
            conversationSid,
            reservationSid: sid,
            what: "reservation",
            workspaceSid: manager.workerClient.workspaceSid,
            status: "completed",
            taskSid: task.taskSid,
            Token: manager.user.token,
          }),
        })
      );
    } else {
      original(payload);
    }
  });

  Actions.replaceAction("WrapupTask", (payload, original) => {
    if (payload.task.channelType === "sms") {
      const { task } = payload;
      const manager = Manager.getInstance();
      const conversationSid = task.attributes.conversationSid;

      fetch(`${getBasePath()}/flex/sms-task-flow`, {
        method: "POST",
        body: new URLSearchParams({
          conversationSid,
          what: "task",
          workspaceSid: manager.workerClient.workspaceSid,
          status: "wrapping",
          taskSid: task.taskSid,
          Token: manager.user.token,
        }),
      });
    } else {
      original(payload);
    }
  });

  Actions.replaceAction("CompleteTask", (payload, original) => {
    if (payload.task.channelType === "sms") {
      const { task } = payload;
      const manager = Manager.getInstance();
      const conversationSid = task.attributes.conversationSid;

      fetch(`${getBasePath()}/flex/sms-task-flow`, {
        method: "POST",
        body: new URLSearchParams({
          conversationSid,
          what: "task",
          workspaceSid: manager.workerClient.workspaceSid,
          status: "completed",
          taskSid: task.taskSid,
          Token: manager.user.token,
        }),
      });
    } else {
      original(payload);
    }
  });
};