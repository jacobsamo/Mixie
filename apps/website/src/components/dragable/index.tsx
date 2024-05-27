// export * from "./draggable-container";
// export * from "./draggable-item";
"use client";
import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region";
import { DragHandleButton } from "@atlaskit/pragmatic-drag-and-drop-react-accessibility/drag-handle-button";
import { DropIndicator } from "./drop-indicator";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { cn } from "@/lib/utils";
import { Span } from "next/dist/trace";

type DraggableState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement }
  | { type: "dragging" };

const idleState: DraggableState = { type: "idle" };
const draggingState: DraggableState = { type: "dragging" };

type DraggableContextValue = {
  instanceId: symbol;
};

const DraggableContext = createContext<DraggableContextValue | null>(null);

function useDraggableContext() {
  const draggableContext = useContext(DraggableContext);
  if (!draggableContext) {
    throw new Error(
      "useDraggableContext must be used within a DraggableContainer"
    );
  }
  return draggableContext;
}

/**
 * A wrapper around the item you want to drag has to be in a `DraggableContainer`
 */
export const DraggableItem = ({
  children,
  itemId,
  index,
}: {
  children: React.ReactNode;
  itemId: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [draggableState, setDraggableState] =
    useState<DraggableState>(idleState);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  const { instanceId } = useDraggableContext();

  useEffect(() => {
    const element = ref.current;

    const initialData = { type: "grid-item", index, itemId, instanceId };

    return combine(
      draggable({
        element: element!,
        getInitialData: () => initialData,
        onDragStart() {
          setDraggableState(draggingState);
        },
        onDrop() {
          setDraggableState(idleState);
        },
      }),

      dropTargetForElements({
        element: element!,
        // getData: () => (initialData),
        getIsSticky: () => true,
        canDrop: ({ source }) =>
          source.data.instanceId === instanceId &&
          source.data.type === "grid-item" &&
          source.data.itemId !== itemId,
        getData({ input }) {
          return attachClosestEdge(initialData, {
            element: element!,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDrag({ self, source }) {
          const isSource = source.element === element;
          if (isSource) {
            setClosestEdge(null);
            return;
          }

          const closestEdge = extractClosestEdge(self.data);

          const sourceIndex = source.data.index as number;
          // invariant(typeof sourceIndex === 'number');

          const isItemBeforeSource = index === sourceIndex - 1;
          const isItemAfterSource = index === sourceIndex + 1;

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === "bottom") ||
            (isItemAfterSource && closestEdge === "top");

          if (isDropIndicatorHidden) {
            setClosestEdge(null);
            return;
          }

          setClosestEdge(closestEdge);
        },
        onDragLeave() {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        },
        // onDragEnter: () => setState('over'),
      })
    );
  }, [instanceId]);

  return (
    <>
      <div
        ref={ref}
        className={cn("", {
          "opacity-50": draggableState.type === "dragging",
        })}
      >
        {/* {closestEdge === "top" && (
          <span className="z-1 pointer-events-none absolute bg-white before:absolute before:box-border before:border-white  "></span>
        )} */}
        {children}
        {closestEdge && <DropIndicator edge={closestEdge} />}
      </div>
      {draggableState.type === "preview" &&
        ReactDOM.createPortal(children, draggableState.container)}
    </>
  );
};

interface DraggableItemProps {
  droppableId: string;
  /**
   * Called when a draggable item is dropped, gives you the start and destination data will be of same type that you passed
   */
  onDragEnd: (startIndex: number, endIndex: number) => void;
  children: React.ReactNode;
}

/**
 * Provides an area for `DraggableItem`'s to be dragged around
 */
export function DraggableContainer({
  children,
  droppableId,
  onDragEnd,
}: DraggableItemProps) {
  const [instanceId] = useState(Symbol(droppableId));

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId;
      },
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        const startIndex = sourceData.index as number;
        const targetIndex = targetData.index as number;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        const finishIndex = getReorderDestinationIndex({
          startIndex,
          closestEdgeOfTarget,
          indexOfTarget: targetIndex,
          axis: "vertical",
        });

        console.log("New indexs: ", {
          startIndex,
          targetIndex,
          finishIndex,
          closestEdgeOfTarget,
        });

        if (finishIndex === startIndex) {
          // If there would be no change, we skip the update
          return;
        }

        onDragEnd(startIndex, finishIndex);
      },
    });
  }, [instanceId]);

  const contextValue = useMemo(() => ({ instanceId }), [instanceId]);

  return (
    <DraggableContext.Provider value={contextValue}>
      {children}
    </DraggableContext.Provider>
  );
}
