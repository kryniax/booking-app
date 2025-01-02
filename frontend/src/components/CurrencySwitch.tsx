import { useCurrencyContext } from "../contexts/CurrencyContext";

type CurrencySwitchProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CurrencySwitch = ({ onClick }: CurrencySwitchProps) => {
  const { currentCurrency } = useCurrencyContext();

  const getCurrencyIcon = () => {
    switch (currentCurrency) {
      case "USD":
        return <span className="text-2xl font-semibold">&#36;</span>;
      case "EUR":
        return <span className="text-2xl font-semibold">&#8364;</span>;
      case "GBP":
        return <span className="text-2xl font-semibold">&#163;</span>;
      case "PLN":
        return <span className="text-xl font-semibold">PLN</span>;
      default:
        return <span className="text-2xl font-semibold">&#36;</span>;
    }
  };

  return (
    <button className="relative size-10 p-1" onClick={onClick}>
      {getCurrencyIcon()}
    </button>
  );
};

export default CurrencySwitch;
