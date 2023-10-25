import {
  DragDropContext,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

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
      <StrictModeDroppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-4"
            >
              {children}
            </div>
            {provided.placeholder}
          </>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default DraggableContainer;
