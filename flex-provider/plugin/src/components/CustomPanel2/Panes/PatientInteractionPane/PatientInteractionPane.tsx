import { EDUCATION } from "../../../constants";
import PaneHeader from "../PaneHeader/PaneHeader";
import { PatientInteractionPaneStyles } from "./PatientInteractionPane.Styles";
import React from "react";

interface PatientInteractionPaneProps {
  timeStamps: { 
    date: string, 
    time: string 
  };
  workerSkill: string;
}

const PatientInteractionPane = ({timeStamps, workerSkill}: PatientInteractionPaneProps) => {
  return (
    <PatientInteractionPaneStyles>
      <PaneHeader text="Interaction Details"/>
        <ul>
          <li className="interaction">
            <span>{"💬 "}{timeStamps.date}{" "}{timeStamps.time}<br/></span>
            <span>{"Website Chatbot triage"}</span>
          </li>
          <li className="interaction">
            <span>{"💬 "}{timeStamps.date}{" "}{timeStamps.time}<br/></span>
            <span>{"Chat with Scheduler"}</span>
          </li>
          {workerSkill === EDUCATION && 
            <li className="interaction">
              <span>{"🎥  01/05/2022"}{" 08:49 am"}<br/></span>
              <span>{"Video with Nurse Educator"}<br/></span>
              <span><strong>{"Current"}</strong></span>
            </li>
          }
        </ul>
    </PatientInteractionPaneStyles>
  );
}

export default PatientInteractionPane;
