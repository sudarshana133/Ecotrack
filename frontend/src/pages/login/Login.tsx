import TokenModal from "@/components/TokenModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from '@/lib/api';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize CSRF protection
    const initializeCsrf = async () => {
      try {
        await fetch('http://139.84.158.140:8000/sanctum/csrf-cookie', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    initializeCsrf();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await apiClient.post('/chatbot', {
        username: formData.get("username"),
        password: formData.get("password"),
      });
      
      setIsModalOpen(true);
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
