import { useTranslation } from "react-i18next";

type SortHotelFilterProps = {
  selectedSortOption?: string;
  onChange: (value: string) => void;
};

const SortHotelFilter = ({
  selectedSortOption,
  onChange,
}: SortHotelFilterProps) => {
  const { t } = useTranslation();
  return (
    <select
      value={selectedSortOption}
      onChange={(event) => onChange(event.target.value)}
      className="p-2 border rounded-md capitalize"
    >
      <option className="capitalize" value="">
        {t("BookingApp.sortBy")}
      </option>
      <option className="capitalize" value="starRarting">
        {t("BookingApp.starRating")}
      </option>
      <option value="pricePerNightAsc">
        {t("SortHotelFilter.pricePerNightAsc")}
      </option>
      <option value="pricePerNightDesc">
        {t("SortHotelFilter.pricePerNightDesc")}
      </option>
    </select>
  );
};

export default SortHotelFilter;
