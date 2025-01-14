"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "../types";

// export const getAuthenticatedUser = (activeModal: string) => {
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/user/", {
//           credentials: "include",
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUserInfo(data);
//           router.push("/accounts/login");
//           router.push("/home");
//         } else {
//           console.log("ゲストユーザー");
//         }
//       } catch (error) {
//         console.error("ユーザー情報の取得に失敗:", error);
//         router.push("/accounts/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [activeModal]);

//   return { userInfo, isLoading };
// };

export const getAuthenticatedUser = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/user/", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data: UserInfo = await response.json();
    return data;
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return null;
  }
};
