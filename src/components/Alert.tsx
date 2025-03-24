import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type AlertProps = {
  closeAlert: () => void;
};

const Alert = ({ closeAlert }: AlertProps) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-4 md:my-20 text-left"
      role="alert"
    >
      <button
        type="button"
        role="button"
        className="hover:cursor-pointer flex justify-end w-full"
        onClick={closeAlert}
        aria-label="Close Alert"
      >
        <FontAwesomeIcon icon={faClose} size="lg" />
      </button>
      <div>
        <div className="self-center w-full">
          <strong className="font-bold">Success!</strong>
          <span className="inline"> New mission created!</span>
          <Link type="button" to="/" role="button" className="m-0">
            <button
              className="md:px-2 font-medium hover:shadow-none cursor-pointer text-green-700 underline align-middle -mt-1 hover:text-gray-900 duration-150"
              onClick={closeAlert}
              aria-label="Go to home page"
              role="button"
            >
              Go to Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Alert;
