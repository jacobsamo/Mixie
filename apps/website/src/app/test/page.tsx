"use client";
import React, { useState } from "react";
import { Step as TStep } from "@/types";
import { DraggableContainer, DraggableItem } from "@/components/dragable";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import Ingredients from "@/components/recipe-form/steps/ingredients";
import Step from "@/components/recipe-page/step/step";

export const dynamic = "force-dynamic";

const defaultItems: { id: number; text: string }[] = [
  {
    id: 0,
    text: "Organize a team-building event",
  },
  {
    id: 1,
    text: "Create and maintain office inventory",
  },
  {
    id: 2,
    text: "Update company website content",
  },
  {
    id: 3,
    text: "Plan and execute marketing campaigns",
  },
  {
    id: 4,
    text: "Coordinate employee training sessions",
  },
  {
    id: 5,
    text: "Manage facility maintenance",
  },
  {
    id: 6,
    text: "Organize customer feedback surveys",
  },
  {
    id: 7,
    text: "Coordinate travel arrangements",
  },
];

const Testing = () => {
  const [items, setItems] = useState(defaultItems);
  const [instanceId] = useState(Symbol("instance-id"));

  function handleDragEnd(startIndex, endIndex) {
    console.log("startIndex", startIndex, "endIndex", endIndex);
    const newArray = reorder({
      list: items,
      startIndex,
      finishIndex: endIndex,
    });
    setItems(newArray);
  }

  return (
    <div className="h-full w-full">
      <DraggableContainer droppableId="list" onDragEnd={handleDragEnd}>
        {items.map((item, index) => (
          <DraggableItem key={index} itemId={item.text} index={index}>
            <li className="mt-2 rounded-sm bg-green-500">
              {item.id} {item.text}
            </li>
          </DraggableItem>
        ))}
      </DraggableContainer>
    </div>
  );
};

export default Testing;
