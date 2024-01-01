import React, { useState } from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  callback: (reset: boolean) => void;
};

export default function DoneCard({ callback }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <Card
      isBlurred
      className="bg-green-300/30 max-w-[610px] border-none"
      shadow="sm"
    >
      <CardBody>
        <p className="text-xl text-center">
          You have completed all the workouts for the day. <br />
          <b>See you tomorrow! :)</b>
        </p>
        <Button
          isLoading={loading}
          className="mt-6 text-white font-semibold text-lg p-8"
          color="success"
          onClick={() => {
            setLoading(true);
            callback(true);
          }}
        >
          Workout again
        </Button>
      </CardBody>
    </Card>
  );
}
