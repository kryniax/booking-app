import { useFormContext } from "react-hook-form";
import Input from "../../../components/Input";
import { HotelFormData } from "../ManageHotelForm";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type DetailsSectionProps = {
  title: string;
  isLoading: boolean;
};

const DetailsSection = ({ title, isLoading }: DetailsSectionProps) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4 ">
      <header className="flex gap-2 items-center mb-3">
        <Link
          to="/my-hotels"
          className="hover:bg-black/10 rounded-md p-3 transition duration-100"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold dark:text-zinc-100">{title}</h1>
      </header>

      <Input
        label={t("DetailsSection.name.label")}
        type="text"
        error={errors.name}
        disabled={isLoading}
        labelClass="dark:text-zinc-100"
        className="dark:bg-zinc-800 dark:border-zinc-700"
        {...register("name")}
      />
      <div className="flex gap-4">
        <Input
          label={t("DetailsSection.city.label")}
          type="text"
          error={errors.city}
          disabled={isLoading}
          labelClass="dark:text-zinc-100"
          className="dark:bg-zinc-800 dark:border-zinc-700"
          {...register("city")}
        />
        <Input
          label={t("DetailsSection.country.label")}
          type="text"
          error={errors.country}
          disabled={isLoading}
          labelClass="dark:text-zinc-100"
          className="dark:bg-zinc-800 dark:border-zinc-700"
          {...register("country")}
        />
      </div>
      <Input
        label={t("DetailsSection.description.label")}
        error={errors.description}
      >
        <textarea
          rows={10}
          disabled={isLoading}
          className="border rounded w-full py-1 px-2 font-normal resize-none  dark:bg-zinc-800 dark:border-zinc-700"
          {...register("description")}
        ></textarea>
      </Input>
      <Input
        label={t("DetailsSection.pricePerNight.label")}
        labelClass="max-w-[50%]"
        className="dark:bg-zinc-800 dark:border-zinc-700"
        type="number"
        min={1}
        disabled={isLoading}
        error={errors.pricePerNight}
        {...register("pricePerNight", { valueAsNumber: true })}
      />
      <Input
        label={t("DetailsSection.starRating.label")}
        labelClass="max-w-[50%]"
        error={errors.starRating}
      >
        <select
          disabled={isLoading}
          {...register("starRating", { valueAsNumber: true })}
          className="border rouded w-full text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 p-1 font-normal"
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
      </Input>
    </div>
  );
};

export default DetailsSection;
