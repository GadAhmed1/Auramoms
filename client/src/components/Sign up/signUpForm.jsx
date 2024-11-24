import { useContext, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ShopContext } from "../../context/ShopContext";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { UserCircle2 } from "lucide-react";

function SignUpForm() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const { token, setToken } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!values.firstname) errors.firstname = "First name is required!";
    if (!values.lastname) errors.lastname = "Last name is required!";
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters!";
    }

    if (!selected) errors.country = "Country is required!";
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Invalid phone number!";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          { ...formValues, country: selected }
        );

        if (response.data.success) {
          setToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("username", response.data.firstname);
          Swal.fire({
            icon: 'success',
            title: 'Welcome!',
            text: 'Registration successful',
            showConfirmButton: false,
            timer: 1500,
            background: '#fff',
            customClass: {
              popup: 'rounded-2xl'
            }
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong!',
            text: response.data.message || "Signup failed. Please try again.",
            confirmButtonColor: '#f4a7b9'
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          text: error?.response?.data?.message || "An unexpected error occurred.",
          confirmButtonColor: '#f4a7b9'
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form 
      className="bg-white dark:bg-gray-800 backdrop-blur-lg px-6 py-8 sm:px-8 lg:px-10 rounded-3xl 
        border border-white/20 dark:border-gray-700/30 shadow-xl transition-all duration-300 
        hover:shadow-2xl hover:shadow-gray-100/30 dark:hover:shadow-black/30"
      onSubmit={handleSubmit}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <UserCircle2 className="w-16 h-16 text-[#f4a7b9] dark:text-[#d86a84]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Create Account
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Join us now and enjoy the unique luxury experience you deserve!
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="First name"
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            error={formErrors.firstname}
          />

          <FormInput
            label="Last name"
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            error={formErrors.lastname}
          />
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1 block">
              Country
            </label>
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              searchable
              className="w-full border-2 border-gray-100 dark:border-gray-700 rounded-xl bg-transparent 
                transition-all duration-300 hover:border-[#f4a7b9]/50 dark:hover:border-[#d86a84]/50 
                focus:border-[#f4a7b9] dark:focus:border-[#d86a84] focus:outline-none focus:ring-2 
                focus:ring-[#f4a7b9]/20 dark:focus:ring-[#d86a84]/20"
            />
            {formErrors.country && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1 animate-fadeIn">
                {formErrors.country}
              </p>
            )}
          </div>

          <FormInput
            label="Phone"
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            error={formErrors.phone}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 accent-[#f4a7b9] dark:accent-[#d86a84] h-4 w-4 rounded 
                border-gray-300 dark:border-gray-600 transition-all duration-200"
            />
            <label className="ml-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              By creating an account, you accept our{" "}
              <a href="#" className="text-[#f4a7b9] dark:text-[#d86a84] hover:text-[#d86a84] dark:hover:text-[#f4a7b9] 
                font-medium transition-colors duration-200">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#f4a7b9] dark:text-[#d86a84] hover:text-[#d86a84] dark:hover:text-[#f4a7b9] 
                font-medium transition-colors duration-200">
                privacy policy
              </a>
              .
            </label>
          </div>

          <FormButton type="submit" loading={loading}>
            Create Account
          </FormButton>

          <Link 
            to="/Log_in"
            className="block text-center text-gray-600 dark:text-gray-300 hover:text-gray-800 
              dark:hover:text-gray-100 transition-colors duration-200"
          >
            Already have an account?{" "}
            <span className="text-[#d86a84] dark:text-[#f4a7b9] font-medium 
              hover:text-[#f4a7b9] dark:hover:text-[#d86a84]">
              Login now
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;