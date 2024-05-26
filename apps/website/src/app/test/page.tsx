"use client";
import React, { useState } from 'react'
import {Step} from "@/types"
import { DraggableContainer, DraggableItem } from '@/components/dragable';

const defaultItems: Step[] = [
    {
      text: 'Organize a team-building event',
    },
    {
      text: 'Create and maintain office inventory',
    },
    {
      text: 'Update company website content',
    },
    {
      text: 'Plan and execute marketing campaigns',
    },
    {
      text: 'Coordinate employee training sessions',
    },
    {
      text: 'Manage facility maintenance',
    },
    {
      text: 'Organize customer feedback surveys',
    },
    {
      text: 'Coordinate travel arrangements',
    },
  ];


const Testing = () => {
  const [instanceId] = useState(Symbol('instance-id'));

  return (
    <div>
       <DraggableContainer>
      {defaultItems.map((item, index) => (
        <DraggableItem key={index} index={index}>
          {item.text}
        </DraggableItem>
      ))}
    </DraggableContainer>

    </div>
  )
}

export default Testing