import TokenModal from "@/components/TokenModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const IMAGE_URL = import.meta.env.VITE_CDN_IMAGE_URL
  const navigate = useNavigate();
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usernameValue = formData.get("username") as string;
    const passwordValue = formData.get("password") as string;

    if (!usernameValue || !passwordValue) return;
    try {
      await axios.post(`http://139.84.210.156/auth/signup`, {
        username: usernameValue,
        password: passwordValue,
      });
      localStorage.setItem("username", usernameValue);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTokenSubmit = async (submittedToken: string) => {
    try {
      const response = await axios.post(`http://139.84.210.156/auth/verifyToken`, {
        token: submittedToken,
        username: localStorage.getItem("username"),
      });
      if (response.status === 200) {
        localStorage.setItem("token", submittedToken);
        navigate("/dashboard");
      } else {
        console.log("Token verification failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-[#e9ebef] items-center justify-center">
          <img
            src={`https://cdn-85t93yhaveqs.vultrcdn.com/login.png`}
            alt="login-image"
            className="max-w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8 p-4">
          <div>
            <img
              src={`https://cdn-85t93yhaveqs.vultrcdn.com/logo.png`}
              alt="logo"
              className="max-w-[200px]"
            />
          </div>
          <div className="w-full max-w-[400px]">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label>Username</label>
              <Input placeholder="Enter your username" name="username" />
              <label>Password</label>
              <Input placeholder="Enter your password" name="password" />
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Submit
              </Button>
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

export default Signup;
