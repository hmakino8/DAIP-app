"use client";

import { useLogin } from "./useLogin";
import { AuthLayout } from "@/accounts/components/AuthLayout";
import { AuthForm } from "@/accounts/components/AuthForm";

export default function LoginPage() {
  const { handleSubmit, loginFormData, formValues, handleChange, message } =
    useLogin();

  return (
    <AuthLayout>
      <AuthForm
        formData={loginFormData}
        formValues={formValues}
        messages={{ message: [message] }}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        linkText="アカウントを作成する"
        linkHref="/accounts/signup"
        submitText="ログイン"
        submitTextColor="bg-blue-500"
      />
    </AuthLayout>
  );
}
