import { AnimatePresence, motion } from "motion/react";
import AnimateButton from "./AnimateButton";
import { IoLogOutOutline } from "react-icons/io5";
import { useGetCurrentUser, useLogoutUser } from "../api/UserApi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Logo from "../assets/logo2.svg";

type MenuProps = {
  onClick: () => void;
  isOpen: boolean;
};

const Menu = ({ isOpen, onClick }: MenuProps) => {
  const { isLoggedIn } = useAppContext();
  const { logoutUser } = useLogoutUser();
  const { currentUser } = useGetCurrentUser();
  const { t } = useTranslation();

  const toggleMenuHandler = () => {
    onClick();
  };

  const logoutHandler = () => {
    logoutUser();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed size-full top-0 left-0 z-30 bg-white lg:hidden"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full h-full flex flex-col">
            <div className="container flex justify-between items-center py-6 px-3">
              <header>
                <span className="text-2xl font-bold text-black/80 tracking-tight">
                  Niceplace.com
                </span>
              </header>
              <AnimateButton
                onClick={toggleMenuHandler}
                isOpen={isOpen}
                color="bg-black/80"
                className="mr-1"
              />
            </div>
            {isLoggedIn === true ? (
              <>
                <div className="flex flex-col flex-1 gap-16 justify-center items-center border-b border-t p-3 border-black/70">
                  <Link
                    onClick={toggleMenuHandler}
                    className="flex items-center text-black text-3xl font-black hover:text-black/80 transition duration-50"
                    to="/"
                  >
                    {t("Header.mainPage")}
                  </Link>
                  <Link
                    onClick={toggleMenuHandler}
                    className="flex items-center text-black text-3xl font-black hover:text-black/80 transition duration-50"
                    to="/my-bookings"
                  >
                    {t("Header.myBookings")}
                  </Link>
                  <Link
                    onClick={toggleMenuHandler}
                    className="flex items-center text-black text-3xl font-black hover:text-black/80 transition duration-50"
                    to="/my-hotels"
                  >
                    {t("Header.myHotels")}
                  </Link>
                </div>
                <div
                  className="container w-full flex items-center justify-between p-3"
                  onClick={logoutHandler}
                >
                  <div className="flex items-center gap-4 cursor-pointer">
                    <IoLogOutOutline size={30} />
                    <span className="text-md font-bold capitalize">
                      {t("BookingApp.signOut")}
                    </span>
                  </div>
                  <span className="font-bold text-sm">
                    {currentUser?.email}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col flex-1 items-center gap-4 pt-16">
                <img src={Logo} className="size-48" />
                <p>Nie posiadasz jeszcze konta?</p>
                <Link
                  onClick={toggleMenuHandler}
                  to="/login"
                  className="bg-blue-600 flex py-2 items-center justify-center text-white capitalize px-3 font-bold  hover:bg-blue-500 transition duration-50 rounded-md"
                >
                  {t("BookingApp.signIn")}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
