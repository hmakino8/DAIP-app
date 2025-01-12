import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 rounded shadow-md w-[400px] bg-gray-100">
        {children}
      </div>
    </div>
  );
};
