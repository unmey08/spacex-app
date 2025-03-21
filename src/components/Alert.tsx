import { Link } from "react-router-dom";

type AlertProps = {
  closeAlert: () => void;
};

const Alert = ({ closeAlert }: AlertProps) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-20 text-left md:flex justify-between sm:block"
      role="alert"
    >
      <div className="self-center">
        <strong className="font-bold">Success!</strong>
        <span className="inline"> New mission Created</span>
      </div>

      <Link type="button" to="/">
        <button
          className="py-2 px-4 font-medium bg-green-600 duration-150 hover:bg-green-500  rounded-lg shadow-lg hover:shadow-none cursor-pointer text-white align-middle"
          onClick={closeAlert}
          aria-label="Go to home page"
        >
          Go to Home Page
        </button>
      </Link>
    </div>
  );
};
export default Alert;
