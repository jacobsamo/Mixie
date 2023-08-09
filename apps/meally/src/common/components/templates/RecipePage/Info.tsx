import type { Info, NewInfo } from '@/src/db/types';
import React from 'react';
import { PieChart, Clock, Timer, AlarmClock } from 'lucide-react';

interface InfoProps {
  info: Info | NewInfo;
}

const Info = ({ info }: InfoProps) => {
  return (
    <ul className="flex flex-wrap gap-4 pb-4">
      <li className="flex flex-row items-center gap-1">
        <PieChart className="w-6 h-6" />
        {info?.serves || 1} {info?.serves == 1 ? 'serving' : 'servings'}
      </li>
      <li className="flex flex-row items-center gap-1">
        <Clock className="w-6 h-6" />
        Prep {info.prep}
      </li>
      <li className="flex flex-row items-center gap-1">
        <AlarmClock className="w-6 h-6" />
        Cook {info.cook}
      </li>
      <li className="flex flex-row items-center gap-1">
        <Timer className="w-6 h-6" />
        Total {info.total}
      </li>
    </ul>
  );
};

export default Info;
