import { useTranslation } from "react-i18next";

type PriceFilterProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: PriceFilterProps) => {
  const { t } = useTranslation();
  return (
    <div className="border-b border-slate-300 dark:border-zinc-200 pb-5">
      <h4 className="text-md font-semibold mb-2 dark:text-zinc-100">
        {t("PriceFilter.maxPrice")}
      </h4>
      <select
        className="p-2 border rounded-md w-full dark:bg-zinc-700 dark:border-zinc-700 dark:text-zinc-100"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">{t("PriceFilter.selectMaxPrice")}</option>
        {[50, 100, 150, 200, 300, 400, 800].map((price) => (
          <option key={`price-${price}`} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
