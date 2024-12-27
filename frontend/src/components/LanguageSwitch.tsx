import { useAppContext } from "../contexts/AppContext";
import { GB, PL, DE } from "country-flag-icons/react/1x1";

type LanguageSwitchProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const LanguageSwitch = ({ onClick }: LanguageSwitchProps) => {
  const { currentLanguage } = useAppContext();

  const getCurrentFlag = () => {
    switch (currentLanguage) {
      case "gb":
        return <GB title="English" className="rounded-full" />;
      case "pl":
        return <PL title="Polski" className="rounded-full" />;
      case "de":
        return <DE title="Deutch" className="rounded-full" />;
      default:
        return <GB title="English" className="rounded-full" />;
    }
  };

  return (
    <button className="relative size-10 p-1" onClick={onClick}>
      {getCurrentFlag()}
    </button>
  );
};

export default LanguageSwitch;
