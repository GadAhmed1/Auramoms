import Form from "./loginForm";
import backGround from "../../../public/image/blob_bg.svg";

const Login = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-SignUpPageColor dark:bg-DarkGround2"
      style={{
        backgroundImage: `url(${backGround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Form />
    </div>
  );
};

export default Login;
