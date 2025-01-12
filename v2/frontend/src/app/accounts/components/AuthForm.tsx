import { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import type { FormData, ValidationErrors } from "../types";

type AuthFormProps = {
  formData: FormData;
  formValues: Record<string, string>;
  messages: ValidationErrors;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  linkText: string;
  linkHref: string;
  submitText: string;
  submitTextColor: string;
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
  submitTextColor,
}: AuthFormProps) => {
  return (
    <form
      method="post"
      noValidate
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {Object.entries(formData).map(([key, field]) => (
        <div key={key} className="mb-5">
          <input
            type={field.type}
            name={field.name}
            value={formValues[key as keyof typeof formValues]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            autoFocus={field.autoFocus}
            className="w-full p-2 border rounded-md"
          />
          <div className="py-2 text-red-500 text-sm text-center">
            {messages[key]}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <Link className={"text-blue-500"} href={linkHref}>
          {linkText}
        </Link>
        <button
          type="submit"
          className={`${submitTextColor} text-white p-2 rounded-md w-20`}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};
