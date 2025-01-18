import { useAuth } from "@/user/hooks/useAuth";
import { useLogout } from "@/user/hooks/useLogout";

export const UserProfileScreen = () => {
  const { user } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <div className="z-10 absolute top-0 right-0 w-full h-screen p-3 text-sm bg-gray-100 transform transition-all duration-200 ease-in-out">
      <div className="mb-3 text-gray-700">
        <div>ユーザー名</div>
        <div className="text-black">{user?.username}</div>
      </div>
      <div className="mb-5 text-gray-600">
        <div>メールアドレス</div>
        <div className="text-black">{user?.email}</div>
      </div>
      <button
        className="mb-5 w-20 text-green-700 hover:opacity-70 border border-green-700 rounded-lg"
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
};
