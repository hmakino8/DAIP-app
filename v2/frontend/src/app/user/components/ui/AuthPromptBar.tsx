"use client";

import { useScreen } from "@/user/hooks/useScreen";

export const AuthPromptBar = () => {
  const { setActiveScreen } = useScreen();
  return (
    <div className="text-white">
      <button
        className="fixed bottom-48 w-20 h-10 right-[calc(50%-180px)] sm:right-[calc(50%-200px)] flex items-center justify-center bg-blue-500 hover:bg-blue-400 border border-blue-600 rounded-full shadow-xl"
        onClick={() => setActiveScreen("Login")}
      >
        ログイン
      </button>
      <button
        className="fixed bottom-32 w-28 h-12 right-[calc(50%-180px)] sm:right-[calc(50%-200px)] flex items-center justify-center bg-green-600 hover:bg-green-500 border border-green-700 rounded-full shadow-xl"
        onClick={() => setActiveScreen("Signup")}
      >
        新規会員登録
      </button>
    </div>
  );
};