import { NextResponse } from "next/server";
import Sunday from "../../assets/sunday.json";
import Monday from "../../assets/monday.json";
import Tuesday from "../../assets/tuesday.json";
import Wednesday from "../../assets/wednesday.json";
import Thursday from "../../assets/thursday.json";
import Friday from "../../assets/friday.json";
import Saturday from "../../assets/saturday.json";
import WorkoutType from "../../assets/type.json";
import { Workout } from "@/app/page";

const today = new Date();
today.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
today.setUTCHours(0, 0, 0, 0);
const data = () => {
  const daysOfWeek = [
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
  ];

  let workout = daysOfWeek[today.getDay()];

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
