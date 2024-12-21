import React from "react";
import { hotelTypeKeys } from "../config/hotel-options-config";
import { useTranslation } from "react-i18next";

type HotelTypesFilterProps = {
  selectedHotel: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({
  selectedHotel,
  onChange,
}: HotelTypesFilterProps) => {
  const { t } = useTranslation();
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2 capitalize">
        {t("BookingApp.hotelType")}
      </h4>
      {hotelTypeKeys.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedHotel.includes(type)}
            onChange={onChange}
          />
          <span>{t(`TypeSection.hotelTypes.${type}`)}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
