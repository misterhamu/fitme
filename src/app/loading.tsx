import React from "react";
import Image from "next/image";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="absolute left-0 -top-20  w-screen h-screen z-50 bg-black/20">
      <div className="flex justify-center items-center h-screen bg-white/80">
        <div className="loading"></div>
      </div>
    </div>
  );
}
