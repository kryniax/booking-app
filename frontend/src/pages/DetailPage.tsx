import { useGetHotelById } from "../api/HotelApi";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guest-info-form/GuestInfoForm";
import { useTranslation } from "react-i18next";
import ImageSlider from "../components/ImageSlider";
import HelmetSEO from "../components/HelmetSEO";
import Empty from "../components/Empty";
import MapView from "../components/Map";
import { useState } from "react";
import Modal from "../components/Modal";
import PulseLoader from "react-spinners/PulseLoader";

const DetailPage = () => {
  const { hotelId } = useParams();
  const { hotelDataById, isLoading } = useGetHotelById(hotelId as string);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <PulseLoader color="#1e40af" size={25} />
      </div>
    );
  }

  if (!hotelDataById) {
    return (
      <Empty
        title={t("BookingApp.noHotel")}
        link={t("BookingApp.back")}
        href={-1}
      />
    );
  }

  return (
    <>
      <div className="space-y-7">
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
          <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <MapView
              className="w-full h-[20vh] max-h-[200px] max-w-screen-xl"
              hotel={hotelDataById}
              zoom={17}
            />
            <span className="whitespace-pre-line text-justify dark:text-zinc-100">
              {hotelDataById.description}
            </span>
          </div>
          <div className="h-fit">
            <GuestInfoForm
              pricePerNight={hotelDataById.pricePerNight}
              hotelId={hotelDataById._id}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("SearchPage.sort")}
      >
        <MapView
          className="w-[80vw] h-[70vh] max-w-screen-3xl px-2 pb-2"
          hotel={hotelDataById}
          zoom={17}
        />
      </Modal>
    </>
  );
};

export default DetailPage;
