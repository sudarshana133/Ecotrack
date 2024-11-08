import TokenModal from "@/components/TokenModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("API call completed");
      // Open modal after successful login
      setIsModalOpen(true);
      console.log(username+password)
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleTokenSubmit = (submittedToken: string) => {
    setToken(submittedToken);
    // todo -> check for whether the token is valid or not
    console.log("Received token:", submittedToken);
    // todo -> navigate afterwards if the token is valid
    localStorage.setItem("token",submittedToken);
    navigate("/");
  };

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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label>Username</label>
              <Input placeholder="Enter your username" name="username" />
              <label>Password</label>
              <Input placeholder="Enter your password" name="password" />
              <Button type="submit">Login</Button>
            </form>
          </div>
        </div>
        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleTokenSubmit}
        />
      </div>
    </>
  );
};

export default Login;