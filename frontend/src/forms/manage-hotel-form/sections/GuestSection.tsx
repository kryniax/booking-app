import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";
import Input from "../../../components/Input";
import { useTranslation } from "react-i18next";

const GuestSection = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{t("GuestsSection.name")}</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 px-5 py-5 bg-gray-300">
        <Input
          label={t("GuestsSection.adults")}
          labelClass="text-gray-700 font-semibold"
          type="number"
          min={1}
          error={errors.adultCount}
          {...register("adultCount")}
        />
        <Input
          label={t("GuestsSection.children")}
          labelClass="text-gray-700 font-semibold"
          type="number"
          min={0}
          error={errors.childCount}
          {...register("childCount")}
        />
      </div>
    </div>
  );
};

export default GuestSection;
