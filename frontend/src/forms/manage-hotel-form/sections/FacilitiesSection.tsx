import { useFormContext } from "react-hook-form";
import { hotelFacilitiesKeys } from "../../../config/hotel-options-config";
import React from "react";
import { HotelFormData } from "../ManageHotelForm";
import { useTranslation } from "react-i18next";

const FacilitiesSection = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {hotelFacilitiesKeys.map((facility) => (
          <label
            key={facility}
            className="text-sm flex gap-2 text-gray-700 cursor-pointer hover:text-gray-900"
          >
            <input
              type="checkbox"
              value={facility}
              className="cursor-pointer"
              {...register("facilities")}
            />
            {t(`FacilitiesSection.hotelFacilities.${facility}`)}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
