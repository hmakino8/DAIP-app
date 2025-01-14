"use client";

import { useSignup } from "@/accounts/signup/useSignup";
import { AuthLayout } from "@/accounts/components/AuthLayout";
import { AuthForm } from "@/accounts/components/AuthForm";

export const Signup = ({
  handleActiveModal,
}: {
  handleActiveModal: (activeModal: string) => void;
}) => {
  const { handleSubmit, signupFormData, formValues, handleChange, messages } =
    useSignup(handleActiveModal);

  return (
    <AuthLayout>
      <AuthForm
        formData={signupFormData}
        formValues={formValues}
        messages={messages}
        linkText="ログイン画面に戻る"
        linkHref="/accounts/login"
        submitText="登録"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleActiveModal={handleActiveModal}
      />
    </AuthLayout>
  );
};
