import React, { useEffect, useState } from "react";
import { useRest } from "../context/restContext";
import { Button } from "@nextui-org/react";

type Props = {
  timeRest: number;
};

export default function Rest({ timeRest }: Props) {
  const [timer, setTimer] = useState(timeRest);
  const rest = useRest();
  useEffect(() => {
    var timeleft = timeRest;
    var downloadTimer = setInterval(function () {
      timeleft--;
      setTimer(timeleft);
      if (timeleft < 0) {
        clearInterval(downloadTimer);
        rest.hide();
      }
    }, 1000);
  }, []);
  return (
    <div className="bg-green-600/95 fixed top-0 left-0 w-full h-full z-40">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-6">
          {timer != 0 && (
            <>
              <h1 className="text-9xl text-white">{timer}</h1>
              <h2 className="text-3xl font-semibold text-white">Take A Rest</h2>
            </>
          )}

          <Button
            color="default"
            variant="faded"
            onClick={() => {
              rest.hide();
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
