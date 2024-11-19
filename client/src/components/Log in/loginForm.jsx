import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  // تحديث القيم المدخلة في الحقول
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // عند إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  // إرسال الطلب عند عدم وجود أخطاء
  useEffect(() => {
    const loginUser = async () => {
      try {
        const response = await axios.post("http://localhost:3000/users/login", formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // التحقق من نجاح الطلب
        if (response.status === 200) {
          alert("Login successful!");
          // تخزين التوكن في localStorage
          localStorage.setItem("token", response.data.accessToken);
          // إعادة توجيه المستخدم إلى الصفحة الرئيسية
          navigate("/");
        }
      } catch (error) {
        // التعامل مع الأخطاء
        if (error.response) {
          alert(error.response.data.message || "Login failed. Please check your credentials.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    };

    // استدعاء الدالة إذا لم يكن هناك أخطاء
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      loginUser();
    }
  }, [formErrors, isSubmit, navigate, formValues]);

  // دالة التحقق من المدخلات
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
        <p className="font-medium text-lg text-gray-500 mt-4">Please enter your details</p>

        {/* حقل البريد الإلكتروني */}
        <div className="mt-5">
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent focus:outline-none border-gray-100 focus:border-formColor"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {isSubmit && formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* حقل كلمة المرور */}
        <div className="mt-4">
          <label className="text-lg font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent focus:outline-none border-gray-100 focus:border-formColor"
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
                className="ml-2 font-medium text-xs accent-formColor"
              />
              <label htmlFor="remember" className="  ml-2  font-medium text-xs">
                Remember me
              </label>
            </div>
            {/* <button
              type="button"
              className="font-medium text-base text-formColor"
            >
              Forgot Password
             </button> */} {/*but it in another update*/}
          </div>

          <div className="mt-1 flex flex-col gap-y-4"></div>

        {/* زر تسجيل الدخول */}
        <button
          type="submit"
          className="w-full py-3 mt-5 rounded-xl bg-formColor text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98] transition-all"
        >
          Login
        </button>
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
      </form>
    </div>
  );
}

export default LoginForm;
