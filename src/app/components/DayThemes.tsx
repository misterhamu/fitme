"use client"
import React, { useEffect, useState } from "react";

type Props = {};

export default function DayThemes({}: Props) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });

  const [color, setColor] = useState<string>("");

  useEffect(() => {
    let colors = [
      "bg-red-500",
      "bg-yellow-400",
      "bg-pink-400",
      "bg-green-400",
      "bg-orange-400",
      "bg-blue-400",
      "bg-purple-400",
    ];
    setColor(colors[today.getDay()]);
  }, []);

  return <div className={`absolute ${color} h-full w-[5px] left-0`}></div>;
}
