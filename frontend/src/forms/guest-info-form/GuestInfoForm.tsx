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
import { useCurrencyContext } from "../../contexts/CurrencyContext";
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
  const { formatPrice } = useCurrencyContext();
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
    trigger,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
    <div className="flex flex-col p-3 bg-blue-200 dark:bg-zinc-700 gap-4 rounded-md">
      <h3 className="text-2xl font-bold dark:text-zinc-100">
        {formatPrice(pricePerNight)} {t("BookingApp.perNight")}
      </h3>
      <form onSubmit={isLoggedIn ? onSubmit : onSignInClick}>
        <div className="grid grid-cols-1 gap-3 items-center">
          <div className="flex flex-col h-full bg-white dark:bg-zinc-800 rounded-md p-3">
            <div className="flex flex-1">
              <DatePicker
                locale={calendarLanguage}
                dateFormat="dd/MM/yyyy"
                selected={checkIn}
                onChange={(date) => {
                  setValue("checkIn", date as Date);
                  trigger("checkIn");
                }}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={`${t("BookingApp.checkIn")}`}
                className="min-w-full pl-1 bg-white dark:bg-zinc-800 dark:text-zinc-300 rounded-md focus:outline-none capitalize"
                wrapperClassName="min-w-full"
              />
            </div>
            {errors.checkIn && (
              <span className="text-red-500 text-xs font-semibold pl-1">
                {errors.checkIn.message}
              </span>
            )}
          </div>
          <div className="flex flex-col h-full bg-white dark:bg-zinc-800 rounded-md p-3">
            <div className="flex flex-1">
              <DatePicker
                locale={calendarLanguage}
                dateFormat="dd/MM/yyyy"
                selected={checkOut}
                onChange={(date) => {
                  setValue("checkOut", date as Date);
                  trigger("checkOut");
                }}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={`${t("BookingApp.checkOut")}`}
                className="min-w-full pt-1 pl-1 bg-white dark:bg-zinc-800 dark:text-zinc-300 rounded-md focus:outline-none capitalize"
                wrapperClassName="min-w-full"
              />
            </div>
            {errors.checkOut && (
              <span className="text-red-500 text-xs font-semibold pl-1">
                {errors.checkOut.message}
              </span>
            )}
          </div>
          <div className="flex flex-col flex-1 bg-white dark:bg-zinc-800  p-3 gap-2 rounded-md">
            <div className="flex p-1 flex-1">
              <label className="flex items-start capitalize dark:text-zinc-300">
                {t("BookingApp.adults")}:
                <input
                  type="number"
                  className="w-full pl-1 focus:outline-none font-bold dark:bg-zinc-800 dark:text-zinc-300"
                  min={1}
                  max={12}
                  {...register("adultCount")}
                />
              </label>
              {search.childCount > 0 && (
                <label className="flex items-start capitalize dark:text-zinc-300">
                  {t("BookingApp.children")}:
                  <input
                    type="number"
                    className="w-full pl-1 focus:outline-none font-bold dark:bg-zinc-800 dark:text-zinc-300"
                    min={0}
                    max={12}
                    {...register("childCount")}
                  />
                </label>
              )}
            </div>
            {errors.adultCount && (
              <span className="text-red-500 text-xs font-semibold pl-1">
                {errors.adultCount.message}
              </span>
            )}
            {errors.childCount && (
              <span className="text-red-500 text-xs font-semibold pl-1">
                {errors.childCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 dark:bg-blue-900 text-white text-xl h-full p-3 font-bold rounded-md hover:bg-blue-500 hover:dark:bg-blue-800 transition duration-100">
              {t("GuestInfoForm.bookNow")}
            </button>
          ) : (
            <button className="bg-blue-600 dark:bg-blue-900 text-white text-xl h-full p-3 font-bold rounded-md hover:bg-blue-500 hover:dark:bg-blue-800 transition duration-100">
              {t("GuestInfoForm.signInToBook")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
