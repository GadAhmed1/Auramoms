import SignUpForm from "./signUpForm";
import backGround from "../../../public/image/blob2_bg.svg";

const SignUp = () => {
  return (
    // <div className="flex w-full h-screen">
    //   <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
    //     <div className="w-60 h-60 bg-gradient-to-tr from-stloginColor to-ndloginColor rounded-full animate-bounce" />
    //     <div className="w-full h-1/3 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
    //   </div>

    <div
      className="w-full flex items-center justify-center pt-5 bg-SignUpPageColor dark:bg-DarkGround2 "
      style={{
        backgroundImage: `url(${backGround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* لو هتشغل الكرة حط هنا lg:w-1/2 */}
      <SignUpForm />
    </div>
    // </div>
  );
};
export default SignUp;
