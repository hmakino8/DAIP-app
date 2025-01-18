import { useState } from "react";
import { ScreenContext } from "./ScreenContext";

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeScreen, setActiveScreen] = useState<string | null>("Home");
  return (
    <ScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};
