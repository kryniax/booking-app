import { AnimatePresence, motion } from "motion/react";
import AnimateButton from "./AnimateButton";
import { IoLogOutOutline } from "react-icons/io5";
import { useGetCurrentUser, useLogoutUser } from "../api/UserApi";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../contexts/AppContext";
import Logo from "../assets/logo2.svg";
import ButtonLink from "./ButtonLink";

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
          className="fixed inset-0 z-30 bg-blue-600 dark:bg-blue-950 lg:hidden"
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
            <div className="container flex justify-between items-center py-5 md:py-[22px] px-2 sm:px-4 md:px-8">
              <header className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Niceplace.com
              </header>
              <AnimateButton
                onClick={toggleMenuHandler}
                isOpen={isOpen}
                color="bg-white"
                className="rounded-md hover:bg-white/10 transition duration-100"
              />
            </div>
            {isLoggedIn === true ? (
              <>
                <div className="flex flex-col flex-1 gap-10 justify-center items-center border-b border-t border-white/40">
                  <ButtonLink
                    variant="tertiary"
                    to="/"
                    onClick={toggleMenuHandler}
                    className="text-2xl font-semibold p-4"
                  >
                    {t("Header.mainPage")}
                  </ButtonLink>
                  <ButtonLink
                    variant="tertiary"
                    to="/my-bookings"
                    onClick={toggleMenuHandler}
                    className="text-2xl font-semibold p-4"
                  >
                    {t("Header.myBookings")}
                  </ButtonLink>
                  <ButtonLink
                    variant="tertiary"
                    to="/my-hotels"
                    onClick={toggleMenuHandler}
                    className="text-2xl font-semibold p-4"
                  >
                    {t("Header.myHotels")}
                  </ButtonLink>
                </div>
                <div
                  className="container w-full flex items-center justify-between p-3"
                  onClick={logoutHandler}
                >
                  <div className="flex items-center gap-2 cursor-pointer rounded-md hover:bg-white/10 transition duration-100 p-2">
                    <IoLogOutOutline size={24} color="white" />
                    <span className="font-semibold text-white">
                      {t("BookingApp.signOut")}
                    </span>
                  </div>
                  <span className="text-white/80 text-sm">
                    {currentUser?.email}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col flex-1 items-center gap-4 pt-16">
                <img src={Logo} className="size-48" />
                <p className="text-white mt-16">{t("BookingApp.accountYet")}</p>
                <ButtonLink
                  variant="secondary"
                  to="/login"
                  className="text-2xl font-semibold p-4"
                  onClick={toggleMenuHandler}
                >
                  {t("BookingApp.signIn")}
                </ButtonLink>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
