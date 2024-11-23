import SignUpForm from "./signUpForm";
import backGround from "../../../public/image/blob2_bg.svg";

const SignUp = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-8 bg-SignUpPageColor dark:bg-DarkGround2"
      style={{
        backgroundImage: `url(${backGround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl px-6">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;