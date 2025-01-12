import { FormField } from "./types";
import type { FormData } from "./types";

export const signupFormData: FormData = {
  username: {
    name: "username",
    type: "string",
    placeholder: "ユーザー名",
    required: true,
    autoFocus: true,
  },

  email: {
    name: "email",
    type: "email",
    placeholder: "メールアドレス",
    required: true,
  },

  password: {
    name: "password",
    type: "password",
    placeholder: "パスワード",
    required: true,
  },

  password_confirm: {
    name: "password_confirm",
    type: "password",
    placeholder: "パスワード確認",
    required: true,
  },
};

export const loginFormData: FormData = {
  username: {
    name: "username",
    type: "email",
    placeholder: "メールアドレス",
    required: true,
    autoFocus: true,
  },

  password: {
    name: "password",
    type: "password",
    placeholder: "パスワード",
    required: true,
  },
};
