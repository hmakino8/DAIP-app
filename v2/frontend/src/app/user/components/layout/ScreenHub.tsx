import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScreen } from "@/user/hooks/useScreen";
import { useUIState } from "@/user/hooks/useUIState";
import { HomeScreen } from "../features/home/HomeScreen";
import { UserProfileScreen } from "../features/userProfile/UserProfileScreen";
import { LoginScreen } from "../features/auth/LoginScreen";
import { SignupScreen } from "../features/auth/SignupScreen";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { MenuScreen } from "../features/menu/MenuScreen";
import { ReservationScreen } from "../features/reservation/ReservationScreen";
import { SelectedProductScreen } from "../features/menu/SelectedProductScreen";

export const ScreenHub = () => {
  const { activeScreen } = useScreen();
  const { isLoading } = useUIState();

  useEffect(() => {
    if (activeScreen !== "Home") {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    console.log(activeScreen);
  }, [activeScreen]);

  return (
    <AnimatePresence>
      {isLoading && <LoadingSpinner />}
      {(activeScreen === "Home" || activeScreen === "Account") && (
        <motion.div
          key="Home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className="screen-layout pt-10 px-0 bg-orange-50 z-0"
        >
          <HomeScreen />
        </motion.div>
      )}

      {activeScreen === "Account" && (
        <motion.div
          key="Account"
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          exit={{ y: 1000 }}
          transition={{ duration: 0.3 }}
          className="screen-layout bg-gray-100"
        >
          <UserProfileScreen />
        </motion.div>
      )}

      {activeScreen === "Login" && (
        <motion.div
          key="Login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="screen-layout bg-gray-100"
        >
          <LoginScreen />
        </motion.div>
      )}

      {activeScreen === "Signup" && (
        <motion.div
          key="Signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="screen-layout bg-gray-100"
        >
          <SignupScreen />
        </motion.div>
      )}

      {(activeScreen === "Menu" ||
        activeScreen === "SelectedProductScreen" ||
        activeScreen === "Reservation") && (
        <>
          <motion.div
            key="Menu"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeScreen === "Menu" ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="screen-layout bg-white"
          >
            <MenuScreen />
          </motion.div>

          <motion.div
            key="SelectedProductScreen"
            initial={{ opacity: 0, y: -1000 }}
            animate={{
              opacity: activeScreen === "SelectedProductScreen" ? 1 : 0,
              y: activeScreen === "SelectedProductScreen" ? 0 : 1000,
            }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="screen-layout bg-white"
          >
            <SelectedProductScreen />
          </motion.div>

          <motion.div
            key="Reservation"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeScreen === "Reservation" ? 1 : 0,
              x: activeScreen === "Reservation" ? 0 : 1000,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="screen-layout bg-gray-100"
          >
            <ReservationScreen />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
