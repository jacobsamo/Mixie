import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import { Info } from 'libs/types';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';

interface InfoComponentProps {
  info: Info;
  recipeName: string;
}

const InfoComponent = ({ info, recipeName }: InfoComponentProps) => {
  return (
    <>
      <ul
        className={`flex flex-row flex-wrap gap-2  p-1 pb-2 pl-0 items-start`}
      >
        <li className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" dark:fill-white fill-black"
            style={{ width: '1.5rem', height: '1.5rem' }}
          >
            <g data-name="Layer 2">
              <g data-name="pie-chart">
                <rect width="24" height="24" opacity="0" />
                <path d="M13 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 9 9 0 0 0-9-9zm1 8V4.07A7 7 0 0 1 19.93 10z" />
                <path d="M20.82 14.06a1 1 0 0 0-1.28.61A8 8 0 1 1 9.33 4.46a1 1 0 0 0-.66-1.89 10 10 0 1 0 12.76 12.76 1 1 0 0 0-.61-1.27z" />
              </g>
            </g>
          </svg>
          {info.serves} {recipeName}
        </li>
        <li className="flex flex-row items-center gap-1">
          <TimelapseOutlinedIcon
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
          Prep {info.prep}
        </li>
        <li className="flex flex-row items-center gap-1">
          <ClockIcon style={{ width: '1.5rem', height: '1.5rem' }} /> Cook{' '}
          {info.cook}
        </li>
        <li className="flex flex-row items-center gap-1">
          <TimerOutlinedIcon style={{ width: '1.5rem', height: '1.5rem' }} />
          Total {info.total}
        </li>
      </ul>
    </>
  );
};

export default InfoComponent;
