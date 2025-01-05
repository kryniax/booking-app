import { HotelType } from "../types";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrencyContext } from "../contexts/CurrencyContext";

type SearchResultsCardProps = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: SearchResultsCardProps) => {
  const { t } = useTranslation();

  const { formatPrice } = useCurrencyContext();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-8 gap-8">
      <div className="w-full h-[250px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
          alt={hotel.name}
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={`star-${index}`} className="fill-yellow-500" />
              ))}
            </span>
            <span className="ml-1 text-sm dark:text-zinc-100">
              {t(`TypeSection.hotelTypes.${hotel.type}`)}
            </span>
          </div>
          <header>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer dark:text-zinc-100"
            >
              {hotel.name}
            </Link>
          </header>
        </div>
        <div>
          <article className="line-clamp-4 dark:text-zinc-100">
            {hotel.description}
          </article>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap">
          <div className="flex flex-wrap 2xl:flex-nowrap gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 dark:bg-zinc-500 p-2 rounded-lg font-semibold text-xs whitespace-nowrap"
              >
                {t(`FacilitiesSection.hotelFacilities.${facility}`)}
              </span>
            ))}
            <span className="text-sm dark:text-zinc-300">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="font-bold dark:text-zinc-100">
              <span className="font-normal">{t("BookingApp.total")}:</span>{" "}
              {formatPrice(hotel.pricePerNight)}
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800 text-white h-full p-3 font-bold text-xl max-w-fit rounded-md transition duration:100"
            >
              {t("SearchResultCard.viewMore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
