import React from "react";
import { useTranslation } from "react-i18next";

type StarRatingFilterProps = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({
  selectedStars,
  onChange,
}: StarRatingFilterProps) => {
  const getStarText = (count: string): string => {
    return t(`StarRatingFilter.stars.${count}`);
  };

  const { t } = useTranslation();
  return (
    <div className="border-b border-slate-300 dark:border-zinc-200 pb-5">
      <h4 className="text-md font-semibold mb-2 dark:text-zinc-100">
        {t("StarRatingFilter.propertyRating")}
      </h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label
          key={`starRating-${star}`}
          className="flex items-center space-x-2 dark:text-zinc-100"
        >
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>
            {star} {getStarText(star)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
