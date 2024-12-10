import { useParams } from "react-router-dom";
import { useGetMyHotelById, useUpdateMyHotelById } from "../api/HotelApi";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";

const EditHotelPage = () => {
  const { updateMyHotel, isPending } = useUpdateMyHotelById();
  const { hotelId } = useParams();
  if (!hotelId) {
    return <span>No hotel to fetch</span>;
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
