import { useFormContext } from "react-hook-form";
import Input from "../../../components/Input";
import { HotelFormData } from "../ManageHotelForm";

type DetailsSectionProps = {
  title: string;
};

const DetailsSection = (props: DetailsSectionProps) => {
  const { title } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">{`${title} Hotel`}</h1>
      <Input
        label="Name"
        type="text"
        error={errors.name}
        {...register("name")}
      />
      <div className="flex gap-4">
        <Input
          label="City"
          type="text"
          error={errors.city}
          {...register("city")}
        />
        <Input
          label="Country"
          type="text"
          error={errors.country}
          {...register("country")}
        />
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal resize-none"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <Input
        label="Price Per Night"
        labelClass="max-w-[50%]"
        type="number"
        min={1}
        error={errors.pricePerNight}
        {...register("pricePerNight")}
      />
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating")}
          className="border rouded w-full text-gray-700 font-normal"
        >
          <option value="0" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={`option${num}`} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
