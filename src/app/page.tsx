"use client";
import { Divider, Progress, Accordion, AccordionItem } from "@nextui-org/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import Monday from "./assets/monday.json";
import CurrentCard from "./components/CurrentCard";
import IncomingCard from "./components/IncomingCard";
import { getDateFormat } from "./libs/common";
import DoneCard from "./components/DoneCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { WorkoutData } from "@/types/index";

export interface Workout {
  name: string;
  type: number;
  isometric: boolean;
  superset: boolean;
  images: string[];
  link: string;
  detail?: WorkoutType;
}

export interface WorkoutType {
  type: number;
  name: string;
  color: string;
  reps: number;
  sets: number;
  rest: number;
}

export default function Home() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const workout = useWorkout();
  const maxValue = workout.incoming.length;
  const [percent, setPercent] = useState(0);

  const handleCurrent = useCallback((input: Workout) => {
    if (!input) {
      return;
    }
    completeWorkout.mutate("POST");
  }, []);

  const handleReset = useCallback((input: boolean) => {
    if (!input) {
      return;
    }
    completeWorkout.mutate("DELETE");
  }, []);

  useEffect(() => {
    if (workout.query.isSuccess) {
      setPercent(
        (1 -
          workout.incoming.length /
            (workout.incoming.length + workout.completed.length)) *
          100
      );
    }
  }, [workout.query.isFetching]);

  const completeWorkout = useMutation({
    mutationKey: ["completeWorkout"],
    mutationFn: async (method: string) => {
      const data = await fetch("/api/workouts", {
        method: method,
      });
      if (!data.ok) {
        throw new Error();
      }
      return data.json();
    },
    onMutate: () => {},
    onSuccess: (data) => {
      workout.query.refetch();
    },
    onSettled: () => {},
  });

  if (workout.isLoading) {
    return <>Loading ...</>;
  }
  return (
    <>
      <div className="p-2">
        <Progress
          label={getDateFormat(today)}
          size="md"
          value={percent}
          maxValue={100}
          color="default"
          showValueLabel={true}
          className="font-semibold"
        />
      </div>

      {/* Current */}
      {workout.current ? (
        <>
          <div className="mb-6 p-2">
            <CurrentCard workout={workout.current} callback={handleCurrent} />
          </div>
        </>
      ) : (
        <div className="p-2">
          <DoneCard callback={handleReset}/>
        </div>
      )}

      {/* Incoming */}
      {workout.incoming.length > 1 && (
        <>
          <Divider className="my-4" />

          <div className=" p-2">
            <p className="text-lg font-semibold mb-2">Incoming</p>

            <div className="flex flex-col gap-6">
              {workout.incoming
                .filter((workout, index) => index > 0)
                .map((workout, key) => (
                  <IncomingCard workout={workout} key={key} />
                ))}
            </div>
          </div>
        </>
      )}

      {/* Completed */}
      {workout.completed.length > 0 && (
        <>
          <div className="">
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Completed"
                title="Completed"
                className="text-lg font-semibold mb-2 text-gray-400"
              >
                <div className="flex flex-col gap-6">
                  {workout.completed.map((workout, key) => (
                    <IncomingCard
                      workout={workout}
                      key={key}
                      isComplete={true}
                    />
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      )}
    </>
  );
}

const useWorkout = () => {
  const query = useQuery({
    queryKey: ["workout"],
    queryFn: async () => {
      const data = await fetch("/api/workouts");
      if (!data.ok) {
        throw new Error();
      }
      const result = await data.json();
      return result.data as WorkoutData;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    isLoading: query.isLoading || query.isFetching,
    current: query.data?.current || null,
    incoming: query.data?.incoming || [],
    completed: query.data?.completed || [],
    query: query,
  };
};
