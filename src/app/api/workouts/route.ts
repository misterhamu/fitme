import { NextResponse } from "next/server";
import Monday from "../../assets/monday.json";
import WorkoutType from "../../assets/type.json";
import { Workout } from "@/app/page";

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const data = () => {
  const workout = Monday;
  return workout.map((d) =>
    Object.assign({ detail: WorkoutType[d.type - 1] }, d)
  );
};

let workouts: Workout[] = data();
let completedWorkout: Workout[] = [];

export const GET = async () => {
  return NextResponse.json(
    {
      message: "Success",
      data: {
        current: workouts[0],
        incoming: workouts,
        completed: completedWorkout,
      },
    },
    {
      status: 200,
    }
  );
};

export const POST = async () => {
  completedWorkout.push(workouts[0]);
  workouts.shift();
  return NextResponse.json(
    {
      message: "Success",
    },
    { status: 200 }
  );
};

export const DELETE = async () => {
  workouts = completedWorkout;
  completedWorkout = [];
  return NextResponse.json(
    {
      message: "Success",
    },
    { status: 200 }
  );
};
