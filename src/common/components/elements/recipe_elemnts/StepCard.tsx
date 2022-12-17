import React from 'react'
import type { Step } from '@lib/types/recipe';

const StepCard = ({number, body}: Step) => {
  return (
    <>
        <div className='h-23 w-98 bg-white text-black dark:bg-grey dark:text-white'>
            <h1>{number}</h1>
            <p>{body}</p>
        </div>
    </>
  )
}

export default StepCard