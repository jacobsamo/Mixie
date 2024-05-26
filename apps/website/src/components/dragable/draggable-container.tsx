import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import * as liveRegion from '@atlaskit/pragmatic-drag-and-drop-live-region';

type DraggableContainerProps = {
  children: ReactNode;
  instanceId: symbol;
};

type ItemEntry = { itemId: string; element: HTMLElement };

type CleanupFn = () => void;

type ListContextValue = {
  getListLength: () => number;
  registerItem: (entry: ItemEntry) => CleanupFn;
  reorderItem: (args: {
    startIndex: number;
    indexOfTarget: number;
    closestEdgeOfTarget: string | null;
  }) => void;
  instanceId: symbol;
};

const ListContext = createContext<ListContextValue | null>(null);

function useListContext() {
  const listContext = useContext(ListContext);
  if (!listContext) throw new Error('useListContext must be used within a ListProvider');
  return listContext;
}

function getItemRegistry() {
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

export const DraggableContainer: React.FC<DraggableContainerProps> = ({
  children,
  instanceId,
}) => {
  const [items, setItems] = useState<any[]>([]); // Your items state here
  const [lastCardMoved, setLastCardMoved] = useState<any>(null);
  const [registry] = useState(getItemRegistry);

  const reorderItem = useCallback(
    ({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    }: {
      startIndex: number;
      indexOfTarget: number;
      closestEdgeOfTarget: string | null;
    }) => {
      const finishIndex = indexOfTarget;

      if (finishIndex === startIndex) {
        return;
      }

      setItems((prevItems) => {
        const item = prevItems[startIndex];

        return reorder({
          list: prevItems,
          startIndex,
          finishIndex,
        });
      });
    },
    []
  );

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        const indexOfTarget = items.findIndex(
          (item) => item.id === targetData.item.id
        );
        if (indexOfTarget < 0) {
          return;
        }

        const closestEdgeOfTarget = targetData.closestEdge;

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [instanceId, items, reorderItem]);

  useEffect(() => {
    if (lastCardMoved === null) {
      return;
    }

    const { item, previousIndex, currentIndex, numberOfItems } = lastCardMoved;
    const element = registry.getElement(item.id);
    if (element) {
      liveRegion.announce(
        `You've moved ${item.label} from position ${
          previousIndex + 1
        } to position ${currentIndex + 1} of ${numberOfItems}.`
      );
    }
  }, [lastCardMoved, registry]);

  const getListLength = useCallback(() => items.length, [items.length]);

  const contextValue: ListContextValue = useMemo(() => {
    return {
      registerItem: registry.register,
      reorderItem,
      instanceId,
      getListLength,
    };
  }, [registry.register, reorderItem, instanceId, getListLength]);

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};

export const useDraggableContext = useListContext;
