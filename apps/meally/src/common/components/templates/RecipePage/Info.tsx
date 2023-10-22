import type { Info, NewInfo } from "@db/types";
import React from "react";
import { PieChart, Clock, Timer, AlarmClock } from "lucide-react";

interface InfoProps {
  info: Info;
}

const Info = ({ info }: InfoProps) => {
  return (
    <ul className="flex flex-wrap gap-4 pb-4">
      <li className="flex flex-row items-center gap-1">
        <PieChart className="h-6 w-6" />
        {info?.serves || 1} {info?.serves == 1 ? "serving" : "servings"}
      </li>
      <li className="flex flex-row items-center gap-1">
        <Clock className="h-6 w-6" />
        Prep {info.prep}
      </li>
      <li className="flex flex-row items-center gap-1">
        <AlarmClock className="h-6 w-6" />
        Cook {info.cook}
      </li>
      <li className="flex flex-row items-center gap-1">
        <Timer className="h-6 w-6" />
        Total {info.total}
      </li>
    </ul>
  );
};

export default Info;
