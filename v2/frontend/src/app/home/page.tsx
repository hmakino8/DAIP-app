"use client";

import { Header } from "@/common/components/Header";
import { Footer } from "@/common/components/Footer";
import { getAuthenticatedUser } from "@/common/hooks/getAuthenticatedUser";
import { Footer2 } from "@/common/components/Footer2";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Account } from "./components/Account";
import { Login } from "./components/Login";
import useSWR, { mutate } from "swr";
import type { UserInfo } from "../common/types";
import { Signup } from "./components/Signup";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 max-w-lg mx-auto flex justify-center items-center shadow-2xl">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-100 rounded-full animate-[spin_2s_ease-in-out_infinite]">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-gray-200 rounded-full animate-[spin_1s_cubic-bezier(0.6,0.2,0.4,0.8)_infinite] border-t-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<string>("DeactivateClose");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const user: UserInfo | null = await getAuthenticatedUser();
      setUserInfo(user);
    } catch (error) {
      console.error("ユーザー情報取得エラー:", error);
      setUserInfo(null);
    }
  };

  const handleActiveModal = async (modalName: string) => {
    setActiveModal(modalName);
    if (modalName == "DeactivateDone") {
      await fetchUserInfo();
    }
  };

  useEffect(() => {
    if (activeModal !== "DeactivateDone" && activeModal !== "DeactivateClose") {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [activeModal]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = async (
    handleActiveModal: (activeModal: string) => void
  ) => {
    try {
      const csrfResponse = await fetch(
        "http://localhost:8000/api/get-csrf-token/",
        {
          credentials: "include",
        }
      );
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });

      if (response.ok) {
        handleActiveModal("DeactivateDone");
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウトエラー:");
    }
  };

  return (
    <>
      <div className="mt-10">
        <Header
          userInfo={userInfo}
          activeModal={activeModal}
          handleActiveModal={handleActiveModal}
        />
      </div>
      <div className="relative w-full">
        <div className="relative">
          <img
            src="/images/Smart_deicafé.png"
            alt="Smart_deicafé"
            className="object-cover w-full"
          />
        </div>
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm w-20 md:text-lg text-green-400 border border-green-400 rounded-lg hover:opacity-80 transition-all duration-200">
          予約する
        </button>
      </div>
      {userInfo && (
        <div className="p-5 mt-5 w-full bg-orange-50">
          <p className="mt-3 font-bold w-full text-2xl text-start">
            Reservation
          </p>
          <div className="w-full my-5 h-[100px] bg-white rounded-md"></div>
          <div className="w-full my-5 h-[100px] bg-white rounded-md"></div>
        </div>
      )}
      <div className="p-5 h-auto w-full bg-gray-50 text-sm pb-28">
        <p className="font-bold w-full text-2xl text-start">Information</p>

        <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
          <div className="w-1/3 min-w-[120px]">
            <img
              src="/images/Mango_Yogurt_smoothie.png"
              alt="Mango_Yogurt_smoothie"
              width={120}
              height={120}
              className="object-cover border rounded-md"
            />
          </div>
          <div className="w-2/3 pl-4">
            <div className="h-4/5 overflow-y-auto">
              <p className="break-words">
                ・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
              </p>
            </div>
            <div className="h-1/5 text-blue-500">続きを見る</div>
          </div>
        </div>

        <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
          <div className="w-1/3 min-w-[120px]">
            <img
              src="/images/Non_alcohol_Mojito.jpg"
              alt="Non_alcohol_Mojito"
              width={120}
              height={120}
              className="object-cover border rounded-md"
            />
          </div>
          <div className="w-2/3 pl-4">
            <div className="overflow-y-auto">
              <p className="break-words text-gray-600">
                [新商品情報]
                <br />
                ノンアルコール モヒート
              </p>
            </div>
            <button className="mt-3 text-blue-500 hover:underline">
              続きを見る
            </button>
          </div>
        </div>

        <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
          <div className="w-1/3 min-w-[120px]">
            <img
              src="/images/Very_Berry_smoothie.png"
              alt="Very_Berry_smoothie"
              width={120}
              height={120}
              className="object-cover border rounded-md"
            />
          </div>
          <div className="w-2/3 pl-4">
            <div className="h-4/5 overflow-y-auto">
              <p className="break-words">
                ・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
                ・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
              </p>
            </div>
            <div className="h-1/5 text-blue-500 underline">続きを見る</div>
          </div>
        </div>
      </div>
      {!userInfo && <Footer handleActiveModal={handleActiveModal} />}
      <Footer2 />
      <AnimatePresence>
        {activeModal === "Account" && (
          <motion.div
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            <Account
              userName={userInfo?.username}
              email={userInfo?.email}
              handleLogout={() => handleLogout(handleActiveModal)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal === "Login" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            <Login handleActiveModal={handleActiveModal} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal === "Signup" && (
          <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            <Signup handleActiveModal={handleActiveModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
