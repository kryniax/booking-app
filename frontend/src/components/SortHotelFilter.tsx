type SortHotelFilterProps = {
  selectedSortOption?: string;
  onChange: (value: string) => void;
};

const SortHotelFilter = ({
  selectedSortOption,
  onChange,
}: SortHotelFilterProps) => {
  return (
    <select
      value={selectedSortOption}
      onChange={(event) => onChange(event.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="">Sort By</option>
      <option value="starRarting">Star Rating</option>
      <option value="pricePerNightAsc">Price Per Night (low to high)</option>
      <option value="pricePerNightDesc">Price Per Night (high to low)</option>
    </select>
  );
};

export default SortHotelFilter;
