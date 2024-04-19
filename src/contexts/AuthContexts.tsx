import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (accessToken: string, refreshToken: string, expiresIn: number) => void;
  clearToken: () => void;
};

const defaultValue: AuthContextType = {
  token: null,
  setToken: () => {},
  clearToken: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    const expiresIn = localStorage.getItem('expiresIn');
    if (tokenFromStorage && expiresIn && parseInt(expiresIn) > Date.now()) {
      setTokenState(tokenFromStorage);
    }
  }, []);

  const setToken = useCallback((accessToken: string, refreshToken: string, expiresIn: number) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', (Date.now() + expiresIn * 1000).toString());
    setTokenState(accessToken);
  }, []);

  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    setTokenState(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const expiresIn = localStorage.getItem('expiresIn');
      if (expiresIn && parseInt(expiresIn) - Date.now() < 60000) { // Refresh 1 minute before expiry
        refreshAccessToken();
      }
    }, 1000 * 60 * 5); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const refreshAccessToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const clientId = '1bedb5e5c8004a5fa25dbbf15d42e7f5'; // Make sure to replace this with your actual client ID
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: clientId,
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          setToken(data.access_token, refreshToken, data.expires_in || 3600); // Use a default expiry time if not provided
        } else {
          clearToken();
        }
      })
      .catch(clearToken);
    }
  }, [setToken, clearToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
