import { PatientInformationPaneBodyStyles } from "./PatientInformationPane.Styles";
import React, { useEffect, useMemo } from "react";
import { SCHEDULING } from "../../../constants";

interface PatientInformationPaneProps {
  name: string;
  patientInfo: any;
  pendingRequest: boolean;
  skill: string;
}

const PatientInformationPane = ({
  patientInfo,
  pendingRequest,
  name,
  skill,
}: PatientInformationPaneProps) => {
  const phone = useMemo(() => {
    if (patientInfo && patientInfo.telecom) {
      console.log(patientInfo.telecom);
      const result = patientInfo.telecom.find(
        (item: any) => item.use === "mobile"
      );
      return result?.value || "N/A";
    }
    return "N/A";
  }, [patientInfo]);

  const email = useMemo(() => {
    if (patientInfo && patientInfo.name && patientInfo.name.length > 0) {
      const name = patientInfo.name[0];
      const lastName = name.family;
      const firstName = name.given.find((e: string) => !!e);
      return `${firstName}${lastName}@gmail.com`;
    }
    return "MaryAnnDoe@gmail.com";
  }, [patientInfo]);

  /*   const email = useMemo(() => {
    const hasNumber = /\d/;
    if (hasNumber.test(name)) {
      return "MaryAnnDoe@gmail.com";
    }
    const names = name.split(" ");
    return names.join("").concat("@gmail.com");
  }, [name]); */

  return (
    <PatientInformationPaneBodyStyles>
      <p className="title">Patient Information</p>
      {skill === SCHEDULING ? (
        <div className="info-block">
          <div className="info-column">
            <div className="column-value">
              <span className="label">Id</span>
              <span className="value">
                {pendingRequest ? "..." : patientInfo?.id || "N/A"}
              </span>
            </div>
            <div className="column-value">
              <span className="label">phone number</span>
              <span className="value">{pendingRequest ? "..." : phone}</span>
            </div>
            <div className="column-value">
              <span className="label">email</span>
              <span className="value">{pendingRequest ? "..." : email}</span>
            </div>
            <div className="column-value">
              <span className="label">address</span>
              <span className="value">
                324 Panorama Drive Broomfield CO 80020
              </span>
            </div>
          </div>
          <div className="info-column right-column">
            <div className="column-value">
              <span className="label">primary insurance</span>
              <span className="value">Aetna</span>
            </div>
            <div className="column-value">
              <span className="label">ID #</span>
              <span className="value">A3489 32892</span>
            </div>
            <div className="column-value">
              <span className="label">group #</span>
              <span className="value">348912 328 780541</span>
            </div>
            <div className="column-value">
              <span className="label">payer #</span>
              <span className="value">348912 5452</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="info-block">
          <div className="info-column">
            <div className="column-value">
              <span className="label">PCP</span>
              <span className="value">{"Dr. Andrew Smith"}</span>
            </div>
            <div className="column-value">
              <span className="label">Chief Complaint</span>
              <span className="value">{"Diabetes, Type 2"}</span>
            </div>
            <div className="column-value">
              <span className="label">Allergies</span>
              <span className="value">{"Latex, bee stings"}</span>
            </div>
          </div>
          <div className="info-column right-column">
            <div className="column-value">
              <span className="label">Problems List</span>
              <span className="value">
                {"Diabetes, Type 2; Hypertension; Peripheral neuropathy"}
              </span>
            </div>
            <div className="column-value">
              <span className="label">Current Medications</span>
              <span className="value">
                {
                  "Metformin 800mg daily; Lipitor 10mg daily; Lisinopril 10mg daily"
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </PatientInformationPaneBodyStyles>
  );
};

export default PatientInformationPane;
