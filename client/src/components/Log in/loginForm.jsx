import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePassChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      // إعادة توجيه المستخدم بعد تسجيل الدخول بنجاح
      // navigate();
    }
  }, [formErrors, isSubmit, navigate, formValues]);

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
          <div className="relative mb-4">
            <label className="text-lg font-medium">Email</label>
            <input
              className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent focus:outline-none ${
                formErrors.email
                  ? "border-red-500"
                  : "border-gray-100 focus:border-formColor"
              }`}
              type="email"
              value={formValues.email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {isSubmit && formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="relative mb-4">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent focus:outline-none ${
                formErrors.password
                  ? "border-red-500"
                  : "border-gray-100 focus:border-formColor"
              }`}
              value={formValues.password}
              onChange={handlePassChange}
              placeholder="Enter your password"
            />
            {isSubmit && formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="mt-5 flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="ml-2 font-medium text-base accent-formColor"
              />
              <label htmlFor="remember" className="ml-2 font-medium text-base">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="font-medium text-base text-formColor"
            >
              Forgot Password
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-formColor text-white text-lg font-bold"
            >
              Sign in
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base">Don&#39;t have an account ?</p>
            <button
              type="button"
              className="ml-3 text-formColor text-base font-medium"
              onClick={() => navigate("/Sign_up")}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
