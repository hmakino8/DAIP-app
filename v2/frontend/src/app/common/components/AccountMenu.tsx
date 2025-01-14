import type { UserInfo } from "../types";
import { motion } from "framer-motion";

export const AccountMenu = ({
  userInfo,
  onLogout,
}: {
  userInfo?: UserInfo | null;
  onLogout: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div className="z-10 absolute top-[80px] right-0 w-full h-screen p-3 text-sm bg-white transform transition-all duration-200 ease-in-out">
        <div className="mb-3">
          <div>ユーザー名</div>
          <div className="text-black">{userInfo?.username}</div>
        </div>
        <div className="mb-5">
          <div>メールアドレス</div>
          <div className="text-black">{userInfo?.email}</div>
        </div>
        <button
          className="mb-5 w-20 text-gray-700 hover:bg-gray-100 border border-gray-700 rounded-lg"
          onClick={onLogout}
        >
          ログアウト
        </button>
      </div>
    </motion.div>
  );
};
