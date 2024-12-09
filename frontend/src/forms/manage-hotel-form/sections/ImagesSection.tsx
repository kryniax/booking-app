import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";
import Input from "../../../components/Input";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
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
