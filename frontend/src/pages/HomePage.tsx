import { useGetMainPageHotels } from "../api/HotelApi";
import LatestDestionationCard from "../components/LatestDestionationCard";
import { useTranslation } from "react-i18next";
import PulseLoader from "react-spinners/PulseLoader";
import { TfiFaceSad } from "react-icons/tfi";

const HomePage = () => {
  const { mainPageHotels, isLoading } = useGetMainPageHotels();
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
      <div className="flex flex-col flex-1 gap-5 items-center justify-center py-10">
        <TfiFaceSad size={90} className="text-black/80 " />
        <span className="font-bold text-2xl text-black/80">
          {t("HomePage.noHotel")}
        </span>
      </div>
    );
  }

  const topRowHotels = mainPageHotels.slice(0, 2);
  const bottomRowHotels = mainPageHotels.slice(2);

  return (
    <div className="space-y-3">
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
