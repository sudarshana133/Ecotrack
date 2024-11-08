import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Callback: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchTokens = async (code: string) => {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
      const redirectUri = 'https://0794-2a09-bac5-3b4b-7eb-00-ca-41.ngrok-free.app/callback';

      const tokenUrl = 'https://api.smartthings.com/oauth/token';
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      });

      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          window.location.href = '/';
        } else {
          console.error('Token exchange failed.');
        }
      } catch (error) {
        console.error('Error during token exchange:', error);
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    if (code) {
      fetchTokens(code);
    } else {
      console.error('Authorization code not found.');
    }
  }, [location]);

  return <div>Processing authentication...</div>;
};

export default Callback;
