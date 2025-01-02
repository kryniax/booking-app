import { HotelType } from "../types";
import { Link } from "react-router-dom";

type LatestDestionationCardProps = {
  hotel: HotelType;
};

const LatestDestionationCard = ({ hotel }: LatestDestionationCardProps) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="w-full h-full hover:scale-[.97] transition duration-100">
        <div className="h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute bottom-0 p-4 bg-black/50 w-full rounded-b-md">
          <span className="text-white font-bold tracking-tight text-3xl">
            {hotel.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LatestDestionationCard;
