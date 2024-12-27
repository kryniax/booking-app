import { FormEvent, useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { enGB } from "date-fns/locale/en-GB";
import { pl } from "date-fns/locale/pl";
import { de } from "date-fns/locale/de";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../contexts/AppContext";
registerLocale("en", enGB);
registerLocale("pl", pl);
registerLocale("de", de);

const SearchBar = () => {
  const { currentLanguage } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [calendarLanguage, setCalendarLanguage] =
    useState<string>(currentLanguage);

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

  useEffect(() => {
    if (currentLanguage === "gb") {
      setCalendarLanguage("en");
    } else {
      setCalendarLanguage(currentLanguage);
    }
  }, [currentLanguage]);
  console.log(calendarLanguage);
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="-mt-8 p-1 bg-orange-400 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-1"
    >
      <div className="flex flex-row items-center flex-1  bg-white p-3 rounded-md">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder={t("SearchBar.where")}
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex flex-1 bg-white p-2 gap-2 rounded-md">
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
          locale={calendarLanguage}
          dateFormat="dd/MM/yyyy"
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={`${t("BookingApp.checkIn")}`}
          className="min-w-full bg-white p-3 rounded-md focus:outline-none capitalize"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex flex-1">
        <DatePicker
          locale={calendarLanguage}
          dateFormat="dd/MM/yyyy"
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={`${t("BookingApp.checkOut")}`}
          className="min-w-full bg-white p-3 rounded-md focus:outline-none capitalize"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white capitalize h-full p-2 rounded-md font-bold text-xl hover:bg-blue-500 transition duration-100"
        >
          {t("BookingApp.search")}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
