import { FC } from "react";

export const NavigationButton: FC<{
  icon: string;
  label?: string;
  isActive?: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`flex flex-col mx-5 items-center ${
        isActive && "text-blue-400"
      } bg-transparent hover:opacity-80`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
        {icon}
      </span>
      {label && <p className="text-[12px] h-5">{label}</p>}
    </button>
  );
};
