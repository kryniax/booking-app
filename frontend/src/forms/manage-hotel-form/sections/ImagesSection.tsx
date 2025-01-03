import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";
import Input from "../../../components/Input";
import React from "react";
import { useTranslation } from "react-i18next";

type ImagesSectionProps = {
  isLoading: boolean;
};

const ImagesSection = ({ isLoading }: ImagesSectionProps) => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 dark:text-zinc-100">
        {t("ImagesSection.name")}
      </h2>
      <div className="border rounded p-4 flex flex-col gap-4 dark:border-zinc-700 dark:bg-zinc-800">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((imageUrl, index) => (
              <div key={`hotelImage${index}`} className="relative group">
                {imageUrl && (
                  <>
                    <img
                      src={imageUrl}
                      alt={`Hotel Image ${index + 1}`}
                      title={`Hotel Image ${index + 1}`}
                      className="min-h-full object-cover"
                    />
                    <button
                      onClick={(event) => handleDelete(event, imageUrl)}
                      className="absolute text-transparent inset-0 flex items-center justify-center  group-hover:bg-black/50 group-hover:text-white transition duration-200"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        <Input
          label={t("ImagesSection.label")}
          type="file"
          multiple
          accept="image/*"
          labelClass="sm:max-w-[80%] lg:max-w-[40%]"
          className="border-zinc-700"
          error={errors.imageFiles}
          disabled={isLoading}
          {...register("imageFiles")}
        />
      </div>
    </div>
  );
};

export default ImagesSection;
