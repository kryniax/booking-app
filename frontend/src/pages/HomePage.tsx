import { useGetMainPageHotels } from "../api/HotelApi";
import LatestDestionationCard from "../components/LatestDestionationCard";
import { useTranslation } from "react-i18next";
import PulseLoader from "react-spinners/PulseLoader";
import HelmetSEO from "../components/HelmetSEO";
import Empty from "../components/Empty";

const HomePage = () => {
  const { mainPageHotels, isLoading, refetch } = useGetMainPageHotels();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <PulseLoader color="#1e40af" size={25} />
      </div>
    );
  }

  if (!mainPageHotels) {
    return (
      <Empty
        title={t("HomePage.noHotel")}
        button={t("BookingApp.refresh")}
        onClick={refetch}
      />
    );
  }

  const topRowHotels = mainPageHotels.slice(0, 2);
  const bottomRowHotels = mainPageHotels.slice(2, 11);

  return (
    <div className="space-y-3">
      <HelmetSEO
        title="Niceplace.com | Find your nice place"
        description="Find and book your ideal hotel stay. Compare prices, read reviews, and get the best deals on hotels worldwide. Easy booking process and 24/7 customer support."
        keywords="niceplace, hotel booking, hotel reservations, best hotel deals, hotel comparison, accommodation booking"
        pathName="/"
      />
      <header>
        <h2 className="text-3xl font-bold dark:text-zinc-200">
          {t("HomePage.latestDestinations")}
        </h2>
      </header>
      <p className="dark:text-zinc-200">{t("HomePage.recentDestinations")}</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestionationCard key={hotel.name} hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestionationCard key={hotel.name} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
