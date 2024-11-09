import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
      <img src="/logo.png" alt="Logo" className="w-32 mb-6" />
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
        <CardHeader>
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            Login
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-600"
              >
                Username
              </Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-gray-300"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 text-white hover:bg-blue-600"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
