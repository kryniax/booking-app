import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import AnimateButton from "./AnimateButton";
import Menu from "./Menu";
import Modal from "./Modal";
import Languages from "./Languages";
import { PiUserCircleThin } from "react-icons/pi";
import { useModal } from "../contexts/ModalContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { openModal } = useModal();

  const isOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const openModalHandel = () => {
    openModal(<Languages />, "Select a language");
  };

  return (
    <div className="bg-blue-800 py-6 px-1 md:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">Niceplace.com</Link>
        </span>
        <span className="flex items-center gap-1">
          <div className="hidden lg:flex hover:bg-white/10 rounded-md">
            <LanguageSwitch onClick={openModalHandel} />
          </div>
          <div className="flex lg:hidden capitalize">
            <Link
              to="/login"
              title={t("BookingApp.signIn")}
              className="rounded-md hover:bg-white/10 transition duration-100"
            >
              <PiUserCircleThin color="white" size={35} />
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="hidden lg:flex gap-1">
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-white/10 rounded-md transition duration-50"
                to="/my-bookings"
              >
                {t("Header.myBookings")}
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-white/10 rounded-md transition duration-50"
                to="/my-hotels"
              >
                {t("Header.myHotels")}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white hidden lg:flex py-2 items-center justify-center text-blue-600 capitalize px-3 font-bold  hover:bg-gray-200 transition duration-50 rounded-md"
            >
              {t("BookingApp.signIn")}
            </Link>
          )}
          <AnimateButton
            onClick={isOpenHandler}
            isOpen={isOpen}
            className="rounded-md hover:bg-white/10 transition duration-100"
          />
        </span>

        <Menu onClick={isOpenHandler} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Header;
