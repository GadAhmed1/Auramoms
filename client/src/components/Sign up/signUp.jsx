// Start of Selection
import SignUpForm from "./signUpForm";
import backGround from "../../../public/image/blob2_bg.svg";
import backGround2 from "../../../public/image/bloby.svg";
import { useEffect, useState } from "react";

const SignUp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const updateDarkMode = () => {
      const isDark = root.classList.contains("dark");
      setIsDarkMode(isDark);
      console.log("Dark mode change detected:", isDark); // Debugging
    };
    updateDarkMode();
    const observer = new MutationObserver(() => {
      updateDarkMode();
    });

    // Start observing the root element for attribute changes
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      key={isDarkMode ? "dark" : "light"} // Optional, forces remount
      className="w-full min-h-screen flex items-center justify-center py-8 bg-SignUpPageColor dark:bg-DarkGround2"
      style={{
        backgroundImage: `url(${isDarkMode ? backGround : backGround2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl px-6">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
