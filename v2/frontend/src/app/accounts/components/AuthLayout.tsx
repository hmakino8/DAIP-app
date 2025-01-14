import { ReactNode } from "react";
type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="p-5 bg-white w-full h-screen">{children}</div>
    </div>
  );
};
