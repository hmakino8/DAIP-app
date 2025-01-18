import { POPUP } from "@/user/constants";
import { useAuth } from "./useAuth";
import { useUIState } from "./useUIState";

export const useLogout = () => {
  const { logout } = useAuth();
  const { handleScreenTransition, setPopUp } = useUIState();

  const handleLogout = async () => {
    try {
      await logout();
      handleScreenTransition("Home");
      setPopUp(POPUP["logout"]);
    } catch (error) {
      console.error("ERROR: handleLogout");
    }
  };
  return { handleLogout };
};
