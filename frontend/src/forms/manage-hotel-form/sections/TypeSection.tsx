import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../../config/hotel-options-config";
import { twMerge } from "tailwind-merge";
import { HotelFormData } from "../ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={twMerge(
              `cursor-pointer text-sm rounded-full px-4 py-2 font-semibold select-none`,
              typeWatch === type ? "bg-blue-300" : "bg-gray-300"
            )}
          >
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type")}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
