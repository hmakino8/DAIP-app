export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="p-5 bg-gray-100 w-full h-screen">{children}</div>
    </div>
  );
};
