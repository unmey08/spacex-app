import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type AlertProps = {
  closeAlert: () => void;
};

const Alert = ({ closeAlert }: AlertProps) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4 md:my-20 text-left flex justify-between sm:block"
      role="alert"
    >
      <div className="self-center w-1/2 md:w-full">
        <strong className="font-bold">Success!</strong>
        <span className="inline"> New mission created</span>
      </div>
      <div className="w-full md:w-1/7 flex justify-end">
        <Link type="button" to="/" role="button">
          <button
            className="py-2 px-4 font-medium bg-green-600 duration-150 hover:bg-green-500  rounded-lg shadow-lg hover:shadow-none cursor-pointer text-white align-middle mr-2 md:mr-8"
            onClick={closeAlert}
            aria-label="Go to home page"
            role="button"
          >
            Go to Home Page
          </button>
        </Link>
        <button
          type="button"
          role="button"
          className="hover:cursor-pointer"
          onClick={closeAlert}
          aria-label="Close Alert"
        >
          <FontAwesomeIcon icon={faClose} size="lg" />
        </button>
      </div>
    </div>
  );
};
export default Alert;
