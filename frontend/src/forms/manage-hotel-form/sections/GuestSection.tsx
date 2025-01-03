import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";
import Input from "../../../components/Input";
import { useTranslation } from "react-i18next";

type GuestSectionProps = {
  isLoading: boolean;
};

const GuestSection = ({ isLoading }: GuestSectionProps) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 dark:text-zinc-100">
        {t("GuestsSection.name")}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 rounded-md border border-slate-300 gap-5 px-5 py-5 bg-zinc-300 dark:bg-zinc-800 dark:border-zinc-700">
        <Input
          label={t("GuestsSection.adults")}
          labelClass="text-gray-700 font-semibold dark:text-zinc-100"
          className="dark:bg-zinc-700 dark:border-zinc-700"
          type="number"
          min={1}
          disabled={isLoading}
          error={errors.adultCount}
          {...register("adultCount", { valueAsNumber: true })}
        />
        <Input
          label={t("GuestsSection.children")}
          labelClass="text-gray-700 font-semibold dark:text-zinc-100"
          className="dark:bg-zinc-700 dark:border-zinc-700"
          type="number"
          min={0}
          disabled={isLoading}
          error={errors.childCount}
          {...register("childCount", { valueAsNumber: true })}
        />
      </div>
    </div>
  );
};

export default GuestSection;
