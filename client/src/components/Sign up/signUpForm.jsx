import { useContext, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ShopContext } from "../../context/ShopContext";
import { GoogleLogin } from "@react-oauth/google";

function SignUpForm({ setshowLogin }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const { settoken } = useContext(ShopContext);
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
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          {
            ...formValues,
            country: selected,
          }
        );

        if (response.data.success) {
          settoken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("username", response.data.firstname);
          Swal.fire({
            title: "Welcome New User!",
            text: "Successful Registration",
            icon: "success",
          });

          navigate("/");
        } else {
          Swal.fire({
            title: "Something Went Wrong!",
            text:
              response.data.message ||
              "Signup failed. Please check your credentials.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Something Went Wrong!",
          text:
            error?.response?.data?.message ||
            "Signup failed. Please check your credentials.",
          icon: "error",
        });
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log(response); // اضافة طباعة لفحص الـ response
    try {
      const { credential } = response;
      // Send the Google ID token to the backend for verification
      const result = await axios.post(
        "http://localhost:3000/auth/google",
        {
          credential,
        }
      );

      if (result.data.success) {
        settoken(result.data.accessToken);
        localStorage.setItem("token", result.data.accessToken);
        localStorage.setItem("username", result.data.firstname);
        Swal.fire({
          title: "Welcome Back!",
          text: "Successfully logged in with Google",
          icon: "success",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Google Login Failed",
          text: result.data.message || "Login failed. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error); // اضافة طباعة للأخطاء لمعرفة السبب
      Swal.fire({
        title: "Google Login Failed",
        text: error.message || "Login failed. Please try again.",
        icon: "error",
      });
      console.log(error);
    }
  };

  const handleGoogleFailure = (error) => {
    Swal.fire({
      title: "Google Login Failed",
      text: error.message || "Login failed. Please try again.",
      icon: "error",
    });
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

  const getInputClass = (fieldName) =>
    `w-full border-2 rounded-xl p-4 mt-1 bg-transparent focus:outline-none ${
      formErrors[fieldName]
        ? "border-red-500"
        : "border-gray-100 focus:border-formColor"
    }`;

  const renderError = (fieldName) =>
    formErrors[fieldName] && (
      <p className="text-red-500 text-sm mt-1">{formErrors[fieldName]}</p>
    );

  return (
    <div>
      <form
        className="bg-white px-9 py-4 rounded-3xl border-2 border-gray-100"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-semibold">Sign up</h1>

        <p className="font-medium text-lg text-gray-500 mt-4">
          Join us now and enjoy the unique luxury experience you deserve!
        </p>

        <div className="mt-5 flex gap-4">
          <div className="w-1/2">
            <label className="text-lg font-medium">First name</label>
            <input
              className={getInputClass("firstname")}
              type="text"
              name="firstname"
              value={formValues.firstname}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
            {renderError("firstname")}
          </div>

          <div className="w-1/2">
            <label className="text-lg font-medium">Last name</label>
            <input
              className={getInputClass("lastname")}
              type="text"
              name="lastname"
              value={formValues.lastname}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
            {renderError("lastname")}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-lg font-medium">Email</label>
          <input
            className={getInputClass("email")}
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {renderError("email")}
        </div>

        <div className="mt-4">
          <label className="text-lg font-medium">Password</label>
          <input
            className={getInputClass("password")}
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {renderError("password")}
        </div>

        <div className="mt-5 flex gap-4">
          <div className="w-1/2">
            <label className="text-lg font-medium">Country</label>
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              searchable
              className="w-full mt-1"
              selectButtonClassName="w-full border-2 rounded-xl px-4 py-3 bg-transparent focus:outline-none border-gray-100 focus:border-formColor"
            />
            {renderError("country")}
          </div>

          <div className="w-1/2">
            <label className="text-lg font-medium">Phone</label>
            <input
              className={getInputClass("phone")}
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {renderError("phone")}
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <div>
            <input
              type="checkbox"
              id="remember"
              className="ml-2 font-medium text-base accent-formColor"
              required
            />
            <label htmlFor="remember" className="ml-2 font-medium text-base ">
              By creating an account, you are accepting our{" "}
              <a href="#" className="text-blue-500 ">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>
        <div className="my-5 flex justify-center items-center">
          <button
            className="bg-formColor p-3 text-white font-medium rounded-xl"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <div className="my-4 flex justify-center rounded-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />
        </div>
        <Link to="/Log_in" className="my-4 text-center">
          <p className="text-gray-500 text-lg">
            Already have an account?{" "}
            <button
              className="font-medium text-formColor hover:text-darkFormColor"
              
            >
              Login now
            </button>
          </p>
        </Link>
        <br />
      </form>
    </div>
  );
}

export default SignUpForm;
