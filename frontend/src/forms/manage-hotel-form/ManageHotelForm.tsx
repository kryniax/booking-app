import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./sections/DetailsSection";
import TypeSection from "./sections/TypeSection";
import FacilitiesSection from "./sections/FacilitiesSection";
import GuestSection from "./sections/GuestSection";
import ImagesSection from "./sections/ImagesSection";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  city: z.string().min(3, { message: "City is required" }),
  country: z.string().min(3, { message: "Country is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  type: z.string().min(3, { message: "Type is required" }),
  pricePerNight: z.coerce.number({
    required_error: "Price per night is required",
    invalid_type_error: "must be a valid number",
  }),
  starRating: z.coerce.number({
    required_error: "Star rating is required",
    invalid_type_error: "must be a valid number",
  }),
  facilities: z
    .array(z.string())
    .nonempty({ message: "please select at least one item" }),
  adultCount: z.coerce.number({
    required_error: "Adult count is required",
    invalid_type_error: "must be a valid number",
  }),
  childCount: z.coerce.number({
    required_error: "Child count is required",
    invalid_type_error: "must be a valid number",
  }),
  imageFiles: z
    .instanceof(FileList, { message: "Image is required" })
    .optional(),
});

export type HotelFormData = z.infer<typeof formSchema>;

type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = (props: ManageHotelFormProps) => {
  const { onSave, isLoading } = props;

  const form = useForm<HotelFormData>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = form;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles as FileList).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold rounded-md hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
