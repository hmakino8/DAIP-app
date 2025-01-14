import { FC } from "react";

export const NavigationButton: FC<{
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`${
        label !== "Reserve" && label !== "Account" && "border-r border-gray-200"
      } w-full flex flex-col items-center ${
        isActive && "text-blue-400"
      } bg-transparent hover:opacity-80`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
        {icon}
      </span>
      {label !== "Account" && <p className="text-[12px] h-5">{label}</p>}
    </button>
  );
};
