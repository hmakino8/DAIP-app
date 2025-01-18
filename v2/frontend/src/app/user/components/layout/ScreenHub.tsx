import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScreen } from "@/user/hooks/useScreen";
import { useAuth } from "@/user/hooks/useAuth";
import { useUIState } from "@/user/hooks/useUIState";
import { HomeScreen } from "../features/home/HomeScreen";
import { UserProfileScreen } from "../features/userProfile/UserProfileScreen";
import { LoginScreen } from "../features/auth/LoginScreen";
import { SignupScreen } from "../features/auth/SignupScreen";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const ScreenHub = () => {
  const { activeScreen } = useScreen();
  const { user } = useAuth();
  const { isLoading, popUp } = useUIState();

  const homeScreenAnimation = {
    as: motion.div,
    initial: { opacity: 0, y: -280 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -280 },
    transition: { duration: 0.5, delay: 0.3 },
  } as const;

  useEffect(() => {
    if (activeScreen !== "Home") {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [activeScreen]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {activeScreen === "Home" && (
        <AnimatePresence>
          {user && popUp ? (
            <motion.div {...homeScreenAnimation}>
              <HomeScreen />
            </motion.div>
          ) : (
            <HomeScreen />
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {activeScreen === "Account" && (
          <motion.div
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            <UserProfileScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeScreen === "Login" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            <LoginScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeScreen === "Signup" && (
          <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            <SignupScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
