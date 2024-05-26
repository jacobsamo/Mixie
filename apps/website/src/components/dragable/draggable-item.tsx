import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useDraggableContext } from './draggable-container';
import { GripVertical } from 'lucide-react';

type DraggableItemProps = {
  children: ReactNode;
  index: number;
  itemId: string;
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  children,
  index,
  itemId,
}) => {
  const { registerItem, instanceId } = useDraggableContext();
  const ref = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = ref.current;
    const dragHandle = dragHandleRef.current;

    if (!element || !dragHandle) {
      return;
    }

    const data = { itemId, index, instanceId };

    const unregisterItem = registerItem({ itemId, element });

    draggable({
      element: element,
      getInitialData: () => data,
    });

    dropTargetForElements({
      element,
      getData: () => data,
    });

    return () => {
      unregisterItem();
    };
  }, [itemId, index, instanceId, registerItem]);

  return (
    <div ref={ref} className="relative  border-b border-gray-300 last:border-0">
      <button ref={dragHandleRef} className="cursor-move">
        <GripVertical />
        <span className="sr-only">Drag handle</span>
      </button>
      <div className="p-4">{children}</div>
    </div>
  );
};
