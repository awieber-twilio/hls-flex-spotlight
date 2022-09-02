import React from "react";
import {TaskItemIcon} from "../icons/TaskItemIcon";
import TaskItemActiveIcon from "../icons/TaskItemActiveIcon";
import {Actions} from "@twilio/flex-ui";
import {ITask} from "@twilio/flex-ui/src/models/CommonModels";
import styled from "@emotion/styled";

interface CustomTaskStylesProps {
    selected: boolean;
}

const CustomTaskStyles = styled('div')<CustomTaskStylesProps>`
    @font-face {
      font-family: "Inter";
      src: url('https://fonts.googleapis.com/css2?family=Inter');
      font-weight: normal;
      font-style: normal;
      font-display: block;
    }
    height: 54px;
    min-width: 336px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: ${({selected}: CustomTaskStylesProps) => selected ? '#3C4760' : '#fff'};
    &:hover {
      background: ${({selected}: CustomTaskStylesProps) => selected ? '#3C4769' : '#E1E3E9'};
    }
    .main-block {
      height: 54px;
      min-width: 275px;
      width: 90%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #E1E3E9;
      margin-right: 4px;
    }
    .info-block {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
    }
    .from-info {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 14px; 
      color: ${({selected}: CustomTaskStylesProps) => selected ? '#fff' : '#0C0831'};
      //color: #0C0831;
    }
    .secondary-info-block {
      display: inline-flex;
      align-items: center;
    }
    .secondary-info {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      color: ${({selected}: CustomTaskStylesProps) => selected ? '#AFB2C0' : '#22335A'};
      opacity: ${({selected}: CustomTaskStylesProps) => selected ? 1 : 0.4};
    }
    .info-divider {
      margin: 0 2px;
      display: inline-flex;
      align-items: center;
    }
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        border: none;
        outline: none;
        width: 30px;
        height: 30px;
        background: none;
        cursor: pointer;
      }
    }
`

export default function CustomTask(props : any) {

    const {task}: {task: ITask} = props;

    const accept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        void Actions.invokeAction("AcceptTask", { sid: task.sid });
    }
    const reject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        void Actions.invokeAction("RejectTask", { sid: task.sid });
    }
    const selectCurrent = () => {
        void Actions.invokeAction("SelectTask", { sid: task.sid });
    }

    return <CustomTaskStyles role="button" onClick={selectCurrent} selected={props.selected}>
        {task.status == "pending" && <TaskItemIcon/>}
        {task.status !== "pending" && <TaskItemActiveIcon />}
        <div className="main-block">
            <div className="info-block">
                <p className="from-info">{task.defaultFrom}</p>
                <p className="secondary-info-block">
                    <span className="secondary-info">13 m</span>
                    <span className="info-divider">
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.2" cx="2" cy="2" r="2" fill="#22335A"/>
                        </svg>
                    </span>
                    <span className="secondary-info">
                    In wrap Up
                </span>
                </p>
            </div>

            <div className="actions">
                <button onClick={accept}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#14B053"/>
                        <path d="M16.4733 8.80657C16.4114 8.74409 16.3376 8.69449 16.2564 8.66065C16.1751 8.6268 16.088 8.60938 16 8.60938C15.912 8.60938 15.8249 8.6268 15.7436 8.66065C15.6624 8.69449 15.5886 8.74409 15.5267 8.80657L10.56 13.7799L8.47334 11.6866C8.40899 11.6244 8.33303 11.5755 8.24979 11.5427C8.16656 11.5099 8.07768 11.4938 7.98822 11.4954C7.89877 11.4969 7.8105 11.5161 7.72844 11.5518C7.64639 11.5874 7.57217 11.6389 7.51001 11.7032C7.44785 11.7676 7.39897 11.8435 7.36617 11.9268C7.33337 12.01 7.31728 12.0989 7.31883 12.1884C7.32038 12.2778 7.33953 12.3661 7.37519 12.4481C7.41085 12.5302 7.46233 12.6044 7.52667 12.6666L10.0867 15.2266C10.1486 15.2891 10.2224 15.3387 10.3036 15.3725C10.3849 15.4063 10.472 15.4238 10.56 15.4238C10.648 15.4238 10.7352 15.4063 10.8164 15.3725C10.8976 15.3387 10.9714 15.2891 11.0333 15.2266L16.4733 9.78657C16.541 9.72415 16.595 9.64838 16.632 9.56404C16.6689 9.47971 16.688 9.38864 16.688 9.29657C16.688 9.20451 16.6689 9.11344 16.632 9.0291C16.595 8.94477 16.541 8.869 16.4733 8.80657Z" fill="white"/>
                    </svg>
                </button>
                <button onClick={reject}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#D61F1F"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.8326 8.16737C16.0558 8.39052 16.0558 8.75233 15.8326 8.97549L8.97549 15.8326C8.75233 16.0558 8.39052 16.0558 8.16737 15.8326C7.94421 15.6095 7.94421 15.2477 8.16737 15.0245L15.0245 8.16737C15.2477 7.94421 15.6095 7.94421 15.8326 8.16737Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.16737 8.16737C8.39052 7.94421 8.75233 7.94421 8.97549 8.16737L15.8326 15.0245C16.0558 15.2477 16.0558 15.6095 15.8326 15.8326C15.6095 16.0558 15.2477 16.0558 15.0245 15.8326L8.16737 8.97549C7.94421 8.75233 7.94421 8.39052 8.16737 8.16737Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>

    </CustomTaskStyles>
}
