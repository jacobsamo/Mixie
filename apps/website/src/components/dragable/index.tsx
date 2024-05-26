// export * from "./draggable-container";
// export * from "./draggable-item";


"use client"
import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import * as liveRegion from '@atlaskit/pragmatic-drag-and-drop-live-region';
import { DragHandleButton } from '@atlaskit/pragmatic-drag-and-drop-react-accessibility/drag-handle-button';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';

  type ItemEntry = { itemId: string; element: HTMLElement };
  
  type DraggableContextValue = {
    getListLength: () => number;
    registerItem: (entry: ItemEntry) => () => void;
    reorderItem: (args: {
      startIndex: number;
      indexOfTarget: number;
      closestEdgeOfTarget: Edge | null;
    }) => void;
    instanceId: symbol;
  };
  
  const DraggableContext = createContext<DraggableContextValue | null>(null);
  
  function useDraggableContext() {
    const draggableContext = useContext(DraggableContext);
    if (!draggableContext) {
      throw new Error('useDraggableContext must be used within a DraggableContainer');
    }
    return draggableContext;
  }


  function getElementRegistry() {
    const registry = new Map<string, HTMLElement>();
  
    function register({ itemId, element }: ItemEntry) {
      registry.set(itemId, element);
  
      return function unregister() {
        registry.delete(itemId);
      };
    }
  
    function getElement(itemId: string): HTMLElement | null {
      return registry.get(itemId) ?? null;
    }
  
    return { register, getElement };
  }


interface DraggableItemProps<T> {
    dropableId: string;
    onDragEnd?: (drop: string) => void;
    children: React.ReactNode;
    listItems: T[];
}

  
type ElementState<T> = {
  items: T[];
  lastCardMoved: {
    item: T;
    previousIndex: number;
    currentIndex: number;
    numberOfItems: number;
  } | null;
};

/**
 * Provides an area for `DraggableItem`'s to be dragged around 
 */
export function DraggableContainer<TItems>({children, dropableId, onDragEnd, listItems}: DraggableItemProps<TItems>) {
  const [{ items, lastCardMoved }, setListState] = useState<ElementState<TItems>>({
    items: listItems,
    lastCardMoved: null,
  });
  const [registry] = useState(getElementRegistry);

  // Isolated instances of this component from one another
  const [instanceId] = useState(() => Symbol('instance-id'));

  const reorderItem = useCallback(
    ({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    }: {
      startIndex: number;
      indexOfTarget: number;
      closestEdgeOfTarget: Edge | null;
    }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: 'vertical',
      });

      if (finishIndex === startIndex) {
        // If there would be no change, we skip the update
        return;
      }

      setListState(listState => {
        const item = listState.items[startIndex];

        return {
          items: reorder({
            list: listState.items,
            startIndex,
            finishIndex,
          }),
          lastCardMoved: {
            item,
            previousIndex: startIndex,
            currentIndex: finishIndex,
            numberOfItems: listState.items.length,
          },
        };
      });
    },
    [],
  );

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return  source.data.instanceId === instanceId;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
    
        const indexOfTarget = items.findIndex(
          item => item.id === targetData.item.id,
        );
        if (indexOfTarget < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [instanceId, items, reorderItem]);

  // once a drag is finished, we have some post drop actions to take
  useEffect(() => {
    if (lastCardMoved === null) {
      return;
    }

    const { item, previousIndex, currentIndex, numberOfItems } = lastCardMoved;
    const element = registry.getElement(item.id);
    if (element) {
      triggerPostMoveFlash(element);
    }

    liveRegion.announce(
      `You've moved ${item.label} from position ${
        previousIndex + 1
      } to position ${currentIndex + 1} of ${numberOfItems}.`,
    );
  }, [lastCardMoved, registry]);

  // cleanup the live region when this component is finished
  useEffect(() => {
    return function cleanup() {
      liveRegion.cleanup();
    };
  }, []);

  const getListLength = useCallback(() => items.length, [items.length]);

  const contextValue: DraggableContextValue = useMemo(() => {
    return {
      registerItem: registry.register,
      reorderItem,
      instanceId,
      getListLength,
    };
  }, [registry.register, reorderItem, instanceId, getListLength]);

    return (
      <DraggableContext.Provider value={contextValue}>

        <div ref={ref}>
            {children}
        </div>
      </DraggableContext.Provider>
    )
}


/**
 * A wrapper around the item you want to drag has to be in a `DraggableContainer`
 */
export const DraggableItem = ({children}: {children: React.ReactNode}) => {
    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false); 

  useEffect(() => {
    const el = ref.current;

    return combine(
        dropTargetForElements({
            element: el,
            canDrop({ source }) {
              return (
                 source.data.instanceId === "steps"
              );
            },
            getData(input) {
                console.log('getData', input);
            //   return attachClosestEdge(data, {
            //     element: el,
            //     input,
            //     allowedEdges: ['top', 'bottom'],
            //   });
            }}),
        draggable({
            element: el,
            onDragStart: () => setDragging(true), // NEW
            onDrop: () => setDragging(false), // NEW
          })
    ) 
  }, []);



    return (
        <div ref={ref}>
            {children}
        </div>
    )

}