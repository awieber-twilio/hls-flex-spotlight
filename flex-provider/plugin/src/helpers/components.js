import React from "react";
import TransferButton from "../components/TransferButton";
import { EDUCATION, EDUCATORS_QUEUE_NAME } from "../components/constants";
import CustomPanel2Container from "../components/CustomPanel2/CustomPanel2.Container";
import VideoButtonContainer from "../components/VideoButton/VideoButton.Container";
import CustomTask from "../components/CustomTask/CustomTask";
import { TaskItemIcon } from "../components/icons/TaskItemIcon";
import CallButton from "../components/CallButton";
import CannedResponses from "../components/CannedResponses";
import { TaskListItem } from "@twilio/flex-ui";

/**
 * This appends new content to the Chat Canvas (adds transfer button near end chat button)
 *
 * The if: property here is important, this says only add the transfer button if this is chat-like task
 * and the task has been assigned.
 */
export const setUpComponents = (flex, manager, flexInfo) => {
  // canned responses
  flex.MessageInputV2.Content.add(
    <CannedResponses key="canned-responses" />,
  );
  // flex.TaskListItem.Content.replace(<CustomTask key='CustomTask-component' flexInfo={flexInfo} flex={flex} manager={manager}/>);
  //flex.TaskListItem.Content.add(<TaskItemIcon key="task item icon"/>, { sortOrder: -1 })
  // Custom Panel 2
  flex.AgentDesktopView.Panel2.Content.add(
    <CustomPanel2Container
      key={"CustomPanel2-component"}
      flexInfo={flexInfo}
      flex={flex}
      manager={manager}
    />,
    { sortOrder: -1 }
  );
  flex.AgentDesktopView.defaultProps.splitterOptions = {
    minimumSecondPanelSize: "840px",
    minimumFirstPanelSize: "360px",
    initialFirstPanelSize: "440px",
  };
  flex.CRMContainer.Content.replace(<div key="empty-div-component" />, {
    sortOrder: -1,
  });

  // CallButton
  flex.TaskCanvasHeader.Content.add(
    <CallButton key="callbutton" flex={flex} />,
    {
      sortOrder: 1,
      if: (props) =>
        props.task &&
        props.task.taskStatus === "assigned" &&
        props.task.taskChannelUniqueName !== "voice" &&
        props.task.attributes,
    }
  );

  // video Button
  flex.TaskCanvasHeader.Content.add(
    <VideoButtonContainer key="video-button" />,
    {
      sortOrder: 1,
      if: (props) =>
        props.task &&
        props.task.taskStatus === "assigned" &&
        props.task.queueName === EDUCATORS_QUEUE_NAME &&
        manager.workerClient.attributes.routing &&
        manager.workerClient.attributes.routing.skills &&
        manager.workerClient.attributes.routing.skills.includes(EDUCATION),
    }
  );

  // transfer Button
  flex.TaskCanvasHeader.Content.add(
    <TransferButton key="chat-transfer-button" />,
    {
      sortOrder: 1,
      if: (props) =>
        props.channelDefinition.capabilities.has("Chat") &&
        props.task.taskStatus === "assigned",
    }
  );
};
