import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { NavigationButton } from "./NavigationButton";

export const Footer2 = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="z-10 fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/90 backdrop-blur-sm border-b-2 h-20 flex items-center shadow-2xl">
      <div className="w-full flex text-gray-500">
        <NavigationButton
          icon="home"
          label="Home"
          onClick={() => router.push("/home")}
          isActive={pathname === "/home"}
        />
        <NavigationButton
          icon="shopping_cart"
          isActive={pathname === "/cart"}
          label="Cart"
          onClick={() => router.push("/cart")}
        />
        <NavigationButton
          icon="menu_book"
          label="Menu"
          onClick={() => router.push("/menu")}
          isActive={pathname === "/menu"}
        />
        <NavigationButton
          icon="calendar_month"
          label="Reserve"
          onClick={() => router.push("/reserve")}
          isActive={pathname === "/reserve"}
        />
      </div>
    </div>
  );
};
