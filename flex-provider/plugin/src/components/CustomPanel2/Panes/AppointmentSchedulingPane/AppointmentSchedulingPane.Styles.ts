import styled from "@emotion/styled";

export const AppointmentSchedulingPaneStyles = styled("div")`
  color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border: 1px solid #e1e3e9;
  box-sizing: border-box;
  border-radius: 8px;
  max-width: 1049px;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;

  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #606b85;
  }
  .open-emr {
    width: 100%;
    position: relative;
    height: 100%;
    padding-bottom: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;
