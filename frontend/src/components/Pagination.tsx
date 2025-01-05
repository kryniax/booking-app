import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={`page-${number}`}>
            <Link
              to={`/search/${number}`}
              onClick={() => onPageChange(number)}
              className={twMerge(
                `block px-2 py-1 mx-0.5 rounded-md border cursor-pointer border-slate-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100`,
                page === number ? "bg-gray-200 dark:bg-zinc-600" : ""
              )}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
