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
      className="bg-white flex items-center justify-center text-blue-600 capitalize px-3 font-bold hover:bg-gray-200 transition duration-50 rounded-md"
    >
      {t("BookingApp.signOut")}
    </button>
  );
};

export default LogoutButton;
