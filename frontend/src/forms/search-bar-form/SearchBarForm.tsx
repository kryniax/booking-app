import DatePicker from "react-datepicker";
import { MdTravelExplore } from "react-icons/md";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { TFunction } from "i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/Button";

const searchBarSchema = (t: TFunction) =>
  z
    .object({
      destination: z
        .string()
        .min(1, t("SearchBarForm.validation.destination.required"))
        .refine(
          (value) => !/[0-9]/.test(value),
          t("SearchBarForm.validation.destination.numbers")
        )
        .refine(
          (value) => !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(value),
          t("SearchBarForm.validation.destination.specialChars")
        ),
      checkIn: z.date({
        required_error: t("SearchBarForm.validation.checkIn.required"),
        invalid_type_error: t("SearchBarForm.validation.checkIn.invalid"),
      }),
      checkOut: z.date({
        required_error: t("SearchBarForm.validation.checkOut.required"),
        invalid_type_error: t("SearchBarForm.validation.checkOut.invalid"),
      }),
      adultCount: z.coerce
        .number({
          required_error: t("SearchBarForm.validation.adult.required"),
          invalid_type_error: t("SearchBarForm.validation.adult.invalid"),
        })
        .min(1, t("SearchBarForm.validation.adult.min"))
        .max(12, t("SearchBarForm.validation.adult.max"))
        .default(1),
      childCount: z.coerce
        .number()
        .min(0, t("SearchBarForm.validation.child.min"))
        .max(12, t("SearchBarForm.validation.child.max"))
        .optional()
        .default(0),
    })
    .refine((data) => data.checkOut > data.checkIn, {
      message: t("SearchBarForm.validation.checkOut.after"),
      path: ["checkOut"],
    });

type SearchBarFormData = z.infer<ReturnType<typeof searchBarSchema>>;

const SearchBarForm = () => {
  const { currentLanguage } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [calendarLanguage, setCalendarLanguage] =
    useState<string>(currentLanguage);

  const formSchema = useMemo(() => zodResolver(searchBarSchema(t)), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SearchBarFormData>({
    resolver: formSchema,
    mode: "onSubmit",
    defaultValues: {
      destination: search.destination,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  useEffect(() => {
    //trigger();
  }, [t, trigger]);

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const onSubmit = async (data: SearchBarFormData) => {
    search.saveSearchValues(
      data.destination,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate("/search/1");
  };

  useEffect(() => {
    if (currentLanguage === "gb") {
      setCalendarLanguage("en");
    } else {
      setCalendarLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="-mt-8 p-1 bg-orange-400 dark:bg-zinc-950 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 items-stretch gap-1"
    >
      <div className="flex flex-col flex-1 bg-white dark:bg-zinc-800 p-2 rounded-md">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center">
            <MdTravelExplore size={25} className="mr-1 dark:text-zinc-300" />
            <input
              placeholder={t("SearchBarForm.destinationPlaceholder")}
              className="text-md w-full p-1 focus:outline-none dark:bg-zinc-800 dark:text-zinc-300"
              {...register("destination")}
            />
          </div>
          {errors.destination && (
            <span className="text-red-500 text-xs font-semibold pl-1">
              {errors.destination.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-white dark:bg-zinc-800 p-2 gap-2 rounded-md">
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
      <div className="flex flex-col h-full bg-white dark:bg-zinc-800 rounded-md p-2">
        <div className="flex flex-1">
          <DatePicker
            locale={calendarLanguage}
            dateFormat="dd-MM-yyyy"
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
            className="min-w-full pt-1 pl-1 bg-white dark:bg-zinc-800 dark:text-zinc-300 rounded-md focus:outline-none capitalize"
            wrapperClassName="min-w-full"
            portalId="root"
          />
        </div>
        {errors.checkIn && (
          <span className="text-red-500 text-xs font-semibold pl-1">
            {errors.checkIn.message}
          </span>
        )}
      </div>
      <div className="flex flex-col h-full bg-white dark:bg-zinc-800 rounded-md p-2">
        <div className="flex flex-1">
          <DatePicker
            locale={calendarLanguage}
            dateFormat="dd-MM-yyyy"
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
            portalId="root"
          />
        </div>
        {errors.checkOut && (
          <span className="text-red-500 text-xs font-semibold pl-1">
            {errors.checkOut.message}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        <Button
          variant="primary"
          type="submit"
          className="text-xl w-full font-bold justify-center"
        >
          {t("BookingApp.search")}
        </Button>
      </div>
    </form>
  );
};

export default SearchBarForm;
