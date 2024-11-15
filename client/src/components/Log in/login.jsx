import Form from "./loginForm";
import backGround from "../../../public/image/blob_bg.svg";
const Login = () => {
  return (
      <div
        className="w-full flex items-center justify-center py-7 h-full  bg-SignUpPageColor  dark:bg-DarkGround2"
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
