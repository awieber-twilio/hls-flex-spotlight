import styled from "@emotion/styled";

export const PatientInformationPaneBodyStyles = styled('div')
  `
    padding: 20px;
    max-width: 519px;
    width: 50%;
    height: 201px;
    border: 1px solid #E1E3E9;
    box-sizing: border-box;
    border-radius: 8px;
    
    .title {
      font-size: 14px;
      color: #606B85;
      font-weight: 700;
    }
    .info-block {
      margin-top: 8px;
      display: flex;
      flex-direction: row;
    }
    .info-column{
      display: flex;
      flex-direction: column;
      width: 210px;
    }
    .right-column {
      margin-left: 80px;
    }
    .column-value {
      display: flex;
      flex-direction: column;
      margin-bottom: 14px;
    }
    .label {
      color: #AFB2C0;
      font-weight: 700;
      font-size: 8px;
      line-height: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .value {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      color: #121C2D;
    }
  `;
