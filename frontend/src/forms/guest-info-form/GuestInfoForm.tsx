import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";
import { enGB } from "date-fns/locale/en-GB";
import { useSearchContext } from "../../contexts/SearchContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
registerLocale("en", enGB);

type GuestInfoFormProps = {
  hotelId: string;
  pricePerNight: number;
};

const guestInfoSchema = z
  .object({
    checkIn: z.date({
      required_error: "Check-in date is required",
      invalid_type_error: "Invalid check-in date",
    }),
    checkOut: z.date({
      required_error: "Check-out date is required",
      invalid_type_error: "Invalid check-out date",
    }),
    adultCount: z.coerce
      .number({
        required_error: "Adult count is required",
        invalid_type_error: "Adult count must be a number",
      })
      .min(1, "There must be at least one adult")
      .max(12, "Maximum 12 adults allowed")
      .default(1),
    childCount: z.coerce
      .number()
      .min(0, "Child count cannot be negative")
      .max(12, "Maximum 12 children allowed")
      .optional()
      .default(0),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

type GuestInfoFormData = z.infer<typeof guestInfoSchema>;

const GuestInfoForm = ({ hotelId, pricePerNight }: GuestInfoFormProps) => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    resolver: zodResolver(guestInfoSchema),
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount as number,
      childCount: search.childCount as number,
    },
  });
  console.log(search.adultCount);
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

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">{pricePerNight}$ per night</h3>
      <form onSubmit={isLoggedIn ? onSubmit : onSignInClick}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              locale="en"
              dateFormat="dd/MM/yyyy"
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
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
              locale="en"
              dateFormat="dd/MM/yyyy"
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
            {errors.checkOut && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.checkOut.message}
              </span>
            )}
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="flex items-center">
              Adults:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={1}
                max={12}
                {...register("adultCount")}
              />
            </label>
            <label className="flex items-center">
              Children:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={0}
                max={12}
                {...register("childCount")}
              />
            </label>
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
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white text-xl h-full p-2 font-bold hover:bg-blue-500 transition duration-100">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white text-xl h-full p-2 font-bold hover:bg-blue-500 transition duration-100">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
