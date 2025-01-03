import { useTranslation } from "react-i18next";
import { useLogoutUser } from "../api/UserApi";

const LogoutButton = () => {
  const { logoutUser } = useLogoutUser();
  const { t } = useTranslation();
  const handleClick = () => {
    logoutUser();
  };
  return (
    <button
      onClick={handleClick}
      className="bg-white dark:bg-zinc-600 flex items-center justify-center text-blue-600 dark:text-white px-3 py-2 font-bold hover:bg-gray-200 hover:dark:bg-zinc-500 transition duration-50 rounded-md"
    >
      {t("BookingApp.signOut")}
    </button>
  );
};

export default LogoutButton;
