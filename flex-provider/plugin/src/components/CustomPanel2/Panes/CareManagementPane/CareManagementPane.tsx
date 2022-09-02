import { CareManagementPaneStyles } from "./CareManagementPane.Styles";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useEffect, useState} from "react";
import { Manager } from "@twilio/flex-ui";
import { getBasePath } from "../../../../helpers";
import { useSelector } from "react-redux";
import { mobilePhone as mobilePhoneSelector } from "../../../../states/selectors";

interface CareManagementProps {
  classes?: any;
  manager: Manager;
}
export interface ITelecom {
  system: string;
  value: string;
  use: string;
}

const CareManagementPane = ({ manager }: CareManagementProps) => {

  const [diabetes, setDiabetes] = useState<string|undefined>(undefined);
  const [eatingHabits, setEatingHabits] = useState<string|undefined>(undefined);
  const [exercise, setExercise] = useState<string|undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | unknown>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const mobilePhone = useSelector(mobilePhoneSelector);
  
  useEffect(() => {
    console.log("Care STUFF", mobilePhone);
    if (mobilePhone) {
      setPhoneNumber(mobilePhone);
    }
  }, [mobilePhone]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if(isEnrolled) {
      console.log('is enrolled:', isEnrolled);

      timer = setTimeout(() => {
        setIsEnrolled(false);
        clearTimeout(timer);
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [isEnrolled]);

  const enrollPatient = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Here we will do the enrollment
    setIsLoading(true);
    const body = {
      Token: manager.user.token,
      textBody: [diabetes, eatingHabits, exercise],
      phoneNumber: phoneNumber // Need to get this phoneNumber to send to patient
    }
    event.preventDefault();
    await fetch(`${getBasePath()}/send-care-management`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
    .then(res => {
      console.log("response: ", res);
      setIsEnrolled(true);
      setIsLoading(false);
    })
    .catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }

  const handleDiabetes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDiabetes(e.target.value);
    } else {
      setDiabetes("");
    }
  }

  const handleEating = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setEatingHabits(e.target.value);
    } else {
      setEatingHabits("");
    }
  }

  const handleExercise = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setExercise(e.target.value);
    } else {
      setExercise("");
    }
  }
  const isDisabled = !phoneNumber || (isEnrolled || !(diabetes || exercise || eatingHabits));
  const svgColor = isDisabled ? '#AEB2C1' : '#0263E0';

  return (
    <CareManagementPaneStyles>
      <div className="title-block">
        <p className="title">Care Management Programs</p>
        <span className="sub-title">The patient is eligible for the following care management programs</span>
      </div>

        <div className="checkboxes">
          <div className="checkbox-wrapper">
            <input
                className="check-item"
                type="checkbox"
                id="Diabetes Management"
                name="fav_language"
                value="Diabetes Management"
                onChange={handleDiabetes}
                disabled={isEnrolled}
            />
            <label> Diabetes Management </label>
          </div>
          <div className="checkbox-wrapper">
            <input
                className="check-item"
                type="checkbox"
                id="Healthy Eating Habits"
                name="fav_language"
                value="Healthy Eating Habits"
                onChange={handleEating}
                disabled={isEnrolled}
            />
            <label> Healthy Eating Habits </label>
          </div>
         <div className="checkbox-wrapper">
           <input
               className="check-item"
               type="checkbox"
               id="Exercise Made Easy"
               name="fav_language"
               value="Exercise Made Easy"
               onChange={handleExercise}
               disabled={isEnrolled}
           />
           <label> Exercise Made Easy </label>
         </div>

        </div>

        <div className="btn-row">
          {!isLoading ?
              <Button className="enroll-btn"
                      disabled={isDisabled}
                      onClick={enrollPatient}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.2458 0.754167C13.4736 0.981973 13.4736 1.35132 13.2458 1.57913L6.82916 7.99579C6.60135 8.2236 6.232 8.2236 6.0042 7.99579C5.77639 7.76799 5.77639 7.39864 6.0042 7.17083L12.4209 0.754167C12.6487 0.526362 13.018 0.526362 13.2458 0.754167Z" fill={svgColor} />
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.2458 0.754184C13.4043 0.912639 13.458 1.14786 13.3839 1.35937L9.3006 13.026C9.22158 13.2518 9.01277 13.4064 8.77379 13.4162C8.53481 13.4259 8.3141 13.2888 8.21696 13.0702L5.97474 8.02527L0.929766 5.78305C0.711202 5.68591 0.574082 5.4652 0.583831 5.22622C0.593581 4.98724 0.748225 4.77842 0.973975 4.69941L12.6406 0.616079C12.8522 0.54205 13.0874 0.595728 13.2458 0.754184ZM2.74814 5.31452L6.65359 7.05027C6.78556 7.10893 6.89108 7.21445 6.94974 7.34642L8.68549 11.2519L11.8825 2.11748L2.74814 5.31452Z" fill={svgColor} />
                </svg>
                <span className="enroll-btn-text">{isEnrolled ? 'Enrolled' : 'Enroll'}</span>
              </Button>
              :
              <CircularProgress disableShrink />
          }

          {isEnrolled && <span className="enrolled-message">Program enrolled!</span>}

        </div>

    </CareManagementPaneStyles>
  );
}

export default CareManagementPane;
