import { useAppContext } from "../contexts/AppContext";

const LanguageSwitch = () => {
  const { currentLanguage, changeLanguage } = useAppContext();

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 rounded ${
          currentLanguage === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={`px-3 py-1 rounded ${
          currentLanguage === "pl" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => changeLanguage("pl")}
      >
        PL
      </button>
    </div>
  );
};

export default LanguageSwitch;
