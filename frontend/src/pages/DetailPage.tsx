import { useGetHotelById } from "../api/HotelApi";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guest-info-form/GuestInfoForm";
import { useTranslation } from "react-i18next";
import ImageSlider from "../components/ImageSlider";
import HelmetSEO from "../components/HelmetSEO";

const DetailPage = () => {
  const { hotelId } = useParams();
  const { hotelDataById } = useGetHotelById(hotelId as string);
  const { t } = useTranslation();
  if (!hotelDataById) {
    return <span>{t("BookingApp.noHotel")}</span>;
  }

  return (
    <div className="space-y-6">
      <HelmetSEO
        title={`${hotelDataById.name} - Niceplace.com`}
        description={hotelDataById.description.substring(0, 160)}
        keywords={`hotel, ${hotelDataById.name}, booking, reservation, hotel details, room details`}
        ogImage={hotelDataById.imageUrls[0]}
        pathName={`/detail/${hotelDataById._id}`}
      />
      <div>
        <span className="flex">
          {Array.from({ length: hotelDataById?.starRating }).map(() => (
            <AiFillStar className="fill-yellow-500" />
          ))}
        </span>
        <h1 className="text-3xl font-bold dark:text-zinc-100">
          {hotelDataById.name}
        </h1>
      </div>
      <div className="grid grid-cols-1">
        <ImageSlider images={hotelDataById.imageUrls} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelDataById.facilities.map((facility) => (
          <span className="border border-slate-300 rounded-md p-3 dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-100">
            {t(`FacilitiesSection.hotelFacilities.${facility}`)}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        <span className="whitespace-pre-line text-justify dark:text-zinc-100">
          {hotelDataById.description}
        </span>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotelDataById.pricePerNight}
            hotelId={hotelDataById._id}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
