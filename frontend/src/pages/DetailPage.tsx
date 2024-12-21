import React from "react";
import { useGetHotelById } from "../api/HotelApi";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guest-info-form/GuestInfoForm";
import { useTranslation } from "react-i18next";

const DetailPage = () => {
  const { hotelId } = useParams();
  const { hotelDataById } = useGetHotelById(hotelId as string);
  const { t } = useTranslation();
  if (!hotelDataById) {
    return <span>{t("BookingApp.noHotel")}</span>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotelDataById?.starRating }).map(() => (
            <AiFillStar className="fill-yellow-500" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelDataById.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelDataById.imageUrls.map((url) => (
          <div className="h-[300px]">
            <img
              src={url}
              alt={hotelDataById.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelDataById.facilities.map((facility) => (
          <span className="border border-slate-300 rounded-sm p-3">
            {facility}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        <span className="whitespace-pre-line text-justify">
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
