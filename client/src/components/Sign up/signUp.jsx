import SignUpForm from "./signUpForm";

const SignUp = () => {
  return (
    // <div className="flex w-full h-screen">
    //   <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
    //     <div className="w-60 h-60 bg-gradient-to-tr from-stloginColor to-ndloginColor rounded-full animate-bounce" />
    //     <div className="w-full h-1/3 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
    //   </div>

      <div className="w-full flex items-center justify-center mt-6 ">
        {/* لو هتشغل الكرة حط هنا lg:w-1/2 */}
        <SignUpForm />
      </div>
    // </div>
  );
};

export default SignUp;
