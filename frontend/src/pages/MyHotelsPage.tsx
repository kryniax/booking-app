import { Link } from "react-router-dom";
import { useGetMyHotels } from "../api/MyHotelApi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const MyHotelsPage = () => {
  const { myHotels } = useGetMyHotels();
  const { t } = useTranslation();
  if (!myHotels) {
    return <span>{t("MyHotelsPage.noHotels")}</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <header>
          <h1 className="text-3xl font-bold">{t("MyHotelsPage.title")}</h1>
        </header>
        <Link
          to="/manage-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 rounded-md hover:bg-blue-500"
        >
          {t("ManageHotelForm.title")}
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {myHotels.map((hotel) => (
          <div
            key={hotel.name}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <header>
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
            </header>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <FaMapMarkerAlt className="mr-3" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BsBuilding className="mr-3" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BiMoney className="mr-3" />
                {hotel.pricePerNight}$
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BiHotel className="mr-3" />
                {`${hotel.adultCount} ${t("BookingApp.adults")}, ${
                  hotel.childCount
                } ${t("BookingApp.children")}`}
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BiStar className="mr-3" />
                {`${hotel.starRating} ${t("BookingApp.starRating")}`}
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-md font-bold p-2 rounded-md hover:bg-blue-500"
              >
                {t("MyHotelsPage.viewDetails")}
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotelsPage;
