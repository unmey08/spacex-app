import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/spacex-logo.svg";
import Theme from "./Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type NavbarProps = {
  pathname: string;
  theme: string;
  handleThemeChange: () => void;
};
const Navbar = ({ pathname, theme, handleThemeChange }: NavbarProps) => {
  const [menu, setMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenu((value) => !value);
  };

  return (
    <nav>
      <div className="md:mb-5 flex justify-between w-full absolute">
        <Link
          to="/"
          aria-label="Go to home page"
          onClick={() => setMenu(false)}
        >
          <img src={logo} className="h-20 md:h-24" alt="Space X Logo" />
        </Link>
        <div className="hidden md:flex text-xs md:text-lg">
          <Theme theme={theme} handleThemeChange={handleThemeChange} />
          {pathname.includes("/missionDetails") && (
            <Link
              to={"/"}
              className="block text-gray-700 hover:text-gray-500 font-medium duration-150 self-center hover:underline"
              aria-label="Create mission"
            >
              <button
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5] hover:cursor-pointer p-2 md:py-2 md:px-4 font-medium duration-150"
                aria-label="Back to missions list"
                role="button"
              >
                <span>Back to missions list</span>
              </button>
            </Link>
          )}
          {pathname !== "/createMission" && (
            <Link
              to={"createMission"}
              className="block text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 self-center mr-5"
              aria-label="Create mission"
            >
              <button
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#1c12dc] to-[#E114E5] hover:cursor-pointer p-2 md:py-2 md:px-4 font-medium duration-300 active:bg-gray-100 border border-gray-500 rounded-lg hover:shadow-xl dark:border-2 dark:border-gray-500 !dark:active:bg-slate-900"
                aria-label="Create mission"
                role="button"
              >
                <span>Create mission</span>
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden flex">
          <Theme theme={theme} handleThemeChange={handleThemeChange} />
          {pathname !== "/createMission" && (
            <button
              className="text-gray-800 dark:text-gray-300"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} size="2xl" />
            </button>
          )}
        </div>
      </div>
      {menu && (
        <div className="w-full flex justify-end mt-0 pt-0">
          <ul className="w-2/3 flex flex-col md:hidden bg-slate-200 dark:bg-gray-800 rounded-lg justify-center items-center px-5 py-2 absolute z-40 mt-16">
            <li>
              {pathname.includes("/missionDetails") && (
                <Link to={"/"} aria-label="Create mission" onClick={toggleMenu}>
                  <button
                    className="dark:text-gray-300 text-lg font-bold py-4 px-3"
                    aria-label="Back to missions list"
                    role="button"
                  >
                    <span>Back to missions list</span>
                  </button>
                </Link>
              )}
            </li>
            <li>
              {pathname !== "/createMission" && (
                <Link
                  to={"createMission"}
                  aria-label="Create mission"
                  onClick={toggleMenu}
                >
                  <button
                    className="dark:text-gray-300 text-lg font-bold py-4 px-3"
                    aria-label="Create mission"
                    role="button"
                  >
                    <span>Create mission</span>
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
