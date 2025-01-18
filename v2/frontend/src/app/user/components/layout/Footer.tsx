import { NavigationButton } from "../ui/NavigationButton";
import { useScreen } from "@/user/hooks/useScreen";

export const Footer = () => {
  const { activeScreen, setActiveScreen } = useScreen();

  return (
    <div className="z-50 fixed pb-10 pt-3 bottom-0 left-0 right-0 max-w-lg bg-white mx-auto h-auto flex items-center">
      <div className="w-full flex text-gray-500">
        <NavigationButton
          icon="home"
          label="Home"
          isActive={activeScreen === "Home"}
          onClick={() => setActiveScreen("Home")}
        />
        <NavigationButton
          icon="shopping_cart"
          label="Cart"
          isActive={activeScreen === "Cart"}
          onClick={() => setActiveScreen("Cart")}
        />
        <NavigationButton
          icon="menu_book"
          label="Menu"
          isActive={activeScreen === "Menu"}
          onClick={() => setActiveScreen("Menu")}
        />
        <NavigationButton
          icon="calendar_month"
          label="Reserve"
          isActive={activeScreen === "Reserve"}
          onClick={() => setActiveScreen("Reserve")}
        />
      </div>
    </div>
  );
};
