import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import Swal from "sweetalert2";
import { UserCircle2 } from "lucide-react";
import FormInput from "../Sign up/FormInput";
import FormButton from "../Sign up/FormButton";
import { motion } from "framer-motion";

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/users/login",
          formValues,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          setToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("username", response.data.email);
          localStorage.setItem("userId", response.data.userId);
          Swal.fire({
            title: "Welcome Back!",
            text: "Successful Login",
            icon: "success",
            background: "#fff",
            customClass: {
              popup: "rounded-2xl",
            },
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Something Went Wrong!",
            text: response.data.message || "Login failed. Please try again.",
            confirmButtonColor: "#f4a7b9",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong!",
          text:
            error?.response?.data?.message ||
            "Login failed. Please check your credentials.",
          confirmButtonColor: "#f4a7b9",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

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
    <motion.form
      className="bg-white dark:bg-gray-800/95 backdrop-blur-lg px-6 py-8 sm:px-8 lg:px-10 rounded-3xl 
        border border-white/20 dark:border-gray-700/30 shadow-xl transition-all duration-300 
        hover:shadow-2xl hover:shadow-gray-100/30 dark:hover:shadow-black/30"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <UserCircle2 className="w-16 h-16 text-[#f4a7b9] dark:text-[#d86a84]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Login to Your Account
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Please enter your credentials to continue
        </p>
      </div>

      <div className="space-y-6">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          error={formErrors.email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={formErrors.password}
        />

        <div className="flex items-start">
          <input
            type="checkbox"
            id="remember"
            className="mt-1 accent-[#f4a7b9] dark:accent-[#d86a84] h-4 w-4 rounded 
              border-gray-300 dark:border-gray-600 transition-all duration-200"
          />
          <label
            htmlFor="remember"
            className="ml-3 text-sm sm:text-base text-gray-600 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>

        <FormButton type="submit" loading={loading}>
          Login
        </FormButton>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {"Don't have an account? "}
            <button
              type="button"
              className="text-[#d86a84] dark:text-[#f4a7b9] font-medium 
                hover:text-[#f4a7b9] dark:hover:text-[#d86a84] transition-colors duration-200"
              onClick={() => navigate("/Sign_up")}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </motion.form>
  );
}

export default LoginForm;
