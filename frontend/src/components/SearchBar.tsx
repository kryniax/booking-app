import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { enGB } from "date-fns/locale/en-GB";
import { useTranslation } from "react-i18next";
registerLocale("en", enGB);

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1  bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex flex-1 bg-white px-2 py-1 gap-2">
        <label className="flex items-center capitalize">
          {t("BookingApp.adults")}:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={12}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="flex items-center capitalize">
          {t("BookingApp.child")}:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={12}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="flex flex-1">
        <DatePicker
          locale="en"
          dateFormat="dd/MM/yyyy"
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={`${t("BookingApp.checkIn")} Date`}
          className="min-w-full bg-white p-2 focus:outline-none capitalize"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex flex-1">
        <DatePicker
          locale="en"
          dateFormat="dd/MM/yyyy"
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={`${t("BookingApp.checkOut")} Date`}
          className="min-w-full bg-white p-2 focus:outline-none capitalize"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-2/3 bg-blue-600 text-white capitalize h-full p-2 font-bold text-xl hover:bg-blue-500 transition duration-100"
        >
          {t("BookingApp.search")}
        </button>
        <button className="w-1/3 bg-red-600 text-white capitalize h-full p-2 font-bold text-xl hover:bg-red-500 transition duration-100">
          {t("BookingApp.clear")}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
