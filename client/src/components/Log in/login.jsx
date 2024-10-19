import Form from "./loginForm";
const Login = () => {
  return (
    <div className="flex w-full h-screen">
      {/* لو عايز تشغل الكرة حط هنا lg:w-1/2 فى الديف اللى تحتى */}
      <div className="w-full flex items-center justify-center ">
        <Form />
      </div>

      {/* <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200 ">
        <div className="w-60 h-60 bg-gradient-to-tr from-stloginColor to-ndloginColor rounded-full animate-bounce"/>
        <div className="w-full h-2/6 absolute bottom-0 bg-white/10 backdrop-blur-lg "/>
      </div> */}
    </div>
  );
};

export default Login;
