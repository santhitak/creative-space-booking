import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';

export interface StoreInterface {
  user: StoreUserAuth | null;
  setUser: (user: StoreInterface['user']) => void;
}

export interface StoreUserAuth {
  id: string;
  email: string;
  name: string;
  studentId: string;
}

const getDefaultInitialState = () => ({
  user: null,
});

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext);

  if (!store) throw new Error('Store is missing the provider');

  return useZustandStore(store, selector);
};

export const initializeStore = (
  preloadedState: Partial<StoreInterface> = {}
) => {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setUser: (user: StoreUserAuth | null) => {
      set({
        user,
      });
    },
  }));
};
