import { Link } from "react-router-dom";
import { useGetMyHotels } from "../api/MyHotelApi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { TfiFaceSad } from "react-icons/tfi";

const MyHotelsPage = () => {
  const { myHotels } = useGetMyHotels();
  const { t } = useTranslation();

  return (
    <div className="space-y-5 flex flex-col flex-1">
      <span className="flex justify-between">
        <header>
          <h1 className="text-3xl font-bold dark:text-zinc-100">
            {t("MyHotelsPage.title")}
          </h1>
        </header>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 dark:bg-blue-900 text-white text-xl font-bold p-2 rounded-md hover:bg-blue-500 dark:hover:bg-blue-800"
        >
          {t("ManageHotelForm.title")}
        </Link>
      </span>
      {myHotels?.length === 0 ? (
        <div className="flex flex-col flex-1 gap-5 items-center justify-center py-10">
          <TfiFaceSad size={90} className="text-black/80 dark:text-zinc-300" />
          <span className="font-bold text-2xl text-black/80 dark:text-zinc-300">
            {t("MyHotelsPage.noHotels")}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {myHotels?.map((hotel) => (
            <div
              key={hotel.name}
              className="flex flex-col justify-between border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-8 gap-5"
            >
              <header>
                <h2 className="text-2xl font-bold dark:text-zinc-100">
                  {hotel.name}
                </h2>
              </header>
              <div className="whitespace-pre-line dark:text-zinc-100">
                {hotel.description}
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 dark:border-zinc-700 dark:bg-zinc-500 rounded-md p-3 flex items-center">
                  <FaMapMarkerAlt className="mr-3" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 dark:border-zinc-700 dark:bg-zinc-500 rounded-md p-3 flex items-center">
                  <BsBuilding className="mr-3" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 dark:border-zinc-700 dark:bg-zinc-500 rounded-md p-3 flex items-center">
                  <BiMoney className="mr-3" />
                  {hotel.pricePerNight}$
                </div>
                <div className="border border-slate-300 dark:border-zinc-700 dark:bg-zinc-500 rounded-md p-3 flex items-center">
                  <BiHotel className="mr-3" />
                  {`${hotel.adultCount} ${t("BookingApp.adults")}, ${
                    hotel.childCount
                  } ${t("BookingApp.children")}`}
                </div>
                <div className="border border-slate-300 dark:border-zinc-700 dark:bg-zinc-500 rounded-md p-3 flex items-center">
                  <BiStar className="mr-3" />
                  {`${hotel.starRating} ${t("BookingApp.starRating")}`}
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex bg-blue-600 dark:bg-blue-900 text-white text-md font-bold p-2 rounded-md hover:bg-blue-500 dark:hover:bg-blue-800"
                >
                  {t("MyHotelsPage.viewDetails")}
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHotelsPage;
