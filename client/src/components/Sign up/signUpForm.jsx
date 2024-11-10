import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      // إعادة توجيه المستخدم بعد تسجيل الدخول بنجاح
      // navigate();
    }
  }, [formErrors,navigate]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!values.firstName) errors.firstName = "First name is required!";
    if (!values.lastName) errors.lastName = "Last name is required!";
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

    if (!values.country)
      errors.country = "Country is required!";
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
              className={getInputClass("firstName")}
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
            {renderError("firstName")}
          </div>

          <div className="w-1/2">
            <label className="text-lg font-medium">Last name</label>
            <input
              className={getInputClass("lastName")}
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
            {renderError("lastName")}
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
              onSelect={(code) => {
                setSelected(code);
                setFormValues({ ...formValues, country: code });
              }}
              searchable
              className="w-full mt-1"
              selectButtonClassName="w-full border-2 rounded-xl px-4 py-3 bg-transparent focus:outline-none border-gray-100 focus:border-formColor"
              placeholder="Select your country"
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
              <a href="#" className="text-blue-500 ">
                privacy policy
              </a>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 rounded-xl bg-formColor text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98] transition-all"
        >
          Sign up
        </button>

        <div className="mt-8 flex justify-center">
          <p className="font-medium text-base ">Already have an account ?</p>
          <button className="ml-3 text-formColor text-base font-medium"
          onClick={() => navigate("/Log_in")}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
