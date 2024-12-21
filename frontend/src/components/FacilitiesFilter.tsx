import React from "react";
import { hotelFacilitiesKeys } from "../config/hotel-options-config";
import { useTranslation } from "react-i18next";

type FacilitiesFilterProps = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({
  selectedFacilities,
  onChange,
}: FacilitiesFilterProps) => {
  const { t } = useTranslation();
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2 capitalize">
        {t("BookingApp.facilities")}
      </h4>
      {hotelFacilitiesKeys.map((facility) => (
        <label key={facility} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{t(`FacilitiesSection.hotelFacilities.${facility}`)}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
