import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop, DropTargetHookSpec } from "react-dnd";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";

export interface DraggableContainer {
  droppableId: string;
  onDragEnd: (result: DropResult) => void;
  children: React.ReactNode;
}

const DraggableContainer = ({
  droppableId,
  onDragEnd,
  children,
}: DraggableContainer) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-4"
          >
            {children}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContainer;
