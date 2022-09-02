import styled from "@emotion/styled";

export const CustomPanel2Styles = styled("div")`
  background: #fff;
  border-left: 0.5px solid #e5e4e2;
  padding: 12px;
  font-size: 12px;
  font-family: "Inter", sans-serif !important;
  display: flex;
  height: 100%;

  .scheduler-panes {
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0;
  }

  .first-row {
    display: flex;
    gap: 10px;
  }

  .flex-item {
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    flex: 1;
    // gap: 22px;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    // gap: 22px;
    padding: 12px 0;
  }

  .second-row {
    flex: 1;
  }

  .scheduler {
    gap: 22px;
  }

  .item1 {
    flex-grow: 2;
  }

  .flex-item {
    flex-grow: 1;
    flex-basis: calc(100% / 2);
  }

  .grid-one {
    margin: 4px;
    width: 33%;
  }
  .grid-two {
    margin: 4px;
    width: 33%;
    flex: 1;
  }
  .grid-three {
    margin: 4px;
    width: 33%;
    flex: none;
  }
  .grid-four {
    margin: 4px;
    width: 100%;
    height: 100%;
    flex: none;
  }
  .patient-info {
    color: #606b85;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
  }
`;
