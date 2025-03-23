import { Link } from "react-router-dom";
import logo from "../assets/images/spacex-logo.svg";

const Navbar = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="mb-5 flex justify-between w-full absolute">
      <Link to="/" aria-label="Go to home page">
        <img src={logo} className="h-24" alt="Space X Logo" />
      </Link>
      <div className="flex">
        {pathname.includes("/missionDetails") && (
          <Link
            to={"/"}
            className="block text-gray-700 hover:text-gray-500 font-medium duration-150 self-center hover:underline"
            aria-label="Create mission"
          >
            <button
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5] hover:cursor-pointer py-2 px-4 font-medium duration-150"
              aria-label="Back to missions list"
            >
              <span>Back to missions list</span>
            </button>
          </Link>
        )}
        {pathname !== "/createMission" && (
          <Link
            to={"createMission"}
            className="block text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 self-center"
            aria-label="Create mission"
          >
            <button
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5] hover:cursor-pointer py-2 px-4 font-medium duration-150 active:bg-gray-100 border border-gray-400 rounded-lg hover:shadow-md"
              aria-label="Create mission"
            >
              <span>Create mission</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
