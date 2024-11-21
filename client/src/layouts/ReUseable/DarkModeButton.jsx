import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeMode = ({ className = "" }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    window.location.reload();
  };

  return (
    <div className={`${className} DarkModeButton`}>
      <label
        htmlFor="themeToggle"
        className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 dark:bg-neutral-700 transition"
      >
        <input
          type="checkbox"
          id="themeToggle"
          className="peer sr-only"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="absolute inset-y-0 left-0 m-1 w-6 h-6 rounded-full bg-white transition-all peer-checked:translate-x-6"></span>
        <span className="absolute inset-y-0 left-8 flex items-center">
          {theme === "light" ? (
            <CiLight className="text-yellow-500 font-bold text-2xl absolute right-1" />
          ) : (
            <CiDark className="text-black text-2xl absolute -left-1" />
          )}
        </span>
      </label>
    </div>
  );
};

ThemeMode.propTypes = {
  className: PropTypes.string,
};

export default ThemeMode;
