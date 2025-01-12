export interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoFocus?: boolean;
}

export interface FormData {
  username: FormField;
  email?: FormField;
  password: FormField;
  password_confirm?: FormField;
}

export type ValidationErrors = {
  [key: string]: string[];
};
