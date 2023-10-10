import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";

export interface DraggableItemProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

const DraggableItem = ({ id, index, children }: DraggableItemProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-row items-center hover:cursor-pointer"
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
