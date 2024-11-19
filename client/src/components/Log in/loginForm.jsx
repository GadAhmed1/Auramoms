import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import Swal from "sweetalert2";

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { settoken } = useContext(ShopContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  // login user
  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formValues,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        settoken(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("username", response.data.email);
        Swal.fire({
          title: "Welcome Back!",
          text: "Successful Login",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong!",
        text:
          error?.response?.data?.message ||
          "Login failed. Please check your credentials.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      loginUser();
    }
  }, [formErrors, isSubmit, formValues]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long!";
    }

    return errors;
  };

  return (
    <div>
      <form
        className="bg-white px-10 py-6 rounded-3xl border-2 border-gray-100"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold">Login to your account</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Please enter your details
        </p>

        <div className="mt-5">
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border-2 rounded-xl px-4 py-3 mt-1 bg-transparent focus:outline-none border-gray-100 focus:border-pink-600 ring-pink-600"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {isSubmit && formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="text-lg font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border-2 rounded-xl px-4 py-3 mt-1 bg-transparent focus:outline-none border-gray-100 focus:border-pink-600 ring-pink-600"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {isSubmit && formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              id="remember"
              className="ml-2 font-medium text-xs accent-pink-600"
            />
            <label htmlFor="remember" className="ml-2 font-medium text-xs">
              Remember me
            </label>
          </div>
        </div>

        <div className="mt-1 flex flex-col gap-y-4"></div>

        <button
          type="submit"
          className="w-full py-3 mt-5 rounded-xl bg-pink-600 text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98] transition-all"
        >
          Login
        </button>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don&#39;t have an account ?</p>
          <button
            type="button"
            className="ml-3 text-pink-600 text-base font-medium"
            onClick={() => navigate("/Sign_up")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
