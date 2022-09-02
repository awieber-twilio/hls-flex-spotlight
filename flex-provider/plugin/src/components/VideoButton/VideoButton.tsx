import { styled } from '@twilio/flex-ui';
import React from 'react';

export interface StyledButtonProps {
  inverted?: boolean;
  bgColor: string;
  svgColor: string;
}

const Button = styled('button')<StyledButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 6px;
  width: 38px;
  height: 28px;
  background: ${props => props.bgColor};
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
    fill: ${props => props.svgColor};
  }
`;

const VideoButton = (props: any) => {
  const handleClick = () => {
    props.toggleTelehealth();
  }
  const {shouldShowTelehealth} = props;

  // working colors toggle solution, but need to research how to fix redux rendering issue
  return (
    <>
      {shouldShowTelehealth && <Button
          onClick={handleClick}
          title={"Enable Video"}
          bgColor={'#4B5671'}
          svgColor={'white'}
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1 1.5C1 1.22386 1.22386 1 1.5 1H7C7.27614 1 7.5 1.22386 7.5 1.5V4V6.5C7.5 6.77614 7.27614 7 7 7H1.5C1.22386 7 1 6.77614 1 6.5V1.5ZM8.5 3.02841V1.5C8.5 0.671573 7.82843 0 7 0H1.5C0.671573 0 0 0.671573 0 1.5V6.5C0 7.32843 0.671573 8 1.5 8H7C7.82843 8 8.5 7.32843 8.5 6.5V4.9716L11.2094 6.90687C11.3618 7.01573 11.5623 7.03029 11.7288 6.94459C11.8953 6.85888 12 6.6873 12 6.5V1.5C12 1.31271 11.8953 1.14112 11.7288 1.05542C11.5623 0.969716 11.3618 0.984273 11.2094 1.09314L8.5 3.02841ZM11 5.52841L8.86023 4L11 2.4716V5.52841Z"/>
        </svg>
      </Button>}
      {!shouldShowTelehealth &&<Button
          onClick={handleClick}
          title={"Enable Video"}
          bgColor={'#E1E2E9'}
          svgColor={'#626B83'}
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1 1.5C1 1.22386 1.22386 1 1.5 1H7C7.27614 1 7.5 1.22386 7.5 1.5V4V6.5C7.5 6.77614 7.27614 7 7 7H1.5C1.22386 7 1 6.77614 1 6.5V1.5ZM8.5 3.02841V1.5C8.5 0.671573 7.82843 0 7 0H1.5C0.671573 0 0 0.671573 0 1.5V6.5C0 7.32843 0.671573 8 1.5 8H7C7.82843 8 8.5 7.32843 8.5 6.5V4.9716L11.2094 6.90687C11.3618 7.01573 11.5623 7.03029 11.7288 6.94459C11.8953 6.85888 12 6.6873 12 6.5V1.5C12 1.31271 11.8953 1.14112 11.7288 1.05542C11.5623 0.969716 11.3618 0.984273 11.2094 1.09314L8.5 3.02841ZM11 5.52841L8.86023 4L11 2.4716V5.52841Z"/>
        </svg>
      </Button>}
    </>
  )
}

export default VideoButton;
