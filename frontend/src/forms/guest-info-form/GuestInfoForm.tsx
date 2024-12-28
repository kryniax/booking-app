import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { enGB } from "date-fns/locale/en-GB";
import { pl } from "date-fns/locale/pl";
import { de } from "date-fns/locale/de";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
registerLocale("en", enGB);
registerLocale("pl", pl);
registerLocale("de", de);

type GuestInfoFormProps = {
  hotelId: string;
  pricePerNight: number;
};

const guestInfoSchema = (t: TFunction) =>
  z
    .object({
      checkIn: z.date({
        required_error: t("GuestInfoForm.validation.checkIn.required"),
        invalid_type_error: t("GuestInfoForm.validation.checkIn.invalid"),
      }),
      checkOut: z.date({
        required_error: t("GuestInfoForm.validation.checkOut.required"),
        invalid_type_error: t("GuestInfoForm.validation.checkOut.invalid"),
      }),
      adultCount: z.coerce
        .number({
          required_error: t("GuestInfoForm.validation.adult.required"),
          invalid_type_error: t("GuestInfoForm.validation.adult.invalid"),
        })
        .min(1, t("GuestInfoForm.validation.adult.min"))
        .max(12, t("GuestInfoForm.validation.adult.max"))
        .default(1),
      childCount: z.coerce
        .number()
        .min(0, t("GuestInfoForm.validation.child.min"))
        .max(12, t("GuestInfoForm.validation.child.max"))
        .optional()
        .default(0),
    })
    .refine((data) => data.checkOut > data.checkIn, {
      message: t("GuestInfoForm.validation.checkOut.after"),
      path: ["checkOut"],
    });

type GuestInfoFormData = z.infer<ReturnType<typeof guestInfoSchema>>;

const GuestInfoForm = ({ hotelId, pricePerNight }: GuestInfoFormProps) => {
  const { isLoggedIn, currentLanguage } = useAppContext();
  const { t } = useTranslation();
  const search = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [calendarLanguage, setCalendarLanguage] =
    useState<string>(currentLanguage);

  const formSchema = useMemo(() => {
    return guestInfoSchema(t);
  }, [t]);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount as number,
      childCount: search.childCount as number,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = handleSubmit((data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/login", { state: { from: location } });
  });

  const onSubmit = handleSubmit((data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  });

  useEffect(() => {
    if (currentLanguage === "gb") {
      setCalendarLanguage("en");
    } else {
      setCalendarLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">
        {pricePerNight}$ {t("BookingApp.perNight")}
      </h3>
      <form onSubmit={isLoggedIn ? onSubmit : onSignInClick}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              locale={calendarLanguage}
              dateFormat="dd/MM/yyyy"
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText={t("BookingApp.checkIn")}
              className="min-w-full bg-white p-2 focus:outline-none capitalize"
              wrapperClassName="min-w-full"
            />
            {errors.checkIn && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.checkIn.message}
              </span>
            )}
          </div>
          <div>
            <DatePicker
              required
              locale={calendarLanguage}
              dateFormat="dd/MM/yyyy"
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText={t("BookingApp.checkOut")}
              className="min-w-full bg-white p-2 focus:outline-none capitalize"
              wrapperClassName="min-w-full"
            />
            {errors.checkOut && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.checkOut.message}
              </span>
            )}
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="flex items-center capitalize">
              {t("BookingApp.adults")}:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={1}
                max={12}
                {...register("adultCount")}
              />
            </label>
            <label className="flex items-center capitalize">
              {t("BookingApp.children")}:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={0}
                max={12}
                {...register("childCount")}
              />
            </label>
          </div>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
          {errors.childCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.childCount.message}
            </span>
          )}
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white text-xl h-full p-2 font-bold hover:bg-blue-500 transition duration-100">
              {t("GuestInfoForm.bookNow")}
            </button>
          ) : (
            <button className="bg-blue-600 text-white text-xl h-full p-2 font-bold hover:bg-blue-500 transition duration-100">
              {t("GuestInfoForm.signInToBook")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
