import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginFormData } from "../config";
import { useSWRConfig } from "swr";
import type { ValidationErrors } from "../types";

export const useLogin = (handleActiveModal: (activeModal: string) => void) => {
  const { mutate } = useSWRConfig();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  // 一つのフィールドに対して複数のエラーメッセージが含まれる可能性があるため、
  // valueは配列で受け取る。
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const csrfResponse = await fetch(
        "http://localhost:8000/api/get-csrf-token/",
        {
          credentials: "include",
        }
      );
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(formValues),
        credentials: "include",
      });

      if (response.ok) {
        const userResponse = await fetch("http://localhost:8000/api/user/", {
          credentials: "include",
        });
        if (userResponse.ok) {
          handleActiveModal("DeactivateDone");
        }
      } else {
        console.log("不正なレスポンス");
        setMessage("メールアドレスもしくはパスワードが正しくありません");
      }
    } catch (error) {
      console.log("不正なログイン");
      setMessage("メールアドレスもしくはパスワードが正しくありません");
    }
  };

  return {
    handleSubmit,
    handleChange,
    formValues,
    message,
    loginFormData,
  };
};
