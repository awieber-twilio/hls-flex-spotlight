import styled from "@emotion/styled";

export const CareManagementPaneStyles = styled('div')
  `
    max-width: 519px;
    width: 50%;
    height: 201px;
    border: 1px solid #E1E3E9;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-block {
      position: relative;
      height: 40px;
    }
    .title {
      font-size: 14px;
      color: #606B85;
      font-weight: 700;
    }
    .sub-title {
      font-size: 10px;
      color: #606B85;
      line-height: 12px;
    }
    .checkboxes {
      display: flex;
      flex-direction: column;
    }
    .checkbox-wrapper {
      height: 16px;
      margin-bottom: 12px;
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #121C2D;
    }
    .btn-row {
      display: flex;
      align-items: center;
    }
    .enroll-btn {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      padding: 7.5px 19px 7.5px 13.58px;
      text-transform: capitalize;
      color: #0263E0;      
      background: #EBF4FF; 
      
    }
    .enroll-btn:disabled {
      color: #AEB2C1;
      background: #F4F4F6;
    }
 
    .enroll-btn-text {
      margin-left: 6.58px;
    }
    
    .enrolled-message {
      font-weight: 600;   
      font-size: 10px;        
      line-height: 12px; 
      color: #AEB2C1;
      margin-left: 11px
    }
  `;
