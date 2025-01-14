"use client";

import { useSignup } from "./useSignup";
import { AuthLayout } from "@/accounts/components/AuthLayout";
import { AuthForm } from "@/accounts/components/AuthForm";

export default function SignupPage() {
  const { handleSubmit, signupFormData, formValues, handleChange, messages } =
    useSignup();

  return (
    <AuthLayout>
      <AuthForm
        formData={signupFormData}
        formValues={formValues}
        messages={messages}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        linkText="ログイン画面に戻る"
        linkHref="/accounts/login"
        submitText="登録"
      />
    </AuthLayout>
  );
}
