import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signupFormData } from "../config";
import type { ValidationErrors } from "../types";

export const useSignup = (handleActiveModal: (activeModal: string) => void) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const [messages, setMessages] = useState<ValidationErrors>({});
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const csrfResponse = await fetch(
        "http://localhost:8000/api/get-csrf-token/",
        {
          credentials: "include",
        }
      );
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(formValues),
        credentials: "include",
      });

      const data: ValidationErrors = await response.json();
      console.log(data);

      if (response.ok) {
        handleActiveModal("Login");
      } else {
        const errorMessages: ValidationErrors = {};

        for (const [field, errors] of Object.entries(data)) {
          errorMessages[field] = errors;
        }
        if (formValues.password != formValues.password_confirm) {
          errorMessages["password_confirm"] = ["パスワードが一致していません"];
        }
        setMessages(errorMessages);
      }
    } catch (error) {
      console.error("アカウント作成失敗", error);
      setMessages({
        "signup error": ["※アカウント作成中にエラーが発生しました。"],
      });
    }
  };

  return {
    handleSubmit,
    handleChange,
    formValues,
    messages,
    signupFormData,
  };
};
