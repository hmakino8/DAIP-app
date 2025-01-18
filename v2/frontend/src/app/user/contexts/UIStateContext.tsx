import { createContext } from "react";

type UIStateContextType = {
  popUp: string | undefined;
  setPopUp: (popUp: string | undefined) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  pendingScreen: string | null;
  handleScreenTransition: (screen: string | null) => void;
};

export const UIStateContext = createContext<UIStateContextType | undefined>(
  undefined
);
