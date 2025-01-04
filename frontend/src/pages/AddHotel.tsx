import { useCreateMyHotel } from "../api/MyHotelApi";
import HelmetSEO from "../components/HelmetSEO";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";

const AddHotel = () => {
  const { createMyHotel, isLoading } = useCreateMyHotel();
  const saveHotelHandler = (hotelFormData: FormData) => {
    createMyHotel(hotelFormData);
  };

  return (
    <>
      <HelmetSEO
        title="List Your Hotel - Add New Hotel Property"
        description="List your hotel on our platform. Reach more customers and manage your property efficiently with our hotel management tools."
        keywords="add hotel, list property, hotel registration, become a partner, hotel listing"
        pathName="/add-hotel"
      />
      <ManageHotelForm onSave={saveHotelHandler} isLoading={isLoading} />
    </>
  );
};

export default AddHotel;
