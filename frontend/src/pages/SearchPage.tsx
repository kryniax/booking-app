import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useSearchHotel } from "../api/HotelApi";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import SortHotelFilter from "../components/SortHotelFilter";
import { useTranslation } from "react-i18next";
import { TbArrowsSort, TbFilter } from "react-icons/tb";
import Modal from "../components/Modal";
import PulseLoader from "react-spinners/PulseLoader";
import HelmetSEO from "../components/HelmetSEO";
import ScrollToTop from "../components/ScrollToTop";
import MapView from "../components/Map";
import MapImg from "../assets/map.jpg";

const SearchPage = () => {
  const search = useSearchContext();
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<
    string[]
  >([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [selectedSortOption, setSelectedSortOption] = useState<
    string | undefined
  >("");

  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [isModalSortOpen, setIsModalSortOpen] = useState(false);
  const [isModalMapOpen, setIsModalMapOpen] = useState<boolean>(false);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelType,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: selectedSortOption,
  };
  const { hotelData, isLoading } = useSearchHotel(searchParams);

  const starsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const hotelTypeChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelType((prevType) =>
      event.target.checked
        ? [...prevType, hotelType]
        : prevType.filter((type) => type !== hotelType)
    );
  };

  const hotelFacilityChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelFacilities((prevFacility) =>
      event.target.checked
        ? [...prevFacility, hotelType]
        : prevFacility.filter((facility) => facility !== hotelType)
    );
  };

  const hotelSelectedPriceHandler = (value?: number) => {
    setSelectedPrice(value);
  };

  const hotelSelectedFilterHandler = (value: string) => {
    setSelectedSortOption(value);
  };

  return (
    <div className="grid lg:grid-cols-[250px_1fr] gap-5">
      <HelmetSEO
        title="Search Hotels - Find Your Perfect Accommodation at Niceplace"
        description="Search through thousands of hotels worldwide. Filter by price, location, amenities, and more to find your perfect accommodation."
        keywords="search hotels, hotel finder, hotel search engine, find accommodation, compare hotels"
        pathName="/search"
      />
      <div className="flex flex-col gap-5">
        <div
          onClick={() => setIsModalMapOpen(true)}
          className="flex flex-col max-h-[250px] xl:max-h-max gap-5 rounded-lg border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 p-5 h-fit lg:block top-10 cursor-pointer"
        >
          <header>
            <h3 className="text-lg dark:text-zinc-100 font-semibold">
              {t("SearchPage.map")}
            </h3>
          </header>
          <img
            className="flex items-center object-cover overflow-hidden"
            src={MapImg}
            alt={t("SearchPage.map")}
            title={t("SearchPage.map")}
          />
        </div>
        <div className="rounded-lg border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 p-5 h-fit lg:block top-10">
          <div className="flex justify-between px-8 lg:hidden">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsModalFilterOpen(true)}
            >
              <TbFilter size={22} className="dark:text-zinc-100" />
              <span className="dark:text-zinc-100">
                {t("SearchPage.filter")}
              </span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsModalSortOpen(true)}
            >
              <TbArrowsSort size={22} className="dark:text-zinc-100" />
              <span className="dark:text-zinc-100">{t("SearchPage.sort")}</span>
            </div>
          </div>
          <div className="hidden lg:block space-y-5">
            <header>
              <h3 className="text-lg dark:text-zinc-100 font-semibold border-b border-slate-300 dark:border-slate-200 pb-5">
                {t("SearchPage.filterBy")}
              </h3>
            </header>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={starsChangeHandler}
            />
            <HotelTypesFilter
              selectedHotel={selectedHotelType}
              onChange={hotelTypeChangeHandler}
            />
            <FacilitiesFilter
              selectedFacilities={selectedHotelFacilities}
              onChange={hotelFacilityChangeHandler}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={hotelSelectedPriceHandler}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <header>
            <h2 className="text-xl font-bold dark:text-zinc-100">
              {`${hotelData?.pagination.total} ${t("SearchPage.hotelsFound", { count: Number(hotelData?.pagination.total) })}`}
              {search.destination
                ? ` ${t("SearchPage.in")}: ${search.destination}`
                : ""}
            </h2>
          </header>
          <div className="hidden lg:block">
            <SortHotelFilter
              selectedSortOption={selectedSortOption}
              onChange={hotelSelectedFilterHandler}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-10">
            <PulseLoader color="#1e40af" size={25} />
          </div>
        ) : (
          <>
            {hotelData?.data.map((hotel) => (
              <SearchResultCard key={hotel.name} hotel={hotel} />
            ))}
          </>
        )}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
      <ScrollToTop />
      <Modal
        isOpen={isModalFilterOpen}
        onClose={() => setIsModalFilterOpen(false)}
        title={t("SearchPage.filter")}
        className="overflow-y-scroll"
      >
        <div className="flex flex-col">
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={starsChangeHandler}
          />
          <HotelTypesFilter
            selectedHotel={selectedHotelType}
            onChange={hotelTypeChangeHandler}
          />
          <FacilitiesFilter
            selectedFacilities={selectedHotelFacilities}
            onChange={hotelFacilityChangeHandler}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={hotelSelectedPriceHandler}
          />
        </div>
      </Modal>
      <Modal
        isOpen={isModalSortOpen}
        onClose={() => setIsModalSortOpen(false)}
        title={t("SearchPage.sort")}
      >
        <div className="py-4">
          <SortHotelFilter
            selectedSortOption={selectedSortOption}
            onChange={hotelSelectedFilterHandler}
          />
        </div>
      </Modal>
      <Modal
        isOpen={isModalMapOpen}
        onClose={() => setIsModalMapOpen(false)}
        title={t("SearchPage.map")}
      >
        <MapView className="w-[80vw] h-[70vh] max-w-screen-3xl px-2 pb-2" />
      </Modal>
    </div>
  );
};

export default SearchPage;
