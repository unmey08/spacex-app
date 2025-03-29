import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

type SortButtonProps = {
  sortDirection: string;
  handleYearSort: () => void;
};

const SortButton = ({ sortDirection, handleYearSort }: SortButtonProps) => {
  return (
    <div className="flex justify-end mt-5 md:mt-0 md:self-center dark:text-white">
      <button
        type="button"
        onClick={handleYearSort}
        className="hover:cursor-pointer"
        aria-label="Sort by year"
        role="button"
      >
        <span className="mr-2">Sort</span>
        {sortDirection === "default" && <FontAwesomeIcon icon={faSort} />}
        {sortDirection === "asc" && <FontAwesomeIcon icon={faSortUp} />}
        {sortDirection === "desc" && <FontAwesomeIcon icon={faSortDown} />}
      </button>
    </div>
  );
};
export default SortButton;
