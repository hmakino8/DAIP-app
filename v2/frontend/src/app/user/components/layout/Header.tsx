import { useScreen } from "@/user/hooks/useScreen";
import { useAuth } from "@/user/hooks/useAuth";
import { NavigationButton } from "../ui/NavigationButton";
import { PopUp } from "../ui/PopUp";

export const Header = () => {
  const { activeScreen } = useScreen();

  return (
    <div className="z-50 fixed top-[-2px] left-0 right-0 max-w-lg px-3 mx-auto bg-white border-b-1 text-black h-10 shadow-md">
      {activeScreen !== "Home" ? <CartMenuReserveHeader /> : <HomeHeader />}
      <PopUp />
    </div>
  );
};

const CartMenuReserveHeader = () => {
  const { activeScreen, setActiveScreen } = useScreen();

  return (
    <>
      <div className="flex text-lg my-1">
        <button
          className="flex hover:bg-gray-100 transition-all duration-200 rounded-full w-8 h-8 items-center justify-center"
          onClick={() => setActiveScreen("Home")}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="fixed left-1/2 -translate-x-1/2">{activeScreen}</div>
      </div>
    </>
  );
};

const HomeHeader = () => {
  const { user } = useAuth();
  const { setActiveScreen } = useScreen();

  return (
    <>
      <div className="flex justify-between items-center my-1">
        <div className="text-black text-lg">
          こんにちは{user && `、${user.username}さん`}
        </div>
        <div className="flex text-gray-500">
          <NavigationButton
            icon="account_circle"
            label="Account"
            onClick={
              user
                ? () => setActiveScreen("Account")
                : () => setActiveScreen("Login")
            }
          />
        </div>
      </div>
    </>
  );
};
