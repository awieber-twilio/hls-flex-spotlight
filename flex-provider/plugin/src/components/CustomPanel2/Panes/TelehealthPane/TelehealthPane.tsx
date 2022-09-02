import { getBasePath } from "../../../../helpers";
import React, { useEffect, useState } from "react";
import { TelehealthPaneStyles } from "./TelehealthPane.Styles";

interface TelehealthPaneProps {
  nurseName: string;
}

const TelehealthPane = ({ nurseName }: TelehealthPaneProps) => {
  const [passcode, setPasscode] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      await fetch(
        `https://${process.env.REACT_APP_TELEHEALTH_HOSTNAME}/visit/token`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "PROVIDER",
            id: "d1000",
          }),
        }
      )
        .then((resp) => resp.json())
        .then((res) => setPasscode(res.passcode))
        .catch((err) => console.error(err));
    };
    void fetchToken();
  }, []);

  return (
    <TelehealthPaneStyles>
      {passcode && (
        <>
          <iframe
            className="telehealth"
            allow="camera; microphone"
            src={
              "https://" +
              process.env.REACT_APP_TELEHEALTH_HOSTNAME +
              "/provider/index.html?" +
              `token=${passcode}&name=${nurseName}&flex_enabled=1`
            }
          />
        </>
      )}
    </TelehealthPaneStyles>
  );
};

export default TelehealthPane;
