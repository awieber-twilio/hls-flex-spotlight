import { joinClasses } from '../../utils';
import { Button, ButtonVariant } from '../Button';
import { Select } from '../Select';
import { VirtualBackgroundOptions } from '../VirtualBackgroundOptions';
import { useEffect, useState } from 'react';
import MicTest from './MicTest';
import { Icon } from '../Icon';
import { TelehealthVisit } from '../../types';
import clientStorage from '../../services/clientStorage';
import {
  CURRENT_VISIT,
  FLEX_ENABLED_KEY,
  STORAGE_VISIT_KEY,
} from '../../constants';
import { CurrentVisit } from '../../interfaces';
import router from 'next/router';
import { Input } from '../Input';
import { Uris } from '../../services/constants';
import { useVisitContext } from '../../state/VisitContext';
import useVideoContext from '../Base/VideoProvider/useVideoContext/useVideoContext';


export interface AudioVideoSettingsProps {
  className?: string;
  isDark?: boolean;
  isCallInProgress?: boolean;
  isRecording?: boolean;
  visitNext?: TelehealthVisit;
  toggleRecording?: () => void;
}

export interface Device {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

/**
 * TODO:
 * - Figure out a way to change browser's audio settings
 * - Virtual Backgrounds implementation
 */
export const AudioVideoSettings = ({
  className,
  isDark,
  isCallInProgress,
  isRecording,
  visitNext,
  toggleRecording,
}: AudioVideoSettingsProps) => {
  const [videoDevices, setVideoDevices] = useState<ReadonlyArray<Device>>([]);
  const { getLocalVideoTrack } = useVideoContext();

  const [audioInputDevices, setAudioInputDevices] = useState<
    ReadonlyArray<Device>
  >([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    ReadonlyArray<Device>
  >([]);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  // Flex useStates
  const [flexEnabled, setFlexEnabled] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
  const [isPhoneDigits, setIsPhoneDigits] = useState<boolean>(true);
  const [isValidPhoneFormat, setIsValidPhoneFormat] = useState<boolean>(true);
  const { user, visit } = useVisitContext();

  async function startVisit() {
    const currVisit: CurrentVisit = {
      visitId: visitNext.ehrAppointment.id,
      visitType: visitNext.ehrAppointment.type,
    };
    await clientStorage.saveToStorage<CurrentVisit>(CURRENT_VISIT, currVisit);
    await clientStorage.saveToStorage<TelehealthVisit>(
      STORAGE_VISIT_KEY,
      visitNext
    );
    router.push('/provider/video/');
  }

  async function sendMessage() {
    console.log("EHR APPOINTMENT ", visitNext.ehrAppointment);
    const reg =
      /^(?:(?:\(?(?:00|\+)([1-99]\d\d|[1-99]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
    const isPhoneMatch = reg.test(phoneNumber);
    if (isPhoneMatch) {
      const response = await fetch(Uris.get(Uris.visits.token), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'PATIENT',
          id: visitNext.ehrAppointment.patient_id,
          visitId: visitNext.ehrAppointment.id,
        }),
      }).then((response) => response.json());

      const url = `${location.origin}/patient/index.html?token=${response.passcode}`;

      await fetch(Uris.get(Uris.flex.patientLink), {
        method: 'POST',
        body: JSON.stringify({
          token: user.token,
          patientPhone: phoneNumber,
          url,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((resp) => console.log(resp.json()))
        .catch((err) => console.error(err));
    } else {
      setIsValidPhoneFormat(false);
      setTimeout(() => {
        setIsValidPhoneFormat(true);
      }, 5000);
    }
  }

  function changeVideoTrack(e) {
    getLocalVideoTrack(e.target.value);
    setSelectedVideoDevice(e.target.value);
  }

  function handleChange(e) {
    // Todo: Handle Device Change.
    console.log(e.target.value);
  }

  useEffect(() => {
    const digitsReg = /^[0-9]+$/;
    if (
      (phoneNumber[0] === '+' && digitsReg.test(phoneNumber.substring(1))) ||
      phoneNumber.length === 0
    ) {
      setIsPhoneDigits(true);
    } else {
      setIsPhoneDigits(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    const checkFlexEnabled = async () => {
      const isFlexEnabled = (await clientStorage.getFromStorage(
        FLEX_ENABLED_KEY
      )) as number;
      if (isFlexEnabled) {
        setFlexEnabled(true);
      } else {
        setFlexEnabled(false);
      }
    };
    checkFlexEnabled();
  }, []);

  // Gets machine's Audio and Video devices
  useEffect(() => {
    getLocalVideoTrack().then(track =>
     {
      setSelectedVideoDevice(track.mediaStreamTrack.getSettings().deviceId);

      navigator.mediaDevices.enumerateDevices().then((devices) => {

        const videoInputDevices: Device[] = devices.filter(
          (device) => device.kind === 'videoinput'
        );
        const audioInputs: Device[] = devices.filter(
          (device, index, array) =>
            device.kind === 'audioinput' && !device.label.includes('Virtual')
        );
        const audioOutputs: Device[] = devices.filter(
          (device) =>
            device.kind === 'audiooutput' && !device.label.includes('Virtual')
        );
        setVideoDevices(videoInputDevices);
        setAudioInputDevices(audioInputs);
        setAudioOutputDevices(audioOutputs);
      });
        


     }
    );

  }, [isMicOn]);

  const Label = ({ children }) => (
    <label
      className={joinClasses(
        'my-2 text-xs block',
        isDark ? 'text-white' : 'text-dark'
      )}
    >
      {children}
    </label>
  );

  return (
    <div className={joinClasses(className)}>
      <div className="my-3">
        <Label>Camera</Label>
        <Select
          isDark={isDark}
          key={'videoInput'}
          onChange={changeVideoTrack}
          className="w-full"
          value={selectedVideoDevice}
          options={videoDevices.map((device) => ({
            label: device.label ? device.label : 'System Default (Webcam)',
            value: device.deviceId,
          }))}
        />
      </div>
      <div className="my-3">
        <Label>Voice Input Device:</Label>
        <Select
          isDark={isDark}
          key={'audioInput'}
          onChange={handleChange}
          className="w-full"
          options={audioInputDevices.map((device) => ({
            label: device.label,
            value: device.deviceId,
          }))}
        />
        <input className="mt-4 w-full bg-primary" type="range" />
      </div>
      <div className="my-3">
        <Label>Audio Output Device:</Label>
        <Select
          isDark={isDark}
          key={'audioOutput'}
          onChange={handleChange}
          className="w-full"
          options={audioOutputDevices.map((device) => ({
            label: device.label,
            value: device.deviceId,
          }))}
        />
        <input className="mt-4 w-full bg-primary" type="range" />
      </div>
      {isCallInProgress ? (
        <div className="my-6 flex items-center">
          <div className="pr-5 text-sm">Recording:</div>
          <div className="flex-grow">
            <Button
              variant={isRecording ? ButtonVariant.primary : ButtonVariant.link}
              className="w-full"
              onClick={toggleRecording}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="my-3 flex justify-center items-center space-x-5">
          <Button
            variant={ButtonVariant.tertiary}
            onClick={() => {
              setIsMicOn(!isMicOn);
              console.log(isMicOn);
            }}
            outline
            className="flex justify-center items-center space-x-2"
          >
            Test
            <Icon name="mic"></Icon>
          </Button>
          <MicTest className="w-full" isMicOn={isMicOn} />
        </div>
      )}
      {flexEnabled ? (
        <></>
      ) : (
        <div className="my-3">
          <Label>Virtual Background</Label>
          <VirtualBackgroundOptions isDark={isDark} />
        </div>
      )}
      {flexEnabled ? (
        <div className="text-center">
          <Label>
            Send Patient Telehealth Video Link to Patient Phone ex:
            (+12345678910)
          </Label>
          <div className="flex flex-row justify-center px-5">
            <Input
              className="rounded-r-none border-r-0"
              placeholder="Patient Phone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <Button
              icon="mail"
              as="button"
              className="rounded-l-sm"
              onClick={sendMessage}
              disabled={phoneNumber.length ? false : true}
            />
          </div>
          {!isPhoneDigits ? (
            <div className="text-primary mt-2">
              {
                'Phone Number should be in E.164 Format ex: "+14083334444" without hyphens'
              }
            </div>
          ) : (
            <></>
          )}
          {!isValidPhoneFormat ? (
            <div className="text-primary mt-2">Phone not in a valid format</div>
          ) : (
            <></>
          )}
          <div className="my-5 font-bold ">
            <Button as="button" onClick={startVisit}>
              Start Visit
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="my-5 font-bold text-center text-xs">
        Saved to your Twilio account
      </div>
    </div>
  );
};
