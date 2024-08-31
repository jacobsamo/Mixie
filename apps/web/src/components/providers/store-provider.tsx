"use client";

import { type Store, createStore } from "@/lib/stores";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore as useZustandStore } from "zustand";

export type StoreApi = ReturnType<typeof createStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi>();
  
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be used within StoreProvider`);
  }

  return useZustandStore(storeContext, selector);
};
