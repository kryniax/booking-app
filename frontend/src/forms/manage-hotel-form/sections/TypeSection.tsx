import { useFormContext } from "react-hook-form";
import { hotelTypeKeys } from "../../../config/hotel-options-config";
import { twMerge } from "tailwind-merge";
import { HotelFormData } from "../ManageHotelForm";
import { useTranslation } from "react-i18next";

type TypeSectionProps = {
  isLoading: boolean;
};
const TypeSection = ({ isLoading }: TypeSectionProps) => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 dark:text-zinc-100">Type</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {hotelTypeKeys.map((type) => (
          <label
            key={type}
            className={twMerge(
              `cursor-pointer text-sm rounded-full px-4 py-2 font-semibold select-none`,
              typeWatch === type
                ? "bg-blue-300 hover:bg-blue-300 dark:hover:bg-blue-300"
                : "bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-500"
            )}
          >
            <input
              type="radio"
              value={type}
              disabled={isLoading}
              className="hidden"
              {...register("type")}
            />
            <span>{t(`TypeSection.hotelTypes.${type}`)}</span>
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
