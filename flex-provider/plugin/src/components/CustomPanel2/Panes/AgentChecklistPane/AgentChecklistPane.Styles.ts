import styled from "@emotion/styled";

export const AgentChecklistPaneStyles = styled('div')
  `
    background-color: white;
    color: black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    .check-list {
      font-size: 15px;
      padding: 12px;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
    }

    .content {
      margin-bottom: 13px;
      font-weight: bold;
    }

    .title {
      color: #F22F46;
      font-size: 18px;
      margin-bottom: 15px;
    }
    
    .input-item {
      
    }
  `;
