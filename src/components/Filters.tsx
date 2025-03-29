import { ChangeEvent } from "react";

type FilterProps = {
  onSearch: (value: string) => void;
  searchText: string;
};

const Filters = ({ onSearch, searchText }: FilterProps) => {
  return (
    <div className="w-full md:w-1/2">
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            placeholder="Search by mission, rocket or year..."
            className="block  ps-10 text-md border text-gray-800 placeholder-gray-500 border-gray-700 my-2 p-4 rounded-lg w-full shadow-gray-200 shadow-sm bg-white dark:bg-slate-900 dark:shadow-black dark:placeholder-white dark:text-gray-300 font-bold"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (
                e.target?.value.includes("<") ||
                e.target?.value.includes(">")
              ) {
                e.preventDefault();
              } else {
                onSearch(e.target?.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Filters;
