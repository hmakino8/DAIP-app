import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { NavigationButton } from "./NavigationButton";
import type { UserInfo } from "../types";

export const Header = ({
  userInfo,
  activeModal,
  setActiveModal,
}: {
  userInfo?: UserInfo | null;
  activeModal: string;
  setActiveModal: (activeModal: string) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/accounts/login" || pathname === "/accounts/signup") {
    return (
      <div className="fixed top-0 left-0 right-0 max-w-lg mx-auto bg-white border-b-2 text-black h-20 flex items-center justify-between shadow-md">
        <Link href="/home" className="p-3">
          <img
            src="/images/deicafé_logo.png"
            alt="deicafé_logo"
            width={60}
            height={60}
            className="object-cover rounded-sm"
          />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 text-xl">
          {pathname === "/accounts/login"
            ? "ログイン画面"
            : "SMART deicafé 会員登録"}
        </div>
      </div>
    );
  }

  return (
    <div className="z-10 fixed top-0 left-0 right-0 max-w-lg px-3 mx-auto bg-white/90 backdrop-blur-sm border-b-2 text-black h-10 flex items-center justify-between shadow-md">
      {activeModal ? (
        <div className="flex text-lg">
          <button
            className="flex hover:bg-gray-100 transition-all duration-200 rounded-full w-8 h-8 items-center justify-center"
            onClick={() => setActiveModal("")}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="fixed left-1/2 -translate-x-1/2">{activeModal}</div>
        </div>
      ) : (
        <>
          <div className="text-black text-lg">
            こんにちは{userInfo && `、${userInfo.username}さん`}
          </div>
          <div className="flex text-gray-500">
            <NavigationButton
              icon="account_circle"
              onClick={
                userInfo
                  ? () => setActiveModal("Account")
                  : () => setActiveModal("Login")
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
