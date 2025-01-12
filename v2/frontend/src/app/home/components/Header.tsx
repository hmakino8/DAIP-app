"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type UserInfo = {
  username: string;
  email: string;
  role: string;
};

export const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          // router.push("/accounts/login");
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗:", error);
        router.push("/accounts/login");
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
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
        router.push("/accounts/login");
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウトエラー:");
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 max-w-lg mx-auto bg-white border-b-2  text-black h-20 flex items-center justify-between z-10 shadow-md">
      <div className="p-3">
        <img
          src="/images/deicafé_logo.png"
          alt="deicafé_logo"
          width={60}
          height={60}
          className="object-cover rounded-sm"
        />
      </div>
      <div className="flex text-gray-500">
        <button className="flex flex-col mx-5 items-center bg-transparent hover:opacity-80">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
          >
            menu_book
          </span>
          <p className="text-[12px]">Menu</p>
        </button>
        <button className="flex flex-col mx-5 items-center bg-transparent hover:opacity-80">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
          >
            shopping_cart
          </span>
          <p className="text-[12px]">Cart</p>
        </button>

        <button className="flex flex-col mx-5 items-center bg-transparent hover:opacity-80">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
          >
            account_circle
          </span>
          <p className="text-[12px]">Account</p>
        </button>
        <div className="absolute top-[80px] right-0 z-10 w-60 h-[170px] p-3 text-sm bg-white border border-gray-200">
          <div className="mb-3">
            <div>ユーザー名</div>
            <div className="text-black">{userInfo?.username}</div>
          </div>
          <div className="mb-5">
            <div>メールアドレス</div>
            <div className="text-black">{userInfo?.email}</div>
          </div>
          <button
            className="mb-5 w-20 text-gray-500 hover:bg-gray-50 border border-gray-500 rounded-lg"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};
