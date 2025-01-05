import { TfiFaceSad } from "react-icons/tfi";
import { Link } from "react-router-dom";

type EmptyProps = {
  title: string;
  link?: string;
  href?: any;
  button?: string;
  onClick?: () => void;
};

const Empty = ({ title, link, href, button, onClick }: EmptyProps) => {
  return (
    <div className="flex flex-col flex-1 gap-5 items-center justify-center py-10">
      <TfiFaceSad size={90} className="text-black/80 dark:text-zinc-100" />
      <span className="font-bold text-2xl text-black/80 dark:text-zinc-100">
        {title}
      </span>
      <div className="flex flex-col sm:flex-row gap-3 ">
        {button && onClick && (
          <button
            onClick={onClick}
            className="flex items-center text-white bg-blue-500 dark:bg-blue-900 py-2 px-3 font-bold hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md transition duration-50"
          >
            {button}
          </button>
        )}
        {link && href && (
          <Link
            to={href}
            className="flex items-center text-white bg-blue-500 dark:bg-blue-900 py-2 px-3 font-bold hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md transition duration-50"
          >
            {link}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Empty;
