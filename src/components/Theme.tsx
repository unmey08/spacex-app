import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ThemeProps = {
  theme: string;
  handleThemeChange: () => void;
};

const Theme = ({ theme, handleThemeChange }: ThemeProps) => {
  return (
    <div className="text-slate-800 dark:text-gray-200 self-center flex md:dark:bg-slate-800/90 md:border border-gray-500 px-4 font-medium rounded-lg hover:shadow-xl mr-2">
      {theme === "dark" && (
        <button
          type="button"
          role="button"
          className="hover:cursor-pointer m-2 hover:text-slate-500"
          aria-label="Dark theme"
          onClick={() => handleThemeChange()}
        >
          <FontAwesomeIcon icon={faMoon} size="xl" />
          <span className="ml-2 hidden md:inline">Dark</span>
        </button>
      )}
      {theme === "light" && (
        <button
          type="button"
          role="button"
          className="hover:cursor-pointer m-2 hover:text-slate-500"
          aria-label="Light theme"
          onClick={() => handleThemeChange()}
        >
          <FontAwesomeIcon icon={faSun} size="xl" />
          <span className="ml-2 hidden md:inline">Light</span>
        </button>
      )}
    </div>
  );
};
export default Theme;
