import { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FormData, ValidationErrors } from "../types";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  formData: FormData;
  formValues: Record<string, string>;
  messages: ValidationErrors;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  linkText: string;
  linkHref: string;
  submitText: string;
  setActiveModal: (activeModal: string) => void;
};

export const AuthForm = ({
  formData,
  formValues,
  messages,
  handleSubmit,
  handleChange,
  linkText,
  linkHref,
  submitText,
  setActiveModal,
}: AuthFormProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <form
      method="post"
      noValidate
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {pathname == "/accounts/login" && messages?.message && (
        <div className="py-2 text-red-500 text-sm text-center">
          {messages.message}
        </div>
      )}
      {Object.entries(formData).map(([key, field]) => (
        <div key={key} className="mb-2">
          <input
            type={field.type}
            name={field.name}
            value={formValues[key as keyof typeof formValues]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            autoFocus={field.autoFocus}
            className="w-full p-2 border-b transition-colors duration-300 focus:border-b-1 focus:border-blue-500 focus:outline-none"
          />
          <div className="py-2 text-red-500 text-sm text-center">
            {messages[key]}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <Link className={"text-blue-500 hover:text-blue-400"} href={linkHref}>
          {linkText}
        </Link>
        <button
          type="submit"
          className={`${
            pathname == "/accounts/login"
              ? "bg-blue-500 hover:bg-blue-400"
              : "bg-green-500 hover:bg-green-400"
          } text-white p-2 rounded-full shadow-lg w-24 h-12`}
          onClick={() => {
            submitText === "ログイン" && setActiveModal("");
          }}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};
