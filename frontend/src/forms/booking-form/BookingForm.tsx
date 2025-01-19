import { PaymentIntentResponse, UserType } from "../../types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useCreateBooking } from "../../api/BookingApi";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../contexts/AppContext";
import { useCurrencyContext } from "../../contexts/CurrencyContext";
import PulseLoader from "react-spinners/PulseLoader";
import { CiCircleCheck } from "react-icons/ci";
import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";

type BookingFormProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

const bookingFormSchema = z.object({
  firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(3, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
  adultCount: z.number().optional(),
  childCount: z.number().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  hotelId: z.string().optional(),
  totalCost: z.number().optional(),
  paymentIntentId: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

const BookingForm = ({ currentUser, paymentIntent }: BookingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { bookHotel, isPending, isSuccess } = useCreateBooking();
  const { t } = useTranslation();
  const { theme } = useAppContext();
  const { formatPrice } = useCurrencyContext();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return <span>Payment Error</span>;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookHotel({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: theme ? "#f4f4f5" : "#18181b",
        "::placeholder": {
          color: theme ? "#71717a" : "#a1a1aa",
        },
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid grid-cols-1 gap-5 rounded-lg border border-slate-300 dark:bg-zinc-800 dark:border-zinc-700 p-5"
    >
      <span className="text-3xl font-bold dark:text-zinc-100">
        {t("BookingForm.title")}
      </span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-zinc-700 text-sm font-bold flex-1 dark:text-zinc-100">
          {t("BookingForm.firstName")}
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-zinc-700 bg-gray-200 dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-600 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-zinc-700 text-sm font-bold flex-1 dark:text-zinc-100">
          {t("BookingForm.lastName")}
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-zinc-700 bg-gray-200 dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-600 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-zinc-700 text-sm font-bold flex-1 dark:text-zinc-100">
          {t("BookingForm.email")}
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-zinc-700 bg-gray-200 dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-600 font-normal"
            type="email"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold dark:text-zinc-100">
          {t("BookingForm.yourPriceSummary")}
        </h2>
        <div className="bg-blue-200 dark:bg-zinc-600 p-4 rounded-md">
          <span className="font-semibold text-lg dark:text-zinc-100">
            {t("BookingForm.totalCost")}:{" "}
            {formatPrice(Number(paymentIntent.totalCost.toFixed(2)))}
          </span>
          <p className="text-xs dark:text-zinc-200">
            {t("BookingForm.includesTaxesAndCharges")}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold dark:text-zinc-100">
          {t("BookingForm.paymentDetails")}
        </h3>
        <CardElement
          id="payment-element"
          className="border dark:border-zinc-100 rounded-md p-3 text-sm"
          options={cardElementOptions}
        />
      </div>
      <div className="flex justify-end">
        {isSuccess ? (
          <span className="bg-lime-600 dark:bg-lime-900 text-white p-2 font-bold rounded-md">
            {t("BookingForm.successPayment")}
          </span>
        ) : (
          <Button variant="primary" disabled={isPending} type="submit">
            {isPending ? "Saving..." : t("BookingForm.confirmBooking")}
          </Button>
        )}
      </div>
      {isSubmitting ? (
        <div className="z-10 absolute top-0 left-0 w-full h-full rounded-lg backdrop-blur-xs">
          <div className="flex h-full flex-1 items-center justify-center py-10">
            <PulseLoader color="#1e40af" size={25} />
          </div>
        </div>
      ) : isSuccess ? (
        <div className="z-10 absolute top-0 left-0 w-full h-full rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex flex-col h-full flex-1 items-center justify-center">
            <CiCircleCheck
              size={200}
              className="text-lime-600 dark:text-lime-700"
            />
            <span className="text-2xl lg:text-3xl font-semibold text-lime-600 dark:text-lime-700 mb-16">
              {t("BookingForm.successPayment")}
            </span>
            <div className="flex gap-3">
              <ButtonLink variant="secondary" to="/">
                {t("Header.mainPage")}
              </ButtonLink>
              <ButtonLink variant="secondary" to="/my-bookings">
                {t("Header.myBookings")}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default BookingForm;
