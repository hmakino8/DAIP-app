import { useState } from "react";
import { ScreenContext } from "./ScreenContext";
import { useAuth } from "@/user/hooks/useAuth";

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeScreen, setActiveScreen] = useState<string | null>("Home");
  const { user } = useAuth();

  const setActiveScreenCheckAuth = (screen: string | null) => {
    if (user) {
      setActiveScreen(screen);
    } else {
      setActiveScreen("Login");
    }
  };

  return (
    <ScreenContext.Provider
      value={{ activeScreen, setActiveScreen, setActiveScreenCheckAuth }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
