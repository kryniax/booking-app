import { useFormContext } from "react-hook-form";
import Input from "../../../components/Input";
import { HotelFormData } from "../ManageHotelForm";
import { useTranslation } from "react-i18next";

type DetailsSectionProps = {
  title: string;
};

const DetailsSection = (props: DetailsSectionProps) => {
  const { t } = useTranslation();
  const { title } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <Input
        label={t("DetailsSection.name.label")}
        type="text"
        error={errors.name}
        {...register("name")}
      />
      <div className="flex gap-4">
        <Input
          label={t("DetailsSection.city.label")}
          type="text"
          error={errors.city}
          {...register("city")}
        />
        <Input
          label={t("DetailsSection.country.label")}
          type="text"
          error={errors.country}
          {...register("country")}
        />
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        {t("DetailsSection.description.label")}
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal resize-none"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <Input
        label={t("DetailsSection.pricePerNight.label")}
        labelClass="max-w-[50%]"
        type="number"
        min={1}
        error={errors.pricePerNight}
        {...register("pricePerNight", { valueAsNumber: true })}
      />
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        {t("DetailsSection.starRating.label")}
        <select
          {...register("starRating", { valueAsNumber: true })}
          className="border rouded w-full text-gray-700 font-normal"
        >
          <option value="0" className="text-sm font-bold">
            {t("DetailsSection.starRating.select")}
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={`option${num}`} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
