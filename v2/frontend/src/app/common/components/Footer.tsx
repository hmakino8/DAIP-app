"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <div className="right-[calc(50%-180px)] text-white">
      <Link
        className="fixed bottom-48 w-20 h-10 sm:right-[calc(50%-220px)] flex items-center justify-center bg-blue-500 hover:bg-blue-400 border border-blue-500 rounded-full shadow-xl"
        href="/accounts/login"
      >
        ログイン
      </Link>
      <Link
        className="fixed bottom-32 w-28 h-12 sm:right-[calc(50%-220px)] flex items-center justify-center bg-green-500 hover:bg-green-400 border border-green-500 rounded-full shadow-xl"
        href="/accounts/signup"
      >
        新規会員登録
      </Link>
    </div>
  );
};
