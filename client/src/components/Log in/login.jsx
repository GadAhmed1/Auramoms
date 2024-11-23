import Form from "./loginForm";
import backGroundDark from "../../../public/image/blob_bg.svg";
import backGroundLight from "../../../public/image/bloby.svg";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { token } = useContext(ShopContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateDarkMode = () => {
      const isDark = root.classList.contains("dark");
      setIsDarkMode(isDark);
      console.log("Dark mode change detected:", isDark);
    };

    updateDarkMode();

    const observer = new MutationObserver(() => {
      updateDarkMode();
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div
      key={isDarkMode ? "dark" : "light"}
      className="w-full min-h-screen flex items-center justify-center bg-SignUpPageColor dark:bg-DarkGround2 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${isDarkMode ? backGroundDark : backGroundLight})`,
      }}
    >
      <Form />
    </div>
  );
};

export default Login;
