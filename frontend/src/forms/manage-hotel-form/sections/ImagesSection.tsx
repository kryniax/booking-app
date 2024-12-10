import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";
import Input from "../../../components/Input";
import React from "react";

const ImagesSection = () => {
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
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
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
          label="Image"
          type="file"
          multiple
          accept="image/*"
          labelClass="sm:max-w-[80%] lg:max-w-[40%]"
          error={errors.imageFiles}
          {...register("imageFiles")}
        />
      </div>
    </div>
  );
};

export default ImagesSection;
