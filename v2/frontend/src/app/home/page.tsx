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

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <div className="animate-spin h-20 w-20 border-4 border-green-400 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<string>("");
  const { userInfo, isLoading } = getAuthenticatedUser(activeModal);
  const router = useRouter();

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [activeModal]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = async (
    setActiveModal: (activeModal: string) => void
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
        setActiveModal("");
        router.refresh();
        // setActiveModal("Login");
        // router.push("/home");
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
          setActiveModal={setActiveModal}
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
      <div className="p-5 h-auto w-full bg-gray-50 text-sm mb-20">
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
      {!userInfo && <Footer />}
      <Footer2 />
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-lg mx-auto z-20 top-10 right-0 left-0 flex items-center justify-center"
          >
            {activeModal === "Account" && (
              <Account
                userName={userInfo?.username}
                email={userInfo?.email}
                handleLogout={() => handleLogout(setActiveModal)}
              />
            )}
            {activeModal === "Login" && (
              <Login setActiveModal={setActiveModal} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
