import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { NavigationButton } from "./NavigationButton";

export const Footer2 = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="z-10 fixed bottom-0 left-0 right-0 max-w-lg px-3 mx-auto bg-white/90 backdrop-blur-sm border-b-2 h-20 flex items-center justify-center shadow-md">
      {/* <Link href="/home" className="p-3">
        <img
          src="/images/deicafé_logo.png"
          alt="deicafé_logo"
          width={60}
          height={60}
          className="object-cover rounded-sm"
        />
      </Link> */}
      <div className="flex text-gray-500">
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
