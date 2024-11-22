import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Google_Auth = () => {
  const handleGoogleLogin = async () => {
    try {
      // إعادة التوجيه إلى رابط تسجيل الدخول
      window.location.href = "http://localhost:3000/auth/google";

    //   const response = await axios.get(
    //     "http://localhost:3000/auth/google/callback"
    //   );

      if (response.data.success) {

        // حفظ البيانات في LocalStorage
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("accessToken");
  
        if (token) {
            await axios.post(
            `http://localhost:3000/auth/google/callback`,
            { token }
          );
        }
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("username", response.data.user.firstname);

        // عرض رسالة نجاح
        Swal.fire({
          title: "Welcome!",
          text: `Hello, ${response.data.user.firstname}! You have logged in successfully.`,
          icon: "success",
        });

        // إعادة التوجيه إلى الصفحة الرئيسية
        window.location.href = "/";
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Google Login Error:", error); // للتصحيح
      Swal.fire({
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
      });
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Google_Auth;
