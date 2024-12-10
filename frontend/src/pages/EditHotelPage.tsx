import { useParams } from "react-router-dom";
import { useGetMyHotelById } from "../api/HotelApi";
import ManageHotelForm from "../forms/manage-hotel-form/ManageHotelForm";

const EditHotelPage = () => {
  const { hotelId } = useParams();
  if (!hotelId) {
    return <span>No hotel to fetch</span>;
  }
  const { myHotelById } = useGetMyHotelById(hotelId);
  return <ManageHotelForm hotel={myHotelById} />;
};

export default EditHotelPage;
