import { useParams } from "react-router-dom";
import { useGetMyHotelById, useUpdateMyHotelById } from "../api/MyHotelApi";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";
import { useTranslation } from "react-i18next";

const EditHotelPage = () => {
  const { updateMyHotel, isPending } = useUpdateMyHotelById();
  const { hotelId } = useParams();
  const { t } = useTranslation();
  if (!hotelId) {
    return <span>{t("BookingApp.noHotel")}</span>;
  }
  const { myHotelById } = useGetMyHotelById(hotelId);

  const updateHotelHandler = (hotelFormData: FormData) => {
    updateMyHotel(hotelFormData);
  };
  return (
    <ManageHotelForm
      hotel={myHotelById}
      onSave={updateHotelHandler}
      isLoading={isPending}
    />
  );
};

export default EditHotelPage;
