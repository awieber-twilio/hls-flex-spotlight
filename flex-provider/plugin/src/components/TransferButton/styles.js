import styled from "@emotion/styled";

export const StyledButton = styled('button')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 6px;
  width: 38px;
  height: 28px;
  background: ${props => props.inverted ? '#4B5671' : '#E1E2E9'};
  border-radius: 39px;
	cursor: pointer;
	border: none;
	margin-top: 12px;
	margin-right: 6px;
  &:hover,
  &:active,
  &:focus {
    background-color: #4B5671; //rgba(0, 0, 0, 0.2);
    background-blend-mode: color;
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${props => props.inverted ? 'white' : '#626B83'};
  }
`;
