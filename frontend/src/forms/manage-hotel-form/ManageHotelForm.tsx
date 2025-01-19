import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./sections/DetailsSection";
import TypeSection from "./sections/TypeSection";
import FacilitiesSection from "./sections/FacilitiesSection";
import GuestSection from "./sections/GuestSection";
import ImagesSection from "./sections/ImagesSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelType } from "../../types";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { hotelTypeKeys } from "../../config/hotel-options-config";
import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";

const createFormSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(2, { message: t("ManageHotelForm.validation.name") }),
    city: z.string().min(2, { message: t("ManageHotelForm.validation.city") }),
    country: z
      .string()
      .min(3, { message: t("ManageHotelForm.validation.country") }),
    description: z
      .string()
      .min(3, { message: t("ManageHotelForm.validation.description") }),
    type: z.enum(hotelTypeKeys as unknown as [string, ...string[]], {
      required_error: t("ManageHotelForm.validation.type.required"),
      invalid_type_error: t("ManageHotelForm.validation.type.invalid"),
    }),
    pricePerNight: z.coerce
      .number({
        required_error: t("ManageHotelForm.validation.pricePerNight.required"),
        invalid_type_error: t(
          "ManageHotelForm.validation.pricePerNight.invalid"
        ),
      })
      .min(1, t("ManageHotelForm.validation.pricePerNight.min")),
    starRating: z.coerce
      .number({
        required_error: t("ManageHotelForm.validation.starRating.required"),
        invalid_type_error: t("ManageHotelForm.validation.starRating.invalid"),
      })
      .min(1, t("ManageHotelForm.validation.starRating.min")),
    facilities: z
      .array(z.string())
      .min(1, t("ManageHotelForm.validation.facilities")),
    adultCount: z.coerce.number({
      required_error: t("ManageHotelForm.validation.adultCount.required"),
      invalid_type_error: t("ManageHotelForm.validation.adultCount.invalid"),
    }),
    childCount: z.coerce.number({
      required_error: t("ManageHotelForm.validation.adultCount.required"),
      invalid_type_error: t("ManageHotelForm.validation.adultCount.invalid"),
    }),
    imageUrls: z.array(z.string()).optional(),
    imageFiles: z.instanceof(FileList).optional(),
  });

export type HotelFormData = z.infer<ReturnType<typeof createFormSchema>>;

type ManageHotelFormProps = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = (props: ManageHotelFormProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const { onSave, isLoading, hotel } = props;

  const formSchema = useMemo(() => {
    return createFormSchema(t);
  }, [t]);

  const form = useForm<HotelFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilities: [],
    },
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (hotel !== undefined) {
      setTitle(t("ManageHotelForm.titleUpdate"));
    } else {
      setTitle(t("ManageHotelForm.title"));
    }
    reset(hotel);
  }, [hotel, t, reset]);
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
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

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((imageUrl, index) => {
        if (imageUrl) {
          formData.append(`imageUrls[${index}]`, imageUrl);
        }
      });
    }

    Array.from(formDataJson.imageFiles as FileList).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <DetailsSection isLoading={isLoading} title={title} />
        <TypeSection isLoading={isLoading} />
        <FacilitiesSection isLoading={isLoading} />
        <GuestSection isLoading={isLoading} />
        <ImagesSection isLoading={isLoading} />
        <span className="flex justify-end gap-3">
          <ButtonLink variant="cancel" to="/my-hotels" className="text-xl">
            {t("BookingApp.cancel")}
          </ButtonLink>
          <Button
            variant="primary"
            disabled={isLoading}
            className="text-xl"
            type="submit"
          >
            {isLoading
              ? t("ManageHotelForm.savingHotelButton")
              : t("ManageHotelForm.saveHotelButton")}
          </Button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
