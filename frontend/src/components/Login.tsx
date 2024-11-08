import React from "react";

const Login: React.FC = () => {
  const clientId = "9b0d6e3d-9a0b-404b-af87-208c8ff02f23";
  const redirectUri = encodeURIComponent(
    "https://0794-2a09-bac5-3b4b-7eb-00-ca-41.ngrok-free.app/callback"
  );
  const scope = encodeURIComponent(
    "r:devices:* w:devices:* x:devices:* r:locations:* r:scenes:* x:scenes:*"
  );
  const authUrl = `https://api.smartthings.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Connect with SmartThings</button>
    </div>
  );
};

export default Login;
