import { useParams } from "react-router-dom";
import { useGetMyHotelById, useUpdateMyHotelById } from "../api/MyHotelApi";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";
import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";

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
    <>
      <HelmetSEO
        title="Edit Hotel Information | Update Hotel Details"
        description="Update and manage hotel information and facilities. Keep your hotel listing accurate and up-to-date."
        keywords="edit hotel, update hotel information, manage hotel listing, hotel management"
        pathName={`/edit-hotel/${hotelId}`}
      />
      <ManageHotelForm
        hotel={myHotelById}
        onSave={updateHotelHandler}
        isLoading={isPending}
      />
    </>
  );
};

export default EditHotelPage;
