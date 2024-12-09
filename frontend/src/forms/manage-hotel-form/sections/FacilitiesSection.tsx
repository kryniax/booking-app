import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../../config/hotel-options-config";

import React from "react";
import { HotelFormData } from "../ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="text-sm flex gap-2 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities")}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
