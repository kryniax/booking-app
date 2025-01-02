import { useTranslation } from "react-i18next";
import { useGetCurrentUser } from "../api/UserApi";
import { Link } from "react-router-dom";

const MyProfilePage = () => {
  const { t } = useTranslation();
  const { currentUser } = useGetCurrentUser();
  return (
    <section className="container flex flex-col gap-5">
      <div>
        <header>
          <h2 className="font-bold text-2xl">{t("Header.myProfile")}</h2>
        </header>
      </div>
      <div className="w-full flex flex-col px-2 md:px-10">
        <div className="flex gap-5 items-start">
          <div
            className="size-20 md:size-28 bg-blue-400 rounded-full flex items-center justify-center"
            title={`${currentUser?.firstName} ${currentUser?.lastName}`}
          >
            <span className="font-bold text-3xl md:text-4xl text-white tracking-wide">
              {currentUser?.firstName.slice(0, 1)}
              {currentUser?.lastName.slice(0, 1)}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-xl md:text-2xl">{`${currentUser?.firstName} ${currentUser?.lastName}`}</h3>
            <p className="font-thin md:font-normal">{currentUser?.email}</p>
          </div>
        </div>
        <div className="w-full flex justify-center gap-3 mt-10">
          <Link
            className="flex items-center text-white bg-blue-500 py-2 px-3 font-bold hover:bg-blue-400 rounded-md transition duration-50"
            to="/my-bookings"
          >
            {t("Header.myBookings")}
          </Link>
          <Link
            className="flex items-center bg-blue-500 py-2 text-white px-3 font-bold hover:bg-blue-400 rounded-md transition duration-50"
            to="/my-hotels"
          >
            {t("Header.myHotels")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MyProfilePage;
