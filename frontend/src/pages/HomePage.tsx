import React from "react";
import { useGetMainPageHotels } from "../api/HotelApi";
import LatestDestionationCard from "../components/LatestDestionationCard";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { mainPageHotels, isLoading } = useGetMainPageHotels();
  const { t } = useTranslation();

  if (!mainPageHotels) {
    return <span>{t("HomePage.noHotel")}</span>;
  }

  const topRowHotels = mainPageHotels.slice(0, 2);
  const bottomRowHotels = mainPageHotels.slice(2);

  return (
    <div className="space-y-3">
      <header>
        <h2 className="text-3xl font-bold">
          {t("HomePage.latestDestinations")}
        </h2>
      </header>
      <p>{t("HomePage.recentDestinations")}</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestionationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestionationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
