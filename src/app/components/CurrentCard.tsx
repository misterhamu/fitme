"use client";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import React, { useState } from "react";
import { DiscordIcon, Done, Reset } from "./Icons";
import { border } from "../libs/common";
import workOutType from "../assets/type.json";
import { Workout } from "../page";
import { useRest } from "../context/restContext";

type Props = {
  workout: Workout;
  callback: (workout: Workout) => void;
};

export default function CurrentCard({ workout, callback }: Props) {
  const [sets, setSets] = useState(1);
  const Rest = useRest();

  const handleSet = () => {
    if (sets - 1 < workOutType[workout.type - 1].sets) {
      setSets((prev) => prev + 1);
      Rest.show();
      Rest.setRest(Number(workout.detail?.rest));
    } else {
      callback(workout);
      // resetSets();
    }
  };

  const resetSets = () => {
    setSets(1);
  };
  return (
    <Card
      isBlurred
      className={`bg-gray-200/60 dark:bg-gray-100/20 max-w-[610px] p-2 rounded-lg
      border-r-5 ${border[workout.type - 1]}`}
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 gap-6 items-center justify-center">
          <div className="flex flex-col col-span-6 ">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="text-2xl font-semibold text-foreground/90 max-w-[210px]">
                  {workout.name}
                </h3>
                <p className="text-xl text-foreground/80">
                  {workOutType[workout.type - 1].reps} reps
                </p>
              </div>
              <div>
                <p className="text-5xl">
                  {sets >= workOutType[workout.type - 1].sets
                    ? workOutType[workout.type - 1].sets
                    : sets}
                  <span className="text-xl">
                    / {workOutType[workout.type - 1].sets}
                  </span>
                </p>
                <p className="text-right">sets</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  color="default"
                  aria-label="reset"
                  variant="bordered"
                  onClick={resetSets}
                >
                  <Reset />
                </Button>
                <Button
                  onClick={() => {
                    callback(workout);
                    resetSets();
                  }}
                  isIconOnly
                  color="default"
                  aria-label="reset"
                  variant="bordered"
                >
                  <Done />
                </Button>
              </div>
              <Button
                color={`${
                  sets - 1 < workOutType[workout.type - 1].sets
                    ? "default"
                    : "success"
                }`}
                aria-label="done"
                onClick={handleSet}
              >
                <div className="flex">
                  <p className="text-xl color-white">
                    {sets - 1 < workOutType[workout.type - 1].sets
                      ? "Take A Rest"
                      : "Next Workout"}
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
