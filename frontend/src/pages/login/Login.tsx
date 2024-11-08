import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-[#e9ebef] items-center justify-center">
          <img
            src="/login.png"
            alt="login-image"
            className="max-w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8 p-4">
          <div>
            <img src="/logo.png" alt="logo" className="max-w-[200px]" />
          </div>
          <div className="w-full max-w-[400px]">
            <form className="flex flex-col gap-4">
              <label>Username</label>
              <Input placeholder="Enter your username" />
              <label>Password</label>
              <Input placeholder="Enter your password" />
              <Button>Login</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
