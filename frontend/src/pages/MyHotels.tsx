import { Link } from "react-router-dom";
import { useGetMyHotels } from "../api/HotelApi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { myHotels } = useGetMyHotels();

  if (!myHotels) {
    return <span>No Hotels found</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <header>
          <h1 className="text-3xl font-bold">My Hotels</h1>
        </header>
        <Link
          to="/manage-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 rounded-md hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {myHotels.map((hotel) => (
          <div
            key={hotel.name}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <header>
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
            </header>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <FaMapMarkerAlt className="mr-3" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BsBuilding className="mr-3" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BiMoney className="mr-3" />
                {hotel.pricePerNight}
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BiHotel className="mr-3" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-md p-3 flex items-center">
                <BiStar className="mr-3" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-md font-bold p-2 rounded-md hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
