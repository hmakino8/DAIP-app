export const Account = ({
  userName,
  email,
  handleLogout,
}: {
  userName: string | undefined;
  email: string | undefined;
  handleLogout: () => void;
}) => {
  return (
    <div className="w-full h-screen p-3 text-sm bg-white transform transition-all duration-200 ease-in-out">
      <div className="mb-3 text-gray-500 border-b border-gray-300">
        <div>ユーザー名</div>
        <div className="text-black">{userName}</div>
      </div>
      <div className="mb-5 text-gray-500 border-b border-gray-300">
        <div>メールアドレス</div>
        <div className="text-black">{email}</div>
      </div>
      <button
        className="mb-5 w-20 text-green-600 hover:bg-green-100 border border-green-600 rounded-lg"
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
};
