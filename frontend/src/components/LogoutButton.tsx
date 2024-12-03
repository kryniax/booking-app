import { useLogoutUser } from "../api/UserApi";

const LogoutButton = () => {
  const { logoutUser } = useLogoutUser();

  const handleClick = () => {
    logoutUser();
  };
  return (
    <button
      onClick={handleClick}
      className="bg-white flex items-center justify-center text-blue-600 px-3 font-bold hover:bg-gray-200 transition duration-50 rounded-md"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
