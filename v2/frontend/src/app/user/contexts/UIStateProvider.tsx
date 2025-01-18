import { useState } from "react";
import { UIStateContext } from "./UIStateContext";

export const UIStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popUp, setPopUp] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingScreen, setPendingScreen] = useState<string | null>(null);

  const handleScreenTransition = (screen: string | null) => {
    setIsLoading(true);
    setPendingScreen(screen);
  };

  return (
    <UIStateContext.Provider
      value={{
        popUp,
        setPopUp,
        isLoading,
        setIsLoading,
        pendingScreen,
        handleScreenTransition,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};
