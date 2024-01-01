import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { Workout } from "../page";
import workOutType from "../assets/type.json";
import { Agi, Run, Spe, Str, Vit } from "./Icons";
import { border } from "../libs/common";

type Props = {
  workout: Workout;
  isComplete?: boolean;
};

export default function IncomingCard({ workout, isComplete }: Props) {
  const type = workOutType[workout.type - 1];
  const getIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Str />;
      case 2:
        return <Agi />;
      case 3:
        return <Vit />;
      case 4:
        return <Spe />;
      case 5:
        return <Run />;
    }
  };

  return (
    <Card
      isDisabled={isComplete}
      isBlurred
      className={`bg-background/60 dark:bg-default-100/50 max-w-[610px] p-2 rounded-lg
       border-r-5 ${border[type.type - 1]}`}
      shadow="sm"
    >
      <CardBody>
        <div className="grid ">
          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="ft">
              <div className="flex flex-col gap-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-foreground/90 ">
                    {workout.name}
                  </h3>
                  {getIcon(type.type)}
                </div>
                <div className="flex justify-between flex-row">
                  <p className="text-xl text-foreground/80">{type.reps} reps</p>
                  <p className="text-xl text-foreground/80">{type.sets} sets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
