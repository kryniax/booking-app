import { useCreateMyHotel } from "../api/HotelApi";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";

const AddHotel = () => {
  const { createMyHotel, isLoading } = useCreateMyHotel();
  const saveHotelHandler = (hotelFormData: FormData) => {
    createMyHotel(hotelFormData);
  };

  return <ManageHotelForm onSave={saveHotelHandler} isLoading={isLoading} />;
};

export default AddHotel;
