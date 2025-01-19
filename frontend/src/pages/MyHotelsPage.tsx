import { useGetMyHotels } from "../api/MyHotelApi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";
import PulseLoader from "react-spinners/PulseLoader";
import Empty from "../components/Empty";
import ButtonLink from "../components/ButtonLink";

const MyHotelsPage = () => {
  const { myHotels, isLoading, refetch } = useGetMyHotels();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <PulseLoader color="#1e40af" size={25} />
      </div>
    );
  }

  return (
    <div className="space-y-5 flex flex-col flex-1">
      <HelmetSEO
        title="Your Hotels"
        description="Access your hotels. Add, update or delete hotels."
        keywords="hotels, your hotels, hotel, update, add, delete"
        pathName="/my-hotels"
      />
      <span className="flex justify-between">
        <header>
          <h1 className="text-3xl font-bold dark:text-zinc-100">
            {t("MyHotelsPage.title")}
          </h1>
        </header>
        <ButtonLink variant="primary" to="/add-hotel" className="text-xl">
          {t("ManageHotelForm.title")}
        </ButtonLink>
      </span>
      {myHotels?.length === 0 ? (
        <Empty
          title={t("MyHotelsPage.noHotels")}
          link={t("HomePage.title")}
          href="/"
          button={t("BookingApp.refresh")}
          onClick={refetch}
        />
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
                <ButtonLink variant="primary" to={`/edit-hotel/${hotel._id}`}>
                  {t("MyHotelsPage.viewDetails")}
                </ButtonLink>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHotelsPage;
