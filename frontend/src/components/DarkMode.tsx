import { BsFillSunFill, BsMoon } from "react-icons/bs";
import { useAppContext } from "../contexts/AppContext";

const DarkMode = () => {
  const { theme, setTheme } = useAppContext();

  return (
    <button
      className="size-10 flex items-center justify-center"
      onClick={() => setTheme(!theme)}
    >
      {theme ? (
        <BsMoon size={20} className="text-zinc-300" />
      ) : (
        <BsFillSunFill size={20} className="text-yellow-500" />
      )}
    </button>
  );
};

export default DarkMode;
