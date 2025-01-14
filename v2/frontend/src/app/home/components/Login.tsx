"use client";

import { useLogin } from "@/accounts/login/useLogin";
import { AuthLayout } from "@/accounts/components/AuthLayout";
import { AuthForm } from "@/accounts/components/AuthForm";

export const Login = ({
  setActiveModal,
}: {
  setActiveModal: (activeModal: string) => void;
}) => {
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
        setActiveModal={setActiveModal}
      />
    </AuthLayout>
  );
};